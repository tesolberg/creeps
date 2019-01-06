
var creep_helpers = {
    
    getEnergyFromContainer: function (creep) {
        if (!creep.memory.resourceTarget || creep.memory.resourceTarget.store[RESOURCE_ENERGY] < creep.carryCapacity) {
            this.get_new_energy_target(creep);
        }

        if(creep.memory.resourceTarget){
            var target = Game.getObjectById(creep.memory.resourceTarget.id);

            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }    
        }
    },

    get_new_energy_target: function (creep) {
        creep.memory.resourceTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= creep.carryCapacity);}})
    }
}

module.exports = creep_helpers;