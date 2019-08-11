"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Converter = (function () {
    function Converter() {
    }
    Converter.prototype.parseLogFile = function (logs, debug) {
        var _this = this;
        var lastLogTime = 0;
        return logs.split("\n").map(function (log) {
            var ip = log.split(" - - ")[0];
            var dateStrs = log.match(/\[([a-zA-Z0-9\/: +]+)\]/g);
            var timeSinceLast = 0;
            if (dateStrs) {
                var date = _this.parseToDateObj(dateStrs[0]);
                if (lastLogTime > 0) {
                    timeSinceLast = date.getTime() - lastLogTime;
                }
                lastLogTime = date.getTime();
            }
            var statusBlock = log.split("HTTP/1.1");
            var status = 400;
            if (statusBlock.length > 0) {
                try {
                    status = parseInt(log.split("HTTP/1.1")[1].slice(2, 5));
                }
                catch (e) {
                    console.log("Poorly parsed log");
                    console.log(log);
                }
            }
            return {
                timeSinceLast: timeSinceLast,
                status: status,
                ip: ip
            };
        });
    };
    Converter.prototype.parseToDateObj = function (dateStr) {
        dateStr = dateStr.replace("[", "").replace("]", "");
        var hours = dateStr.split(":")[1];
        var minutes = dateStr.split(":")[2];
        var seconds = dateStr.split(":")[3].slice(0, 2);
        return new Date(2010, 0, 1, parseInt(hours), parseInt(minutes), parseInt(seconds));
    };
    return Converter;
}());
exports.Converter = Converter;
