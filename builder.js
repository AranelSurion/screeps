/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
 
  module.exports = function (creep) {

if (creep.carry.energy == 0 && creep.memory.waitbit != 1){ /* specialized as needed by carrier role */
    var spawnloc = creep.room.find(FIND_MY_SPAWNS)[0];
    if (spawnloc.energy >= 50){
        creep.memory.upgrademode = 0;
        if (spawnloc.transferEnergy(creep) == ERR_NOT_IN_RANGE){
            creep.moveTo(spawnloc);
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
    if (process == ERR_NOT_IN_RANGE){
        creep.moveTo(creep.room.controller);
    }    
    if (creep.memory.upgrademode == 1 && creep.memory.waitmode == 1 && creep.carry.energy < creep.carryCapacity/4){ // LINK
        var linkpoints = creep.room.memory.linkpoints;
        if (typeof linkpoints !== "undefined"){ var linkTo = creep.room.lookForAt('structure', linkpoints[0][2], linkpoints[0][3])[0]; }
        if (typeof linkTo !== "undefined"){linkTo.transferEnergy(creep);}
    }
    if (creep.pos.isNearTo(creep.room.controller)){
         creep.memory.upgrademode = 1; /* checked by carrier role */
         if (creep.memory.waitmode == 1){
            creep.memory.waitbit = 1; /* checked by carrier role */
            
        }
    }
    if (process == ERR_NOT_ENOUGH_RESOURCES){
        if (creep.memory.waitmode != 1){
        creep.memory.upgrademode = 0; /* checked by carrier role */
        creep.memory.waitbit = 0; /* checked by carrier role */
        }else{
            creep.moveTo(creep.room.controller);    
        }
    }

    }
    }
    
}