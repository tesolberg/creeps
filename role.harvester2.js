
var roleHarvester2 = {
    
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaaaa'}});
            }
        }
        else {
            var dropOff = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => { return (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity);}
            })
            
            if (dropOff) {
                if (creep.transfer(dropOff, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropOff, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
        }
    }
}

module.exports = roleHarvester2;