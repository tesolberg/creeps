var system_constants = require("system_constants");
var creep_helpers = require("creep_helpers");

var repairer = {
    
    run: function (creep) {
        
               // State logic for repairing/getting energy
        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.say("⛏️");
            creep.memory.harvesting = true;
            }
        else if (creep.carry.energy == creep.carryCapacity && creep.memory.harvesting) {
            creep.say("⚒️");
            creep.memory.harvesting = false;
        }
        
        
        if (creep.memory.harvesting == true) {
            creep_helpers.getEnergyFromContainer(creep); 
        }
        else {
            var closestDamagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits < system_constants.utilities.repair_threshold});
            if (closestDamagedStructure) {
                if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#ffaaaa'}});
                }
            }
        }
    },

    spawn_creep: function() {
        var e = Game.spawns["Spawn1"].room.energyAvailable;
        if (e >= 550) {
            Game.spawns["Spawn1"].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], "Repairer_" + Game.time, {memory: {role: "repairer"}});
            }
        else {
            Game.spawns["Spawn1"].spawnCreep([WORK,CARRY,MOVE,MOVE], "Repairer_" + Game.time, {memory: {role: "repairer"}});
        }    
    }
}

module.exports = repairer;