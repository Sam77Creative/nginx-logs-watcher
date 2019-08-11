import { AccessLog } from "../interfaces";
export declare class Converter {
    constructor();
    parseLogFile(logs: string, debug?: boolean): AccessLog[];
    private parseToDateObj;
}
