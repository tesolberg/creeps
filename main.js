var visualsSpawn = require("visuals.spawn");
var creep_manager = require("creep_manager");
var structure_tower = require("structure_tower");

module.exports.loop = function() {
    

    
    // Visualisations
    visualsSpawn.run();
    
    // Creep roles logic
    creep_manager.run();
    
    // Towers
    structure_tower.run();

    // Garbage recycling
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory: " + name);
        }
    }    
}