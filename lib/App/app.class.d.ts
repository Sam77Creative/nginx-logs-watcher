import { Converter, Detector, Notifier } from ".";
export declare class App {
    private converter;
    private detector;
    private notifier;
    private debug;
    constructor(converter: Converter, detector: Detector, notifier: Notifier, debug: boolean);
    searchLogFile(fileName: string): Promise<void>;
    private getLogFile;
}
