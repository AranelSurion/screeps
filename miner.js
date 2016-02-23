/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 
 module.exports = function (creep) {

        /* JOB: Mining - IF FLAG EXISTS */
        var target = eval("Game.flags." + creep.memory.target);
        var cstorage = creep.memory.cstorage;
        

        
        if (target){ target = target.pos.lookFor('source');
        if (creep.harvest(target[0]) == ERR_NOT_IN_RANGE || -6){
                creep.moveTo(target[0]);
        }}
		
		/* JOB: Mining - IF FLAG DOES NOT EXIST */
		if (target == null){
		var sources = creep.room.find(FIND_SOURCES);
		if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE || -6) {
			creep.moveTo(sources[0]);
		}}		
		
        if (cstorage == 1 && creep.carry.energy > 40){
		    if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
		        creep.drop(RESOURCE_ENERGY); // drop energy if you can't store, to be picked up by adjacent miner.
		    }            
        }

		
		// If not, energy is dropped. Pickup as much as you can. */
        if(creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)){
            creep.pickup(creep.pos.findClosestByRange(FIND_DROPPED_ENERGY));
        }
}