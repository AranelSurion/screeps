/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
 
  module.exports = function (creep) {

if (creep.carry.energy == 0){
    if (Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE){
        creep.moveTo(Game.spawns.Spawn1);
    }
}else{
    var areas = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (areas.length){
        if(creep.build(areas[0]) == ERR_NOT_IN_RANGE){ /* not by range - preserving cpu? */
            creep.moveTo(areas[0]);
        }
    }else{ /* repair mode. may be delegated to another creep or its priority might be changed. */
    var willrepair = creep.pos.findClosestByRange(FIND_STRUCTURES,{
        filter: function(object){ 
            return object.hits < object.hitsMax;
            
        }
        
    });
    /* console.log("Selected for repair:" + willrepair); */
    if (willrepair && creep.memory.wontrepair != 1){
        if (creep.repair(willrepair) == ERR_NOT_IN_RANGE){
            creep.moveTo(willrepair);
        }
    }else{ /* upgrader mode. obsoleting upgrader creep. */
        creep.memory.wontrepair = 1;
        process = creep.upgradeController(creep.room.controller) 
    if( process == ERR_NOT_IN_RANGE){
        creep.moveTo(creep.room.controller);
        
    }
    if ( process == OK){
        creep.memory.wontrepair = 0;
    }
    }
    }
    
    }
}