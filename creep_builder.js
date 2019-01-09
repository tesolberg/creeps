var creep_helpers = require("creep_helpers");

var roleBuilder = {
    
    run: function(creep) {
        
        // State logic for working/grabbing energy
        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.say("⚡");
            creep.memory.harvesting = true;
            creep_helpers.get_new_energy_storage(creep);
        }
        else if (creep.carry.energy == creep.carryCapacity && creep.memory.harvesting) {
            creep.say("⚒️");
            creep.memory.harvesting = false;
        }
        
        if (creep.memory.harvesting == true) {
            creep_helpers.getEnergyFromStorage(creep);
        }
        else {
            var build_projects = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (build_projects.length) {
                if (creep.build(build_projects[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(build_projects[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller,  {visualizePathStyle: {stroke: '#1bb1c1'}});
                }
            }
        }
            
    },
    
    spawn_creep: function() {
        var e = Game.spawns["Spawn1"].room.energyCapacityAvailable;
        if (e >= 1300) {
            Game.spawns["Spawn1"].spawnCreep([
                WORK,WORK,WORK,WORK,WORK,WORK,                      // 6 x 100 = 600
                CARRY,CARRY,CARRY,CARRY,                            // 4 x  50 = 200
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], // 10 x 50 = 500
                "Builder_" + Game.time, {memory: {role: "builder"}});
            }
        else if (e >= 800) {
            Game.spawns["Spawn1"].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], "Builder_" + Game.time, {memory: {role: "builder"}});
            }
        else if (e >= 550) {
            Game.spawns["Spawn1"].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], "Builder_" + Game.time, {memory: {role: "builder"}});
            }

        else {
        Game.spawns["Spawn1"].spawnCreep([WORK,CARRY,MOVE,MOVE], "Builder_" + Game.time, {memory: {role: "builder"}});
        }    
    }    
}


module.exports = roleBuilder;