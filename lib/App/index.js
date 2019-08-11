"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_class_1 = require("./app.class");
var converter_class_1 = require("./converter.class");
var detector_class_1 = require("./detector.class");
var notifier_class_1 = require("./notifier.class");
var debug = process.env.NODE_DEBUG && process.env.NODE_DEBUG !== "false" ? true : false;
exports.logFileName = process.env.LOG_FILE;
if (!exports.logFileName) {
    throw new Error("Log file not defined, please define 'LOG_FILE' as an environment variable");
}
exports.debounceString = process.env.DEBOUNCE_SECONDS;
if (!exports.debounceString) {
    console.log("No debounce time found, defaulting to 60 seconds");
    exports.debounceTime = 60;
}
else {
    try {
        exports.debounceTime = parseInt(exports.debounceString);
    }
    catch (e) {
        console.log("Please specifiy DEBOUNCE_SECONDS as a number of seconds");
        console.log(e);
    }
}
exports.slackToken = process.env.SLACK_TOKEN;
if (!exports.slackToken) {
    throw new Error("SLACK_TOKEN environment variable required");
}
exports.slackChannel = process.env.SLACK_CHANNEL;
if (!exports.slackChannel) {
    throw new Error("SLACK_CHANNEL environment variable required");
}
exports.serverName = process.env.SERVER_NAME;
if (!exports.serverName) {
    throw new Error("SERVER_NAME environment variable required");
}
var detectorSensitivityString = process.env.DETECTOR_SENSITIVITY;
if (!detectorSensitivityString) {
    console.log("No DETECTOR_SENSITIVITY value found, defaulting to 20");
    exports.detectorSensitivity = 20;
}
else {
    try {
        exports.detectorSensitivity = parseInt(detectorSensitivityString);
    }
    catch (e) {
        console.log("DETECTOR_SENSITIVITY needs to be of type int");
        console.log(e);
    }
}
var converter_class_2 = require("./converter.class");
exports.Converter = converter_class_2.Converter;
var detector_class_2 = require("./detector.class");
exports.Detector = detector_class_2.Detector;
var notifier_class_2 = require("./notifier.class");
exports.Notifier = notifier_class_2.Notifier;
var converter = new converter_class_1.Converter();
var detector = new detector_class_1.Detector();
var notifier = new notifier_class_1.Notifier();
exports.app = new app_class_1.App(converter, detector, notifier, debug);
