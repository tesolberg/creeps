var system_constants = require("system_constants");

var miner = {
    
    run: function (creep) {

        if (!creep.memory.sourceTarget) {
            check_source_target(creep);
        }

        if(!creep.memory.sourceTarget){
            "No available target for miner";
            return;
        }

        var target = Game.getObjectById(creep.memory.sourceTarget);
        // If not full capacity
        if (creep.carry.energy < creep.carryCapacity) {
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaaaa'}});
            }
        }
        // Else drop off at closest container
        else {
            var dropOff = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => { return (s.structureType == STRUCTURE_CONTAINER);}
            })
            
            if (dropOff) {
                if (creep.transfer(dropOff, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropOff, {visualizePathStyle: {stroke: '#00ff00'}});
                }
                // If dropoff successful
                else {
                    //check_source_target(creep);
                }
            }
        }
    },

    spawn_creep: function() {
        var e = Game.spawns["Spawn1"].room.energyCapacityAvailable;

        if (e >= 800 && !Memory.bootstrapping) {
            Game.spawns["Spawn1"].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE], "Miner_" + Game.time, {memory: {role: "miner"}});
        }
        else if (e >= 500 && !Memory.bootstrapping) {
            Game.spawns["Spawn1"].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], "Miner_" + Game.time, {memory: {role: "miner"}});
            }
        else {
            Game.spawns["Spawn1"].spawnCreep([WORK,WORK,CARRY,MOVE], "Miner_" + Game.time, {memory: {role: "miner"}});
        }
    }
}

function check_source_target (creep) {
    // Collects other miners source target IDs
    var miners = _.filter(Game.creeps, (c) => c.memory.role == "miner" && c.id != creep.id);
    var occupied_energy_targets_id = _.map(miners, (c) => c.memory.sourceTarget);

    // Gathers IDs of all sources in room.
    var sources = creep.room.find(FIND_SOURCES);
    var sources_id = _.map(sources, (s) => s.id);

    for (s in sources_id) {
        var available = true;
        
        // Checks if the given source is in the occupied source array. If it is -> available set to false
        for (taken in occupied_energy_targets_id){
            if (sources_id[s] === occupied_energy_targets_id[taken]) {
                available = false;
            }
        }

        // If source still is available after checking occypied source targets, assigns this source to the miner.
        if (available)
        {
            creep.memory.sourceTarget = sources_id[s];
        }
    }
}

module.exports = miner;