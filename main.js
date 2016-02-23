/* ROLE MODULES */
var harvester = require("harvester");
var builder = require("builder");
var buildernew = require("buildernew");
var guard = require("guard");
var custodian = require("custodian");
var miner = require("miner");
var carrier = require("carrier");
var hauler = require("hauler");
var claimer = require("claimer");
/*var upgrader = require("upgrader");*/

/* STATIC GLOBALS */
DEFCON = 5;

/* CODE */
module.exports.loop = function () {

     /* MAIN SPAWN LOOP */
     for (var name in Game.spawns){ 
        var spawn = Game.spawns[name];

     /* spawn guards on hostile presence */
     var hostiles = spawn.room.find(FIND_HOSTILE_CREEPS, {filter: function(object){ return object.owner != "Source Keeper";}});
     if (hostiles.length > 0){ // hostile detected
            //Game.spawns.Spawn1.memory.hostiles = 1;
            if (hostiles[0].owner.username != "Invader"){Game.notify(spawn.name + ": We are under attack!");}
            var towers = spawn.room.find(FIND_MY_STRUCTURES,{filter: function(object){return object.structureType == STRUCTURE_TOWER;}});
            for (var id in towers){
                var tower = towers[id];
                tower.attack(hostiles[0]);
            }
            
            // CHECKS GUARD COUNT. OPTIMIZE THIS.
            var guard_count = 0;
            for (var name in Game.creeps){
                var creep = Game.creeps[name];
                if (creep.room == spawn.room  && creep.memory.role == "guard"){
                    guard_count = guard_count + 1;
                }
            }
            if (guard_count < 6){
                console.log(spawn.name + ": Spawning more guards.");
                if (spawn.createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK,  MOVE], null, {role: "guard", willbereplaced: 1}) == -6){
                    if (spawn.createCreep([TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE], null, {role: "guard", willbereplaced: 1}) == -6){ /* not enough energy */
                        spawn.createCreep([TOUGH, TOUGH, ATTACK, MOVE], null, {role: "guard", willbereplaced: 1});
                    }
                }
                
            }else{
                console.log(spawn.name + ": Guards on duty.")
            }            
            
     }else{ /* HEAL GUARDS */
            var myguards = spawn.room.find(FIND_MY_CREEPS, {filter: function(object){ return object.hits < object.hitsMax;}});
            var towers = spawn.room.find(FIND_MY_STRUCTURES,{filter: function(object){return object.structureType == STRUCTURE_TOWER;}});
            for (var id in towers){
                var tower = towers[id];
                if (tower.energy > 750){
                tower.heal(myguards[0]);
                }
            }         
        }
     }
     
     
    /* MAIN ROOM LOOP */
    for (var name in Game.rooms){
        var thisroom = Game.rooms[name];
        //console.log(thisroom.name);
        
        /* LINK LOGIC */
        //var xlink1 = thisroom.memory.link1;
        
        var linkpoints = thisroom.memory.linkpoints;
        if (typeof linkpoints !== "undefined"){
        //console.log(linkpoints.length);
            for (var i = 0; i < linkpoints.length; i++){
                var fromLink = thisroom.lookForAt('structure', linkpoints[i][0], linkpoints[i][1])[0];  
                var toLink = thisroom.lookForAt('structure', linkpoints[i][2], linkpoints[i][3])[0];  
                fromLink.transferEnergy(toLink);
            }
        } 

        
    }
     
     
     /* oldcode
        var hostiles = Game.spawns.Spawn1.room.find(FIND_HOSTILE_CREEPS, {filter: function(object){ return object.owner != "Source Keeper";}});
        if (hostiles.length > 0 && Game.spawns.Spawn1.energy >= 150){
            Game.spawns.Spawn1.memory.hostiles = 1;
            Game.notify("Main: We are under attack!");
            var tower = Game.spawns.Spawn1.pos.findClosestByRange(FIND_MY_STRUCTURES,{filter: function(object){return object.structureType == STRUCTURE_TOWER;}}); // TODO use find(), multiple towers.
            if (tower){ tower.attack(hostiles[0]); } // STRUCTURE_TOWER EXISTS
            if (Game.spawns.Spawn1.createCreep([TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE], null, {role: "guard"}) == -6){ // not enough energy 
                Game.spawns.Spawn1.createCreep([TOUGH, TOUGH, ATTACK, MOVE], null, {role: "guard"});
            }
        }else{
            Game.spawns.Spawn1.memory.hostiles = 0;
        }
     end of oldcode */

    /* LINK-to-LINK CODE 
    if (link1 && link2){
    linkFrom = Game.spawns.Spawn1.room.lookForAt('structure', link1[0], link1[1])[0];
    linkTo = Game.spawns.Spawn1.room.lookForAt('structure', link2[0], link2[1])[0];
    }
    if (linkFrom && linkTo){
    linkFrom.transferEnergy(linkTo)
    } */
    
    /* MAIN CREEP LOOP */
    for (var name in Game.creeps){
        var creep = Game.creeps[name];
 
        /* roles */
        if (creep.memory.role == "harvester"){
           harvester(creep); 
        } 
        if (creep.memory.role == "builder"){
            builder(creep);
        }
        if (creep.memory.role == "guard"){
            guard(creep);
        }
        if (creep.memory.role == "custodian"){
            custodian(creep);
        }
        if (creep.memory.role == "miner"){
            miner(creep);
        }
        if (creep.memory.role == "carrier"){
            carrier(creep);
        } 
        if (creep.memory.role == "hauler"){
            hauler(creep);
        }  
        if (creep.memory.role == "buildernew"){
            buildernew(creep);
        }  
        if (creep.memory.role == "claimer"){
            claimer(creep);
        } 
        /* if (creep.memory.role == "upgrader") Builders now work as Upgraders. */
        /*    upgrader(creep);
        } */
        
 
        /* creep renewal */
        if (26 < creep.ticksToLive && creep.ticksToLive < 200){
            creep.memory.renewal = 1;
            if (creep.memory.renewloc == undefined){
                var renewloc = creep.room.find(FIND_MY_SPAWNS);
                if (renewloc.length > 0){
                    creep.memory.renewloc = renewloc[0].id;    
                }
            }
        }
        var renewloc = Game.getObjectById(creep.memory.renewloc);
        if (renewloc != null){
        if (creep.memory.role == "carrier" && renewloc.room.energyAvailable < 20){ creep.transfer(renewloc, RESOURCE_ENERGY); creep.memory.renewal = 0; } /* otherwise, carrier might -rarely- get stuck in an empty spawn */
        if (creep.memory.renewal == 1 && creep.memory.willbereplaced != 1){
            creep.cancelOrder("move"); /* cancel ALL scheduled movement orders */
            process = renewloc.renewCreep(creep);
            if (process == ERR_NOT_IN_RANGE){
                creep.moveTo(renewloc);
            }
            if (process == ERR_FULL){ /* creep renewed. */
                creep.memory.renewal = 0;
                delete(creep.memory.renewloc);
                console.log("renewal: this creep is full.");
            }
        }}

        /* creep is lost. recreate. */
        if (creep.ticksToLive < 25 && creep.memory.willbereplaced != 1){ /* handle creep decay */ /* use renew instead? */
            var renewloc = creep.room.find(FIND_MY_SPAWNS)[0];
            Game.notify("A creep is lost.");
            cbody = [];
            for (var i in creep.body)
            {
                cbody[i] = creep.body[i].type;
            }
            console.log("Spawning: " + cbody + " " +creep.memory.role);
            var retvalue = renewloc.createCreep(cbody, null, {role: creep.memory.role});
            if (_.isString(retvalue)){
                creep.memory.willbereplaced = 1;
            }else{
                console.log("Couldn't replicate a new creep. DEBUG:" + retvalue + cbody + creep.memory.role)
            }
        } 

    
    
}}