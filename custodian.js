/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('custodian'); // -> 'a thing'
 */
 
   module.exports = function (creep) {

WALLHITS = creep.room.memory.wallhits; /* Wall hits value, increase this to further fortify walls */

if (creep.carry.energy == 0){
    var spawnloc = creep.room.find(FIND_MY_SPAWNS)[0];
    if (spawnloc.energy >= 50){
        if (spawnloc.transferEnergy(creep) == ERR_NOT_IN_RANGE){
            creep.moveTo(spawnloc);
    }}
}else{
    if (!creep.memory.target || creep.memory.target == 0){ /* find next target */
    var willrepair = creep.pos.findClosestByRange(FIND_STRUCTURES,{ /* repair mode */
        filter: function(object){ 
        return object.hits < object.hitsMax/100*90 && object.structureType != STRUCTURE_RAMPART && object.structureType != STRUCTURE_WALL; /* repair non-walls under %90 */
        }
    });
    if (willrepair){
        creep.memory.target = willrepair.id;
    }else{
        creep.memory.wontrepair = 1;
    }
    } /* ends - found next target */
    
    if (creep.memory.target  && creep.memory.wontrepair != 1){
        target = Game.getObjectById(creep.memory.target);
    process = creep.repair(target);
    if (process == ERR_NOT_IN_RANGE){
        creep.moveTo(target);
    }else{    /* OK or ERR_INVALID_TARGET? */
        creep.memory.target = 0;
    }    
    }else{ /* find a wall or rampart to fortify */
    var fortify = creep.pos.findClosestByRange(FIND_STRUCTURES,{ /* hardcoded hit value */
        filter: function(object){ 
        return object.hits < WALLHITS && object.hitsMax != 1 && (object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_WALL); /* repair non-walls under %90 */
        }    
    });
    process = creep.repair(fortify);
    if (process == ERR_NOT_IN_RANGE){
        creep.moveTo(fortify);
    }else{
        creep.memory.wontrepair = 0;
    }
    

    }
    

}
}
    