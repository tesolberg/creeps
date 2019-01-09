var creep_helpers = require("creep_helpers");
var system_constants = require("system_constants");

var transporter = {

    run: function (creep) {
        if (creep.carry.energy == 0) {
            creep_helpers.getEnergyFromContainer(creep);
        }
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || 
                    structure.structureType == STRUCTURE_SPAWN || 
                    structure.structureType == STRUCTURE_TOWER) 
                    && structure.energy < structure.energyCapacity;
                }})
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}});
                }
                else {
                    creep_helpers.get_new_energy_container(creep);
                }
            }
            else {
                var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE);
                    }})
                    if (storage) {
                    if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#00ff00'}});
                    }
                }
            }
            // TODO idle goto position
        }
    },

    spawn_creep: function() {
        var e = Game.spawns["Spawn1"].room.energyCapacityAvailable;
        
        if (e >= 1300 && !Memory.bootstrapping) {
            Game.spawns["Spawn1"].spawnCreep([
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], "Transporter_" + Game.time, {memory: {role: "transporter"}});
            }
        else if (e >= 800 && !Memory.bootstrapping) {
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