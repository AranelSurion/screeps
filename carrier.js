/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('carrier'); // -> 'a thing'
 */
 
module.exports = function (creep) {
    
    // TODO - DEFCON ARRAYS
    
    /* VARIABLES */
    var flagname = "Game.flags." + creep.name + "_MOVE";
    var jobs = creep.memory.jobs // ARRAY of Jobs
    var job = creep.memory.job; // Selected Job
    var target = creep.memory.target;
    
    /* DEFAULT JOB ARRAY */
    /* JOB CODES: -9: stop, -1: move, 0: fill, 1: extension, 2:spawn, 3:tower, 4:builders, 5: storage, 6: link */
    if (jobs == null){
        jobs = [0, 1, 2, 3, 4, 5, 6]; 
        creep.memory.jobs = jobs;
    }
    
    /* EVENT CODE */
    function decideJob(){
    //if (DEFCON == 1){ return -9;} // DEFCON 1, STOP.
    if (job == null){return 0;} // default job
    if (eval(flagname)){ return -1;} // MOVE ORDER received
    if (!eval(flagname) && job == -1){ return 0;} // MOVE ORDER removed, go back to work.
    if (creep.carry.energy == 0){ return 0;} // creep empty
    //if (creep.carry.energy < creep.carryCapacity/4){ return 0;}// not worth it
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
    
    /* JOB DEFINITIONS */
    
    switch (job){
        case -9: // STOP
            break;
        case -1: // MOVE ORDER
            creep.cancelOrder("move"); // cancel ALL move orders 
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
        case 1: // EXTENSIONS
            var extension = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function (s){
            return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity
            }
            });
            
            if (extension){ // FOUND
                var process = creep.transfer(extension, RESOURCE_ENERGY);
                
                if (process == OK){
                    break; 
                }
                
                if (process == ERR_NOT_IN_RANGE){
                    creep.moveTo(extension);
                }
                
                
                if (process == ERR_FULL){
                    creep.memory.job = creep.memory.job + 1;
                    break; 
                }
                
            }
            // NOT FOUND
            
            if (extension == null){ // all extensions are full
                creep.memory.job = creep.memory.job + 1;
            }
        
            break;
            
        case 2: // SPAWN
            var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
            if (spawn.energy < spawn.energyCapacity){
                var process = creep.transfer(spawn, RESOURCE_ENERGY);

                if (process == OK){
                    break; 
                }
                
                if (process == ERR_NOT_IN_RANGE){
                    creep.moveTo(spawn);
                }

                if (process == ERR_FULL){
                    creep.memory.job = creep.memory.job + 1;
                    break; 
                }
            }else{
                    creep.memory.job = creep.memory.job + 1;
                    break;              
            }
            break;
        case 3: // TOWER
            var tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function (s){
                return s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity/4*3; // UNDER %75
            }
            });
            if (tower){ // FOUND
                var process = creep.transfer(tower, RESOURCE_ENERGY);
                
                if (process == OK){
                    break;
                }
                
                if (process == ERR_NOT_IN_RANGE){
                    creep.moveTo(tower);
                }
                
                
                if (process == ERR_FULL){
                    creep.memory.job = creep.memory.job + 1;
                    break; 
                }
            }     
            // NOT FOUND

            if (tower == null){ // all towers are full
                creep.memory.job = creep.memory.job + 1;
            }           
            break;
            
        case 4: // BUILDERS //TODO IMPLEMENT TIMEOUT
            var upgrader = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
            return object.memory.role == "builder" && object.memory.upgrademode == 1 && object.carry.energy < object.carryCapacity/100*80;
            }
            });
            
            if (upgrader){ // FOUND
                if (creep.transfer(upgrader, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(upgrader);
                }                
            }
            // NOT FOUND
            
            if (upgrader == null){
               creep.memory.job = creep.memory.job + 1; 
            }

            break;

        case 5: // STORAGE
            if(creep.room.storage){
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.storage);
                }
                
            }else{
              creep.memory.job = creep.memory.job + 1;   
            }
        
            break;
            
        case 6: // LINK
        
            if (creep.room.storage.store.energy < 15000){ console.log("carrier: less than 15000 energy, skipping job 6"); creep.memory.job = creep.memory.job + 1; break; }
            var linkpoints = creep.room.memory.linkpoints;
            if (typeof linkpoints !== "undefined"){ linkFrom = creep.room.lookForAt('structure', linkpoints[0][0], linkpoints[0][1])[0]; }
            if (linkFrom && linkFrom.energy != linkFrom.energyCapacity){
                if (creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(linkFrom);
                }                
            }else{
              creep.memory.job = creep.memory.job + 1;   
            }
        
            break;
        
    }
      
}