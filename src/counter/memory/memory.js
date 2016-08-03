var os = require('os');
var util = require('util');
var Counter = require('../counter.js');

var total = os.totalmem();

function Memory(unit, interval) {
    Counter.call(this);

    this.counterName = "memory_usage";
    this.unit = unit || "GB";
    this.interval = interval || this.interval;
}

util.inherits(Memory, Counter);

Memory.prototype.getFreeMemory = function () {
    return os.freemem();
};

Memory.prototype.getTotalMemory = function () {
    return this.round(this.convert(total));
};

Memory.prototype.getMemoryUsage = function () {
    return (total - this.getFreeMemory());
};

Memory.prototype.run = function (callBack) {
    callBack.call(this, this.round(this.convert(this.getMemoryUsage())));
};

module.exports = Memory;