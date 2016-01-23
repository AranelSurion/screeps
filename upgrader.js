/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('upgrader'); // -> 'a thing'
 */
 
 
 /* Builders now work as Upgraders. There's no need for this role. */
  module.exports = function (creep) {

 if(creep.carry.energy == 0){ /* energy depleted */
     if(Game.spawns.Spawn1.transferEnergy(creep, 1) == ERR_NOT_IN_RANGE){ /* slow mode: 1 */
        creep.moveTo(Game.spawns.Spawn1);         
     }

 }else{ /* got energy */
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
        creep.moveTo(creep.room.controller);
        
    }

}

}