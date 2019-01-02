var balancePop = require("balance.pop");
var visualsSpawn = require("visuals.spawn");
var roleMaster = require("role.master");
var defenseTower = require("defense.tower");

module.exports.loop = function() {
    
    // Creep population maintenance
    balancePop.run();
    
    // Visualisations
    visualsSpawn.run();
    
    // Creep roles logic
    roleMaster.run();
    
    // Defense
    //defenceTower.run();


}