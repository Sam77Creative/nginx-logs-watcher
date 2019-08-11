import { AccessLog } from "../interfaces";

export class Converter {
  constructor() {}

  public parseLogFile(logs: string, debug?: boolean): AccessLog[] {
    // Setup defaults
    let lastLogTime = 0;

    // Return the array
    return logs.split("\n").map((log: string) => {
      // Get the ip
      const ip = log.split(" - - ")[0];

      // Get the time since last
      const dateStrs = log.match(/\[([a-zA-Z0-9\/: +]+)\]/g);
      let timeSinceLast = 0;
      if (dateStrs) {
        // Get the date
        let date = this.parseToDateObj(dateStrs[0]);

        // Parse timeSinceLast
        if (lastLogTime > 0) {
          timeSinceLast = date.getTime() - lastLogTime;
        }
        lastLogTime = date.getTime();
      }

      // Get the status
      const statusBlock = log.split("HTTP/1.1");
      let status = 400;
      if (statusBlock.length > 0) {
        try {
          status = parseInt(log.split("HTTP/1.1")[1].slice(2, 5));
        } catch (e) {
          // Poorly parse log
          console.log("Poorly parsed log");
          console.log(log);
        }
      }

      // For Syntax
      return {
        timeSinceLast: timeSinceLast,
        status: status,
        ip: ip
      };
    });
  }

  private parseToDateObj(dateStr: string): Date {
    // [05/Aug/2019:18:35:30 +0000]
    // Remove the open and close brackets
    dateStr = dateStr.replace("[", "").replace("]", "");

    // Get the time values
    const hours = dateStr.split(":")[1];
    const minutes = dateStr.split(":")[2];
    const seconds = dateStr.split(":")[3].slice(0, 2);

    return new Date(
      2010,
      0,
      1,
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds)
    );
  }
}
