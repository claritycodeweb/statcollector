var os = require('os');
var timeOut;

function Counter() {
    this.counterName = 'Default';
    this.unit = '';
    this.decimals = 1;
    this.platform = os.platform();
}

Counter.prototype.getCounterName = function () {
    return this.counterName;
};

Counter.prototype.convert = function (value) {
    if (this.unit.toUpperCase() == "MB") {
        return value / 1024 / 104;
    }

    if (this.unit.toUpperCase() == "GB") {
        return value / 1024 / 1024 / 1024;
    }

    return value;
};

Counter.prototype.round = function (value) {
    return value.toFixed(this.decimals);
};

module.exports = Counter;



