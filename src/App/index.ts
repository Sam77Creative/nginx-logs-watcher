import { App } from "./app.class";
import { Converter } from "./converter.class";
import { Detector } from "./detector.class";
import { Notifier } from "./notifier.class";

// Build environment variables
const debug =
  process.env.NODE_DEBUG && process.env.NODE_DEBUG !== "false" ? true : false;

// Get the log file name
export const logFileName = process.env.LOG_FILE as string;
if (!logFileName) {
  throw new Error(
    "Log file not defined, please define 'LOG_FILE' as an environment variable"
  );
}

// Get the debounce time
export let debounceString = process.env.DEBOUNCE_SECONDS;
export let debounceTime: number;
if (!debounceString) {
  console.log(`No debounce time found, defaulting to 60 seconds`);
  debounceTime = 60;
} else {
  try {
    debounceTime = parseInt(debounceString);
  } catch (e) {
    console.log(`Please specifiy DEBOUNCE_SECONDS as a number of seconds`);
    console.log(e);
  }
}

// Slack token
export const slackToken = process.env.SLACK_TOKEN as string;
if (!slackToken) {
  throw new Error("SLACK_TOKEN environment variable required");
}

// Slack channel
export const slackChannel = process.env.SLACK_CHANNEL as string;
if (!slackChannel) {
  throw new Error("SLACK_CHANNEL environment variable required");
}

// Server name
export const serverName = process.env.SERVER_NAME as string;
if (!serverName) {
  throw new Error("SERVER_NAME environment variable required");
}

// Detector sensitivity
const detectorSensitivityString = process.env.DETECTOR_SENSITIVITY as string;
export let detectorSensitivity: number;
if (!detectorSensitivityString) {
  console.log(`No DETECTOR_SENSITIVITY value found, defaulting to 20`);
  detectorSensitivity = 20;
} else {
  try {
    detectorSensitivity = parseInt(detectorSensitivityString);
  } catch (e) {
    console.log(`DETECTOR_SENSITIVITY needs to be of type int`);
    console.log(e);
  }
}

// Export dependencies
export { Converter } from "./converter.class";
export { Detector } from "./detector.class";
export { Notifier } from "./notifier.class";

// Build direct dependencies
const converter = new Converter();
const detector = new Detector();
const notifier = new Notifier();

// Build the app
export const app = new App(converter, detector, notifier, debug);
