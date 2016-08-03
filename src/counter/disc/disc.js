var os = require('os');
var util = require('util');
var Counter = require('../counter.js');
var diskspace = require('diskspace');

function Disc(unit, interval, letter) {
    Counter.call(this);

    this.counterName = "disc_usage";
    this.unit = unit || "GB";
    this.driveLetter = letter || 'C';
    this.interval = interval || this.interval;
}

util.inherits(Disc, Counter);

Disc.prototype.run = function (callBack) {
    diskspace.check('C', function (err, total, free, status) {
        callBack.call(this, this.round(this.convert(total - free)));
    }.bind(this));
};

module.exports = Disc;