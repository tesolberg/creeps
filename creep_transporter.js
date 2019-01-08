var creep_helpers = require("creep_helpers");
var system_constants = require("system_constants");

var transporter = {

    run: function (creep) {
        if (creep.carry.energy == 0) {
            creep_helpers
        .getEnergyFromContainer(creep);
        }
        else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || 
                    structure.structureType == STRUCTURE_SPAWN || 
                    structure.structureType == STRUCTURE_TOWER) 
                    && structure.energy < structure.energyCapacity;
                }})
            if (targets) {
                if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
            // Add idle goto position
        }
    },

    spawn_creep: function() {
        var e = Game.spawns["Spawn1"].room.energyCapacityAvailable;
        if (e >= 800 && !Memory.bootstrapping) {
            Game.spawns["Spawn1"].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], "Transporter_" + Game.time, {memory: {role: "transporter"}});
            }
        else if (e >= 500 && !Memory.bootstrapping) {
            Game.spawns["Spawn1"].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], "Transporter_" + Game.time, {memory: {role: "transporter"}});
            }
        else {
            Game.spawns["Spawn1"].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], "Transporter_" + Game.time, {memory: {role: "transporter"}});
        }
    }
}


module.exports = transporter;