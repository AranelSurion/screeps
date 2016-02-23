/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
 
module.exports = function (creep) {
    
    // TODO - DEFCON ARRAYS
    
    /* VARIABLES */
    var flagname = "Game.flags." + creep.name + "_MOVE";
    var jobs = creep.memory.jobs // ARRAY of Jobs
    var job = creep.memory.job; // Selected Job
    var target = creep.memory.target;
    
    /* DEFAULT JOB ARRAY */
    /* JOB CODES: -9: stop, -1: move, 0: fill, 1: build 2: upgrade */
    if (jobs == null){
        jobs = [0, 1, 2]; 
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
            var position = eval(flagname).pos.lookFor("constructionSite");
            console.log(position);
            if (position != ""){
                console.log("debug:buildtrig");
                if(creep.build(position[0]) == ERR_NOT_IN_RANGE){ /* not by range - preserving cpu? */
                    creep.moveTo(position[0]);
                }                   
            }else{
                creep.cancelOrder("move"); // cancel ALL move orders 
                creep.moveTo(eval(flagname));
            }
            break;   
        
        case 0: // FILL. FROM MINER, SPAWN, STORAGE OR MINE YOURSELF. 
        
        
            if (creep.carry.energy == creep.carryCapacity){
                creep.memory.job = creep.memory.job + 1;
                break;
            }
            if (creep.memory.target == "storage"){ // FILL FROM STORAGE
                if (creep.room.storage.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.storage);
                }                
            }else if (creep.memory.target == "spawn"){ // TODO IMPLEMENT THIS - FILL FROM SPAWN
                
            }else if (creep.memory.target == "mine"){ // FILL YOURSELF
                if(creep.carry.energy < creep.carryCapacity) {
		            var sources = creep.room.find(FIND_SOURCES);
		            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			            creep.moveTo(sources[0]);
	           	}}else{
	           	    creep.memory
	           	}	                
                
            }else{ // FILL FROM MINERS
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
        case 1: // BUILD
            var areas = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (areas.length){ // FOUND - TODO, upgrademode?
            if(creep.build(areas[0]) == ERR_NOT_IN_RANGE){ /* not by range - preserving cpu? */
                creep.moveTo(areas[0]);
            }           
            }else{ // NOT FOUND
                creep.memory.job = creep.memory.job + 1;
            }
        
            break;
            
        case 2: // UPGRADE
            break;
        
    }
      
}