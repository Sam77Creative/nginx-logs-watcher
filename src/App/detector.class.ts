import { detectorSensitivity } from ".";
import { AccessLog } from "../interfaces";
import { Problem } from "../interfaces/problem.interface";

export class Detector {
  private splitLogFile: string[];

  constructor() {}

  public of(logFile: string, logs: AccessLog[], debug?: boolean): Problem[] {
    // Set split log file
    this.splitLogFile = logFile.split("\n");

    // Create problems array
    const problems: Problem[] = [];

    // Setup detection vars
    let susIter = 0;
    let num404s = 0;
    const ipPool: string[] = [];

    // Stateful helpers
    const reduceSuspicion = () => {
      // Have both susIter and num404s
      susIter = susIter / 2;
      num404s = num404s / 2;
    };

    const computeSuspicion = () => {
      return susIter + num404s;
    };

    logs.forEach((log: AccessLog, index: number) => {
      // If the log occured within the last two seconds
      if (log.timeSinceLast <= 2 * 1000) {
        // Is the ip in the current ip pool
        if (
          ipPool.includes(log.ip) ||
          log.status === 404 ||
          log.status === 401
        ) {
          // Increment detection vars
          if (log.status === 404) {
            num404s += 1;
          }
          susIter += 1;

          // Detect
          if (computeSuspicion() >= detectorSensitivity) {
            const problem = this.createProblemObj(log, index);
            problems.push(problem);
          }
        } else {
          // Hold onto last 5 ips
          if (ipPool.length >= 5) {
            ipPool.shift();
          }
          ipPool.push(log.ip);
        }
      } else {
        reduceSuspicion();
      }
    });

    return problems;
  }

  private createProblemObj(log: AccessLog, index: number): Problem {
    return {
      susIp: log.ip,
      prevLogs: this.splitLogFile.slice(index - 5, index).join("\n"),
      susLog: this.splitLogFile[index],
      nextLogs: this.splitLogFile.slice(index, index + 5).join("\n")
    };
  }
}
