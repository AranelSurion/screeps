var harvester = require("harvester");
var builder = require("builder");
var guard = require("guard");
var custodian = require("custodian");
var miner = require("miner");
var carrier = require("carrier");
/*var upgrader = require("upgrader");*/
module.exports.loop = function () {

    /* spawn guards on hostile presence */
        if (Game.spawns.Spawn1.room.find(FIND_HOSTILE_CREEPS).length > 0 && Game.spawns.Spawn1.energy >= 150){
            Game.notify("Main: We are under attack!");
            if (Game.spawns.Spawn1.createCreep([ATTACK, ATTACK, TOUGH, TOUGH, MOVE, MOVE], null, {role: "guard"}) == -6){ /* not enough energy */
                Game.spawns.Spawn1.createCreep([ATTACK, TOUGH, TOUGH, MOVE], null, {role: "guard"});
            }
        }

    for (var name in Game.creeps){ /* main for loop */
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
        /* if (creep.memory.role == "upgrader") Builders now work as Upgraders. */
        /*    upgrader(creep);
        } */
        
 
        /* creep renewal */
        if (26 < creep.ticksToLive && creep.ticksToLive < 200){
            creep.memory.renewal = 1;
        }
        if (creep.memory.renewal == 1){
            creep.cancelOrder("move"); /* cancel ALL scheduled movement orders */
            process = Game.spawns.Spawn1.renewCreep(creep);
            if (process == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.spawns.Spawn1);
            }
            if (process == ERR_FULL){ /* creep renewed. */
                creep.memory.renewal = 0;
                console.log("renewal: this creep is full.");
            }
        }
        
        /* creep is lost. recreate. */
        if (creep.ticksToLive < 25 && creep.memory.willbereplaced != 1){ /* handle creep decay */ /* use renew instead? */
            cbody = [];
            for (var i in creep.body)
            {
                cbody[i] = creep.body[i].type;
            }
            console.log("Spawning: " + cbody + " " +creep.memory.role);
            var retvalue = Game.spawns.Spawn1.createCreep(cbody, null, {role: creep.memory.role});
            if (_.isString(retvalue)){
                creep.memory.willbereplaced = 1;
            }else{
                console.log("Couldn't replicate a new creep. DEBUG:" + retvalue + cbody + creep.memory.role)
            }
        } 

    
    
}}