var harvester = require("harvester");
var builder = require("builder");
var guard = require("guard");
var custodian = require("custodian");
/*var upgrader = require("upgrader");*/
module.exports.loop = function () {
    for (var name in Game.creeps){
        var creep = Game.creeps[name];
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
        /* if (creep.memory.role == "upgrader") Builders now work as Upgraders. */
        /*    upgrader(creep);
        } */
        if (creep.ticksToLive < 50 && creep.memory.willbereplaced != 1){ /* handle creep decay */ /* use renew instead? */
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