/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
 
  module.exports = function (creep) {

if (creep.carry.energy == 0){
    if (Game.spawns.Spawn1.energy >= 150){
        if (Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE){
            creep.moveTo(Game.spawns.Spawn1);
    }}
}else{
    var areas = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (areas.length){
        if(creep.build(areas[0]) == ERR_NOT_IN_RANGE){ /* not by range - preserving cpu? */
            creep.moveTo(areas[0]);
        }
    }else{
     /* upgrader mode. obsoleting upgrader creep. */
        process = creep.upgradeController(creep.room.controller) 
    if( process == ERR_NOT_IN_RANGE){
        creep.moveTo(creep.room.controller);
        
    }

    }
    }
    
    }