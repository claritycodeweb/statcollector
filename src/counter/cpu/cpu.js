var os = require('os');
var util = require('util');
var Counter = require('../counter.js');

function Cpu(unit, interval) {
    Counter.call(this);

    this.counterName = "cpu_usage";
    this.unit = unit || "%";
}

util.inherits(Cpu, Counter);

Cpu.prototype.cpuUsage = function (callBack) {
    var startMeasure = cpuAverage();

    //Set delay for second Measure
    setTimeout(function () {

        //Grab second Measure
        var endMeasure = cpuAverage();

        //Calculate the difference in idle and total time between the measures
        var idleDifference = endMeasure.idle - startMeasure.idle;
        var totalDifference = endMeasure.total - startMeasure.total;

        //Calculate the average percentage CPU usage
        var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

        if (percentageCPU > 100) {
            percentageCPU = 100;
        }
        //Output result 
        callBack.call(this, percentageCPU);

    }.bind(this), 500);
};

//Create function to get CPU information
function cpuAverage() {

    //Initialise sum of idle and time of cores and fetch CPU info
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();

    //Loop through CPU cores
    for (var i = 0, len = cpus.length; i < len; i++) {

        //Select CPU core
        var cpu = cpus[i];

        //Total up the time in the cores tick
        for (type in cpu.times) {
            totalTick += cpu.times[type];
        }

        //Total up the idle time of the core
        totalIdle += cpu.times.idle;
    }

    //Return the average Idle and Tick times
    return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
};

Cpu.prototype.run = function (callBack) {
    this.cpuUsage(callBack);
};

module.exports = Cpu;