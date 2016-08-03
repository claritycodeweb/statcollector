var PSRunner = {
    send: function (commands) {
        var self = this;
        self.out = [];
        self.err = [];
        var results = [];
        var spawn = require("child_process").spawn;
        var child = spawn("powershell.exe", [commands]);

        child.stdout.on("data", function (data) {
            self.out.push(data.toString());
        });
        child.stderr.on("data", function (data) {
            self.err.push(data.toString());
        });

        child.on("exit", function () {
            results.push({ command: commands, output: self.out, errors: self.err });
            //console.log("Powershell Script finished");
            //if(results.output){
            if (self.out) {
                console.log(self.out[0].trim());
            }
            //}
        });

        child.stdin.end();
    },
};

module.exports = PSRunner;