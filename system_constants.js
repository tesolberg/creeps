

var bootstrapping = false;
var repair_threshold = 50000;

// Creep population targets
const miners = 3;
const transporters = 2;
const builders = 2;
const repairers = 1;

var population_targets = {
    get miners() {return miners;},
    get transporters() {return transporters;},
    get builders() {return builders;},
    get repairers() {return repairers;}
}

var utilities = {
    get bootstrapping() {return bootstrapping;},
    set bootstrapping(v) {bootstrapping = v;},
    get repair_threshold() {return repair_threshold;},
    set repair_threshold(v) {repair_threshold = v;}
}

module.exports = {population_targets, bootstrapping: bootstrapping, utilities};