'use strict';
var querystring = require('querystring');

var measureService = function (http) {
    var timeOut;
    var board;

    function collect(interval, boards, counter) {
        board = boards;
        interval = interval || 5000;
        var defaultInterval = interval;

        function callback() {

            counter.run(collectDataFn);

            timeOut = setTimeout(callback, interval);
        }
        timeOut = setTimeout(callback, interval);
    }

    function collectDataFn(value) {
        var reqData = {
            counterName: this.counterName,
            platform: this.platform,
            unit: this.unit,
            value: value,
            boards: board
        };

        console.log(reqData);
        post(reqData)
    }


    function post(data) {
        var postData = querystring.stringify(data);
        //console.log(postData);
        var options = {
            hostname: 'localhost',
            port: 9000,
            path: '/api/logs',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Content-Length': Buffer.byteLength(postData)
            }
        };

        var req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });

        // write data to request body
        req.write(JSON.stringify(data));
        req.end();
    }

    function stop(callback) {
        clearTimeout(timeOut);

        if (callback) {
            callback();
        }
    }

    return {
        collect: collect,
        stop: stop
    };
};

module.exports = measureService