/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 
 module.exports = function (creep) {
		var sources = creep.room.find(FIND_SOURCES);
		if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE || -6) {
			creep.moveTo(sources[0]);
		}
        if(creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)){
            creep.pickup(creep.pos.findClosestByRange(FIND_DROPPED_ENERGY));
        }
}