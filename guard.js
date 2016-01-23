/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */
 
module.exports = function (creep) {

var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
if (hostiles.length){
    creep.say("Hostile detected.");
    if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE){
        creep.moveTo(hostiles[0]);
    }
    
}
}