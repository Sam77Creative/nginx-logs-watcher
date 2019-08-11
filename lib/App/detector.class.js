"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Detector = (function () {
    function Detector() {
    }
    Detector.prototype.of = function (logFile, logs, debug) {
        var _this = this;
        this.splitLogFile = logFile.split("\n");
        var problems = [];
        var susIter = 0;
        var num404s = 0;
        var ipPool = [];
        var reduceSuspicion = function () {
            susIter = susIter / 2;
            num404s = num404s / 2;
        };
        var computeSuspicion = function () {
            return susIter + num404s;
        };
        logs.forEach(function (log, index) {
            if (log.timeSinceLast <= 2 * 1000) {
                if (ipPool.includes(log.ip)) {
                    if (log.status === 404) {
                        num404s += 1;
                    }
                    susIter += 1;
                    if (computeSuspicion() >= _1.detectorSensitivity) {
                        var problem = _this.createProblemObj(log, index);
                        problems.push(problem);
                    }
                }
                else {
                    if (ipPool.length >= 5) {
                        ipPool.shift();
                    }
                    ipPool.push(log.ip);
                }
            }
            else {
                reduceSuspicion();
            }
        });
        return problems;
    };
    Detector.prototype.createProblemObj = function (log, index) {
        return {
            susIp: log.ip,
            prevLogs: this.splitLogFile.slice(index - 5, index).join("\n"),
            susLog: this.splitLogFile[index],
            nextLogs: this.splitLogFile.slice(index, index + 5).join("\n")
        };
    };
    return Detector;
}());
exports.Detector = Detector;
