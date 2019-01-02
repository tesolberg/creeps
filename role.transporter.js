var helpersCreep = require("helpers.creep");

var roleTransporter = {

    run: function (creep) {
        if (creep.carry.energy == 0) {
            helpersCreep.getEnergyFromContainer(creep);
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
    }
}


module.exports = roleTransporter;