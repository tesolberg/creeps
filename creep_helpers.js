
var creep_helpers = {
    
    getEnergyFromContainer: function (creep) {
        if (!creep.memory.resourceTarget) {
            this.get_new_energy_container(creep);
        }
        if (creep.memory.resourceTarget && 
            Game.getObjectById(creep.memory.resourceTarget.id).store[RESOURCE_ENERGY] < creep.carryCapacity) {
                this.get_new_energy_container(creep);
            }

        if(creep.memory.resourceTarget){
            var target = Game.getObjectById(creep.memory.resourceTarget.id);

            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }    
        }
    },

    get_new_energy_container: function (creep) {
        creep.memory.resourceTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= creep.carryCapacity);}})
    },

    getEnergyFromStorage: function (creep) {
        if (!creep.memory.resourceTarget) {
            this.get_new_energy_storage(creep);
        }
        if (creep.memory.resourceTarget && 
            Game.getObjectById(creep.memory.resourceTarget.id).store[RESOURCE_ENERGY] < creep.carryCapacity) {
                this.get_new_energy_storage(creep);
            }

        if(creep.memory.resourceTarget){
            var target = Game.getObjectById(creep.memory.resourceTarget.id);

            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }    
        }
    },

    get_new_energy_storage: function (creep) {
        creep.memory.resourceTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => { return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] >= creep.carryCapacity);}})
    }
}

module.exports = creep_helpers;