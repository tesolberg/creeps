

var bootstrapping = false;
var repair_threshold = 50000;

// Creep population targets
const miners = 2;
const transporters = 3;
const builders = 3;
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

// 5bbcaef89099fc012e639e5e
// 5bbcaef89099fc012e639e5d