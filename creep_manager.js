var builder = require("creep_builder");
var repairer = require("creep_repairer");
var transporter = require("creep_transporter");
var bootstrapper = require("creep_bootstrapper");
var miner = require("creep_miner");
var system_constants = require("system_constants");
var creep_helpers = require("creep_helpers");

// E35N42

Memory.bootstrapping = false;

var creep_manager = {
    
    run: function() {
        maintain_population();
        run_creeps();
        check_bootstrapping();
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
        if (Memory.bootstrapping && bootstrappers.length < 2) {
            bootstrapper.spawn_creep();
        }
        else {
            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == "miner");
            var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == "transporter");
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
            
            //  Miners
            if (miners.length < system_constants.population_targets.miners) {
                miner.spawn_creep();
            }
            // Transporters
            else if (transporters.length < system_constants.population_targets.transporters) {
                transporter.spawn_creep();
            }
            // Repairers
            else if (!Memory.bootstrapping && repairers.length < system_constants.population_targets.repairers) {
                repairer.spawn_creep();
            }
            // Builders
            else if (!Memory.bootstrapping && builders.length < system_constants.population_targets.builders) {
                builder.spawn_creep();
            }
        }
    }

function check_bootstrapping() {
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == "miner").length;
    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == "transporter").length;
    console.log("Miners: " + miners + ". Transporters: " + transporters + ". Bootstrapping: " + Memory.bootstrapping);

    if (Memory.bootstrapping &&
        miners == system_constants.population_targets.miners &&
        transporters == system_constants.population_targets.transporters) {
        Memory.bootstrapping = false;
        console.log("Bootstrapping set to false");
    }
    else if (!Memory.bootstrapping &&
        miners == 0 &&
        transporters == 0) {
        Memory.bootstrapping = true;
        console.log("Bootstrapping set to true");
    }
}

module.exports = creep_manager;