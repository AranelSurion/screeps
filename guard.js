/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */
 
module.exports = function (creep) {

var hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: function(object){ return object.owner != "Source Keeper";}});
if (hostile){
    creep.say("Hostile!");
    if (creep.attack(hostile) == ERR_NOT_IN_RANGE){
        creep.moveTo(hostile);
    }
    creep.rangedAttack(hostile);
}

var structure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: function(object){return object.structureType != STRUCTURE_CONTROLLER && object.structureType != STRUCTURE_KEEPER_LAIR;}});
if (!hostile && structure){
    console.log(structure + creep.attack(structure));
    if (creep.attack(structure) == ERR_NOT_IN_RANGE){
        creep.moveTo(structure);
    }    
}

var construction = creep.pos.findClosestByRange(FIND_HOSTILE_CONSTRUCTION_SITES,{filter: function(object){return object.structureType != STRUCTURE_CONTROLLER && object.structureType != STRUCTURE_KEEPER_LAIR;}});
if (hostile == null && structure == null && construction){; //TODO IMPLEMENT STOMP
    if (console.log(creep.attack(construction)) == ERR_NOT_IN_RANGE){
        creep.moveTo(construction);
    }    
}

if (Game.flags.GUARD_MOVE){
    creep.cancelOrder("move"); /* cancel ALL move orders */
    //creep.cancelOrder("attack"); /* TO BE REMOVED. ADDED TO IGNORE STRUCTURES ON MARCH */
    creep.moveTo(Game.flags.GUARD_MOVE);
    if (hostile){
        creep.rangedAttack(hostile);
        creep.attack(hostile);
    }
}
}