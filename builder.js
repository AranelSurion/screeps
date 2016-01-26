/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
 
  module.exports = function (creep) {

if (creep.carry.energy == 0 && creep.memory.waitbit != 1){ /* specialized as needed by carrier role */
    if (Game.spawns.Spawn1.energy >= 150){
        creep.memory.upgrademode = 0;
        if (Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE){
            creep.moveTo(Game.spawns.Spawn1);
    }}
}else{
    var areas = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (areas.length){
        creep.memory.upgrademode = 0; /* checked by carrier role */
        creep.memory.waitbit = 0;
        if(creep.build(areas[0]) == ERR_NOT_IN_RANGE){ /* not by range - preserving cpu? */
            creep.moveTo(areas[0]);
        }
    }else{
     /* upgrader mode. obsoleting upgrader creep. */
    process = creep.upgradeController(creep.room.controller) 
    if (process == ERR_NOT_IN_RANGE && creep.carry.energy != 0){
        creep.moveTo(creep.room.controller);
    }
    if (process == OK){
         creep.memory.upgrademode = 1; /* checked by carrier role */
    }
    if (process == ERR_NOT_ENOUGH_RESOURCES){
        creep.memory.upgrademode = 0; /* checked by carrier role */
        creep.memory.waitbit = 0; /* checked by carrier role */
        if(creep.pos.isNearTo(creep.room.controller)) {
        creep.move(RIGHT);
        }
    }

    }
    }
    
}