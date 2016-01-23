var harvester = require("harvester");
var builder = require("builder");
var guard = require("guard");
var upgrader = require("upgrader");
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
        /* if (creep.memory.role == "upgrader") Builders now work as Upgraders. */
        /*    upgrader(creep);
        } */
        if (creep.ticksToLive < 50 && creep.memory.willbereplaced != 1){ /* use renew instead? */
            cbody = [];
            for (var i in creep.body)
            {
                cbody[i] = creep.body[i].type;
            }
            console.log(cbody);
            var retvalue = Game.spawns.Spawn1.createCreep(cbody, null, {role: creep.memory.role});
            if (retvalue == 0){
                creep.memory.willbereplaced = 1;
            }else{
                console.log("Couldn't replicate a new creep. DEBUG:" + retvalue + cbody + creep.memory.role)
            }
        } 

    
	
}}