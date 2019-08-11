import { AccessLog } from "../interfaces";
import { Problem } from "../interfaces/problem.interface";
export declare class Detector {
    private splitLogFile;
    constructor();
    of(logFile: string, logs: AccessLog[], debug?: boolean): Problem[];
    private createProblemObj;
}
