import { watch } from "fs";
import { app, debounceTime, logFileName } from "./App";

function main() {
  console.log(`Started watching file ${logFileName}`);

  // Setup the debounce
  let debounce: false | NodeJS.Timeout = false;
  // Start watching the file
  watch(logFileName, (event: string, fileName: string | undefined) => {
    if (fileName) {
      // Debounce
      if (debounce) return;
      debounce = setTimeout(() => {
        debounce = false;
      }, debounceTime * 1000);
      // Fire App
      app.searchLogFile(logFileName);
    }
  });
}

function test() {
  app.searchLogFile(logFileName);
}

main();
