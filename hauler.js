/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('hauler'); // -> 'a thing'
 */

module.exports = function (creep) {
    
    /* VARIABLES */
    var flagname = "Game.flags." + creep.name + "_MOVE";
    var jobs = creep.memory.jobs // ARRAY of Jobs
    var job = creep.memory.job; // Selected Job
    
    /* DEFAULT JOB ARRAY */
    /* JOB CODES: */
    if (jobs == null){
        jobs = [0, 1]; 
        creep.memory.jobs = jobs;
    }
    
    /* EVENT CODE */
    function decideJob(){
    //if (DEFCON == 1){ return -9;} // DEFCON 1, STOP.
    if (job == null){return 0;} // default job
    if (eval(flagname)){ return -1;} // MOVE ORDER received
    if (!eval(flagname) && job == -1){ return 0;} // MOVE ORDER removed, go back to work.
    if (creep.carry.energy == 0){ return 0;} // creep empty
    if (creep.carry.energy == creep.carryCapacity){ return 1;} // creep full
    return creep.memory.job;
    }
    
    
    job = decideJob();
    creep.memory.job = job;

    /* hack to not allow array overflow */
    if (job > jobs.length - 1){
        creep.memory.job = creep.memory.job - (jobs.length - 1);
        job = creep.memory.job;
    }
    
    if (job < 0){
        job = job;
    }else{
        job = jobs[job];
    }
    console.log(creep.name + ": Working on job# " + job);
    
    
    switch (job){
        case -9: // STOP MODE
            break;
        case -1: // MOVE ORDER
            creep.cancelOrder("move");
            creep.moveTo(eval(flagname));
            break;
            
        case 0: // GO AND MINE OR PICKUP. TODO.
            var target = eval("Game.flags." + creep.memory.target);
            console.log(target);
            if (target){ creep.moveTo(eval("Game.flags." + creep.memory.target));
            creep.pickup(creep.pos.findClosestByRange(FIND_DROPPED_ENERGY));
            }
            break;
        
        case 1: // GO BACK AND STORE
            // TODO IF STORAGE EXISTS
            var roomstorage = Game.spawns.Spawn2.room.storage;
            if (roomstorage){
                if (creep.transfer(roomstorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(roomstorage);
                }
            }
            
            // IF STORAGE DOES NOT EXIST
            if (!roomstorage){
            if (creep.upgradeController(Game.spawns.Spawn1.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.spawns.Spawn1.room.controller);
            }            
            }
            break;
    }
    
      
}