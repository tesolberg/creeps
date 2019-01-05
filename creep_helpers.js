
var creep_helper = {
    
    getEnergyFromContainer: function (creep) {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 100);}})
            
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#1bb1c1'}});
        }
    }
}

module.exports = creep_helper;