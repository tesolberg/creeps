var builder = require("creep_builder");
var repairer = require("creep_repairer");
var transporter = require("creep_transporter");
var bootstrapper = require("creep_bootstrapper");
var miner = require("creep_miner");
var system_constants = require("system_constants");
var creep_helpers = require("creep_helpers");

var creep_manager = {
    
    run: function() {
        maintain_population();
        run_creeps();
    }
}

function run_creeps() {
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
    
        switch (creep.memory.role) {
            case "miner":
                miner.run(creep);
                break;
            case "builder":
                builder.run(creep);
                break;
            case "transporter":
                transporter.run(creep);
                break;
            case "repairer":
                repairer.run(creep);
                break;
            case "bootstrapper":
                bootstrapper.run(creep);
                break;
            default:
                console.log("Creep role not recognized");
        }
    }
}

function maintain_population() {
        var bootstrappers = _.filter(Game.creeps, (creep) => creep.memory.role == "bootstrapper");
        if (system_constants.bootstrapping && bootstrappers.length < 1) {
            bootstrapper.spawn_creep();
        }
        else {
            // Transporters
            var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == "transporter");
            if (transporters.length < system_constants.population_targets.transporters) {
                transporter.spawn_creep();
            }
            // Miners
            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == "miner");
            if (miners.length < system_constants.population_targets.miners) {
                miner.spawn_creep();
            }
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");
            if (builders.length < system_constants.population_targets.builders) {
                builder.spawn_creep();
            }
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
            if (repairers.length < system_constants.population_targets.repairers) {
                repairer.spawn_creep();
            }
        }
        
  
        

        
    }

function check_bootstrapping() {
    var e = Game.spawns["Spawn1"].room.energyAvailable;
    if (system_constants.utilities.bootstrapping && e >= 550) {
        system_constants.utilities.bootstrapping = false;
    }

}

module.exports = creep_manager;