var system_constants = require("system_constants");

var tower = {

    run: function() {
        var towers = Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, 
            {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER);}})
        
        for (t in towers) {
            var closestDamagedStructure = towers[t].pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax 
                && structure.hits < system_constants.utilities.repair_threshold
            });
            if(closestDamagedStructure) {
                towers[t].repair(closestDamagedStructure);
            }

            var closestHostile = towers[t].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                towers[t].attack(closestHostile);
            }
        }
    }
}

module.exports = tower;