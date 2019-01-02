
var roleRepairer = {
    
    run: function (creep) {
        
               // State logic for building/harvesting
        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.say("⛏️");
            creep.memory.harvesting = true;
            }
        else if (creep.carry.energy == creep.carryCapacity && creep.memory.harvesting) {
            creep.say("⚒️");
            creep.memory.harvesting = false;
        }
        
        
        if (creep.memory.harvesting == true) {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 100);}})
            
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#1bb1c1'}});
            }}
        else {
            var closestDamagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 10000
                });
    
            if (closestDamagedStructure) {
                if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDamagedStructure);
                    }
                }
            }
        }
    }

module.exports = roleRepairer;