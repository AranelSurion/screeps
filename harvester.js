/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 
 module.exports = function (creep) {
	if(creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
		if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[0]);
		}			
	}
	else {
	    if (creep.memory.passbit == 1){
	    var transferYeri = Game.spawns.Spawn1;
	    /* periodically check extensions - guess it's better than running find every iteration. */
	    if (creep.memory.chkcount){
	        creep.memory.chkcount = creep.memory.chkcount + 1;
	    }else{
	        creep.memory.chkcount = 0;
	    }
	    process = creep.transfer(transferYeri, RESOURCE_ENERGY);
	    }else{
	    var transferYeri = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function (s){
	        return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity
	    }
	    })
	    process = creep.transfer(transferYeri, RESOURCE_ENERGY);
	    }
		if( process == ERR_NOT_IN_RANGE) {
			creep.moveTo(transferYeri);
		}
		if( process == ERR_FULL && transferYeri == Game.spawns.Spawn1) {
            creep.memory.passbit = 0;
            console.log("Harvester: Spawn is full.");
		} 
		if( process == ERR_FULL && transferYeri != Game.spawns.Spawn1) {
            /* creep.memory.passbit = 1; */
            console.log("Harvester: Extension became full.");
		}
		if( transferYeri == null){
		    creep.memory.passbit = 1;
		    console.log("Harvester: All extensions are full.");
		}
		if( creep.memory.chkcount > 9){ /* periodically check for extensions */
		    creep.memory.passbit = 0;
		}
		
}
}