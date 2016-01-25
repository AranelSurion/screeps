/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */
 
module.exports = function (creep) {

var hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
if (hostile){
    creep.say("Hostile detected.");
    if (creep.attack(hostile) == ERR_NOT_IN_RANGE){
        creep.moveTo(hostile);
    }
    
}
if (Game.flags.GUARD_MOVE){
    creep.cancelOrder("move"); /* cancel ALL move orders */
    creep.moveTo(Game.flags.GUARD_MOVE);
    if (hostile){
        creep.attack(hostile);
    }
}
}