/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('claimer'); // -> 'a thing'
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
            
        case 0: // FILL. FROM MINER OR STORAGE.
        
        
            if (creep.carry.energy == creep.carryCapacity){
                creep.memory.job = creep.memory.job + 1;
                break;
            }
            if (creep.memory.target == "storage"){
                if (creep.room.storage.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.storage);
                }
            }else if (creep.memory.target == "spawn"){ // TODO IMPLEMENT THIS - MEMORY PREFFERED SPAWN
                var spawnloc = creep.room.find(FIND_MY_SPAWNS)[0];
                if (spawnloc != null){
                    if (spawnloc.energy >= 50){
                        if (spawnloc.transferEnergy(creep) == ERR_NOT_IN_RANGE){
                            creep.moveTo(spawnloc);
                        }
                    }
                }
            }else{
                /* finding closest miner */
                var miner = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                return object.memory.role == "miner" && object.memory.target == creep.memory.target && object.carry.energy > 10;
                }
                });     
                
                if (miner && miner.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(miner);
                }else{
                    if(creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)){
                    creep.pickup(creep.pos.findClosestByRange(FIND_DROPPED_ENERGY));
                    }
                }
            }
            break;
        
        case 1: // CLAIM CONTROLLER, FIX IT LATER.
            var goto = eval("Game.flags." + creep.memory.goto);
            if (goto){ creep.moveTo(eval("Game.flags." + creep.memory.goto));
            var structure = goto.pos.lookFor('structure');
            console.log(structure);
            creep.claimController(creep.room.controller);
            }
            break;
            
        case 2: // TODO: RESERVE CONTROLLER
            break;            
            
        
    }
    
      
}