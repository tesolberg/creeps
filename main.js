var visualsSpawn = require("visuals.spawn");
var creep_manager = require("creep_manager");

module.exports.loop = function() {
    

    
    // Visualisations
    visualsSpawn.run();
    
    // Creep roles logic
    creep_manager.run();
    
    // Garbage recycling
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory: " + name);
        }
    }
    

}