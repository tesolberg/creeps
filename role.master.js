/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.master');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var roleHarvester2 = require("role.harvester2");
var roleTransporter = require("role.transporter");

var roleMaster = {
    
    run: function() {
        
        for(var name in Game.creeps){
            var creep = Game.creeps[name];
            
            if (creep.memory.role == "builder") {
                roleBuilder.run(creep);
            }
            else if (creep.memory.role == "repairer") {
                roleRepairer.run(creep);
            }
            else if (creep.memory.role == "harvester2" || creep.memory.role == "miner") {
                roleHarvester2.run(creep);
            }
            else if (creep.memory.role == "transporter") {
                roleTransporter.run(creep);
            }
            
        }
    }
}


module.exports = roleMaster;