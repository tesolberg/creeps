/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('balance.population');
 * mod.thing == 'a thing'; // true
 */

// Set target numbers here
var num_builders = 0;
var num_repairers = 1;
var num_miners = 2;
var num_transporters = 1;


var balancePop = {
    
    run: function() {
        
        // var savers = _.filter(Game.creeps, (creep) => creep.memory.role == "saver");
        // if (savers.length < 10) {
        //     //Game.spawns["Spawn1"].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], "Saver" + Game.time, {memory: {role: "saver"}});
        //     Game.spawns["Spawn1"].spawnCreep([WORK,WORK,CARRY,MOVE], "Saver" + Game.time, {memory: {role: "saver"}});
        // }
        
        // var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");
        // if (builders.length < num_builders) {
        //     Game.spawns["Spawn1"].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], "Builder" + Game.time, {memory: {role: "builder"}});
        // }
        
        // var miners = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester2" || creep.memory.role == "miner");
        // if (miners.length < num_miners) {
        //     Game.spawns["Spawn1"].spawnCreep([WORK,WORK,CARRY,MOVE], "Miner_" + Game.time, {memory: {role: "miner"}});
        // }
        
        // var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
        // if (repairers.length < num_repairers) {
        //     Game.spawns["Spawn1"].spawnCreep([WORK,WORK, WORK,CARRY,MOVE,MOVE,MOVE,MOVE], "Repairer" + Game.time, {memory: {role: "repairer"}});
        // }
        
        // var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == "transporter");
        // if (transporters.length < num_transporters) {
        //     Game.spawns["Spawn1"].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], "Transporter_" + Game.time, {memory: {role: "transporter"}});
        // }
        

        
    }
    
}



module.exports = balancePop;