"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var App_1 = require("./App");
function main() {
    console.log("Started watching file " + App_1.logFileName);
    var debounce = false;
    fs_1.watch(App_1.logFileName, function (event, fileName) {
        if (fileName) {
            if (debounce)
                return;
            debounce = setTimeout(function () {
                debounce = false;
            }, App_1.debounceTime * 1000);
            App_1.app.searchLogFile(App_1.logFileName);
        }
    });
}
exports.default = main;
function test() {
    App_1.app.searchLogFile(App_1.logFileName);
}
