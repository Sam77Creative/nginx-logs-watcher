import { readFileSync } from "fs";
import { Converter, Detector, Notifier } from ".";

export class App {
  constructor(
    private converter: Converter,
    private detector: Detector,
    private notifier: Notifier,
    private debug: boolean
  ) {}

  public async searchLogFile(fileName: string) {
    // Get the log file
    const log = this.getLogFile(fileName);
    if (this.debug) {
      console.log("Read in log file");
    }

    // Parse the log file
    const data = await this.converter.parseLogFile(log, this.debug);
    if (this.debug) {
      console.log("Finished parsing logs");
      console.log(`There are ${data.length} log(s)`);
    }

    // Run detection system
    const problems = this.detector.of(log, data, this.debug);
    if (this.debug) {
      console.log("Finished detecting");
      console.log(`There are ${problems.length} problem(s)`);
    }

    // // Notify for each problem
    this.notifier.notifyOfProblem(problems, this.debug);
  }

  private getLogFile(fileName: string): string {
    // Get the buffer
    const buff = readFileSync(fileName);

    // Parse to a string and return
    return buff.toString();
  }
}
