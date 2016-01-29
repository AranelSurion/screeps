/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 
 module.exports = function (creep) {
	if (creep.carry.energy == 0) { /* loading */
	    creep.memory.fillmode = 1;
	}
	if (creep.carry.energy == 200){
	    creep.memory.fillmode = 0;
	}
	
	if (creep.memory.fillmode == 1){ /* IF STRUCTURE_STORAGE DOES NOT EXIST */
	    creep.memory.passbit = 0;
        upgradetarget = Game.getObjectById(creep.memory.upgradetarget); /* cleaning wait bits */
        if (upgradetarget){upgradetarget.memory.waitbit = 0
        creep.memory.upgradetarget = 0;}
        
        if (!creep.room.storage){
        /* finding closest miner */
        var miner = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: function(object) {
            return object.memory.role == "miner" && object.carry.energy > 10;
        }
        });
    
         if (miner && miner.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
             creep.moveTo(miner);
         }else{
             if(creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)){
             creep.pickup(creep.pos.findClosestByRange(FIND_DROPPED_ENERGY));
             }
         }}else{ /* STRUCTURE_STORAGE EXISTS */
             if (creep.room.storage.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                 creep.moveTo(creep.room.storage);
             }
         }
	    
	} else { /* unloading */
	    if (creep.memory.passbit == 1){
	        /*console.log("debug: selected spawn");*/
	    var transferYeri = Game.spawns.Spawn1;
	    /* periodically check extensions - guess it's better than running find every iteration. */
	    if (creep.memory.chkcount){
	        creep.memory.chkcount = creep.memory.chkcount + 1;
	    }else{
	        creep.memory.chkcount = 1;
	    }
	    process = creep.transfer(transferYeri, RESOURCE_ENERGY);
	    }
	    
	    if (creep.memory.passbit == 0){
	        /*console.log("debug: selected extension");*/
	    var transferYeri = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function (s){
	        return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity
	    }
	    });
	    process = creep.transfer(transferYeri, RESOURCE_ENERGY);
	    }
		if( process == ERR_NOT_IN_RANGE) {
			creep.moveTo(transferYeri);
		}
		if( process == ERR_FULL && transferYeri == Game.spawns.Spawn1 || creep.memory.passbit == 2) {
            console.log("Carrier: Spawn is full.");
            /* find an upgrade-mode builder */
            
            var upgrader = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
            return object.memory.role == "builder" && object.memory.upgrademode == 1 && object.carry.energy != object.carryCapacity;
            }
            });
            
            if (upgrader){
                /* console.log("debug: selected upgrader"); */
                if (creep.carry.energy < 50){ /* not worth it, go back and refill */
                    creep.memory.fillmode = 1;
                }
                creep.memory.passbit = 2;
                creep.memory.upgradetarget = upgrader.id;
                upgrader.memory.waitbit = 1;
                if (creep.transfer(upgrader, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(upgrader);
                }
                if (Game.spawns.Spawn1.energy < 150){ /* spawn energy getting too low */
                    creep.memory.passbit = 0;
                    
                }
                
            }else{ /* search for extensions */
            creep.memory.passbit = 0;
            upgradetarget = Game.getObjectById(creep.memory.upgradetarget); /* cleaning wait bits */
            if (upgradetarget){upgradetarget.memory.waitbit = 0
            creep.memory.upgradetarget = 0;}
            }
		} 
		if( process == ERR_FULL && transferYeri != Game.spawns.Spawn1) {
            /* creep.memory.passbit = 1; */
            console.log("Carrier: Extension became full.");
		}
		if( transferYeri == null && creep.memory.passbit != 2){
		    creep.memory.passbit = 1;
		    /* console.log("Harvester: All extensions are full."); */
		}
		if( creep.memory.chkcount > 9 && creep.memory.passbit != 2){ /* periodically check for extensions */
		    creep.memory.passbit = 0;
		    creep.memory.chkcount = 1;
		}	    

}
}