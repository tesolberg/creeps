/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('balance.population');
 * mod.thing == 'a thing'; // true
 */

// Set target numbers here
var num_builders = 9;
var num_repairers = 1;
var num_miners = 1;
var num_transporters =1;


var balancePop = {
    
    run: function() {
        
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");
        if (builders.length < num_builders) {
            Game.spawns["Spawn1"].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], "Builder" + Game.time, {memory: {role: "builder"}});
        }
        
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester2" || creep.memory.role == "miner");
        if (miners.length < num_miners) {
            Game.spawns["Spawn1"].spawnCreep([WORK,WORK,CARRY,MOVE], "Miner_" + Game.time, {memory: {role: "miner"}});
        }
        
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
        if (repairers.length < num_repairers) {
            Game.spawns["Spawn1"].spawnCreep([WORK,WORK, WORK,CARRY,MOVE,MOVE,MOVE,MOVE], "Repairer" + Game.time, {memory: {role: "repairer"}});
        }
        
        var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == "transporter");
        if (transporters.length < num_transporters) {
            Game.spawns["Spawn1"].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], "Transporter_" + Game.time, {memory: {role: "transporter"}});
        }
        
    // Garbage recycling
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory: " + name);
        }
    }
        
    }
    
}



module.exports = balancePop;