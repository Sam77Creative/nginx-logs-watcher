import { WebClient } from "@slack/web-api";
import { serverName, slackChannel, slackToken } from ".";
import { Problem } from "../interfaces/problem.interface";

export class Notifier {
  private slack: WebClient;

  constructor() {
    this.init();
  }

  public async notifyOfProblem(
    problems: Problem[],
    debug?: boolean
  ): Promise<void> {
    // Condense the problems
    problems = this.condenseProblems(problems);
    if (debug) {
      console.log(`Condensed to ${problems.length} problem(s).`);
    }

    // Loop through the problems
    for (let i = 0; i < problems.length; i++) {
      const problem = problems[i];

      // Convert the problem then post
      const message = this.convertToSlackMessage(problem);

      // Post it to slack
      await this.postSlackMessage(message);
    }
  }

  private condenseProblems(problems: Problem[]): Problem[] {
    const out: Problem[] = [];

    problems.forEach((problem: Problem) => {
      const filteredProblems = problems.filter(p => p.susIp === problem.susIp)
        .length;
      if (filteredProblems > 2 && !out.find(p => p.susIp === problem.susIp)) {
        out.push(problem);
      } else if (filteredProblems === 1) {
        out.push(problem);
      }
    });

    return out;
  }

  private convertToSlackMessage(problem: Problem): any {
    return {
      text: `I have detected a problem on server: ${serverName}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: `I have detected a problem on this server: ${serverName}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${problem.prevLogs}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${problem.susLog}*`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${problem.nextLogs}`
          }
        }
      ]
    };
  }

  private async postSlackMessage(
    message: any,
    channelId: string = slackChannel
  ): Promise<void> {
    await this.slack.chat.postMessage({
      channel: channelId,
      ...message
    });
  }

  private init() {
    this.slack = new WebClient(slackToken);
  }
}
