
var spawn = Game.spawns[Object.keys(Game.spawns)[0]];

var bootstrapper = {

    run: function (creep) {
        
        // State logic for harvesting/working
        check_harvesting_logic(creep);
        
        // If harvesting -> harvest energy
        if (creep.memory.harvesting) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaaaa'}});
            }
        }
        else {
            // Else if spawn or extensions not at full capacity -> drop off there
            var dropOff = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => { return (s.structureType == STRUCTURE_EXTENSION || 
                    s.structureType == STRUCTURE_SPAWN) 
                    && s.energy < s.energyCapacity;}
            })
            if (dropOff) {
                if (creep.transfer(dropOff, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropOff, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
            // Else if unfinished construction sites -> complete those found.
            else {
                var build_projects = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (build_projects.length) {
                    if (creep.build(build_projects[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(build_projects[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                // Else upgrade controller.
                else {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller,  {visualizePathStyle: {stroke: '#1bb1c1'}});
                    }
                }            
            }
        }
    },

    spawn_creep: function() {
        Game.spawns["Spawn1"].spawnCreep([WORK,CARRY,MOVE,MOVE], "Bootstrapper_" + Game.time, {memory: {role: "bootstrapper"}});
    }
}

function check_harvesting_logic(creep) {
    if (!creep.memory.harvesting && creep.carry.energy == 0) {
        creep.say("⚡");
        creep.memory.harvesting = true;
    }
    else if (creep.carry.energy == creep.carryCapacity && creep.memory.harvesting) {
        creep.say("⚒️");
        creep.memory.harvesting = false;
    }
}



module.exports = bootstrapper;