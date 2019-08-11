import { Problem } from "../interfaces/problem.interface";
export declare class Notifier {
    private slack;
    constructor();
    notifyOfProblem(problems: Problem[], debug?: boolean): Promise<void>;
    private condenseProblems;
    private convertToSlackMessage;
    private postSlackMessage;
    private init;
}
