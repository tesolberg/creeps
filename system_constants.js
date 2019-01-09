// ROOM: E35N42

const repair_threshold = 50000;

// Creep population targets
const miners = 2;
const transporters = 2;
const builders = 1;
const repairers = 1;

var population_targets = {
    get miners() {return miners;},
    get transporters() {return transporters;},
    get builders() {return builders;},
    get repairers() {return repairers;}
}

var utilities = {
    get repair_threshold() {return repair_threshold;},
}

module.exports = {population_targets, utilities};