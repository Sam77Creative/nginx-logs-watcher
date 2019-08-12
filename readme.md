# nginx-logs-watcher

This utility service monitors the nginx access.log file and looks for suspicious patterns and behaviors.

You can install nginx-logs-watcher globally by running the following command.

```sh
$npm install -g @77io/nginx-logs-watcher
```

## Setup

Be sure to set the following environment variables to configure the service correctly.

#### NODE_DEBUG

_boolean_
Set to `true` to run the service in debug mode.

#### LOG_FILE

_string_
Absolute path to the log file you want to monitor. `/var/log/nginx/access.log` is the defualt nginx access logs file path.

#### DEBOUNCE_SECONDS

_number_ `60` default
The number of seconds between log file changes to search for patterns. Keeping this value too low may cause performance issues. (I typically run this at 300).

#### SLACK_TOKEN

_string_
This service uses slack to notify admins on suspicious activity. This token can be obtained by creating a private app in Slack. Learn about building private apps here [here](https://api.slack.com/slack-apps).

#### SLACK_CHANNEL

_string_
The slack channel id to post the message to.

#### SERVER_NAME

_string_
Friendly string to identify the server. This will be shared along with the suspicious activity.

#### DETECTOR_SENSITIVITY

_number_ `20` default
This determines the sensitivity of the detection process. The number itself is arbitrary, but smaller numbers will pickup smaller patterns while larger numbers will need larger patterns to emit a problem.

## Example .env file

```txt
NODE_DEBUG=false
LOG_FILE=/var/logs/nginx/access.log
DEBOUNCE_SECONDS=300
SLACK_TOKEN=xoxb-YOUR-TOKEN-HERE
SERVER_NAME=DevelopmentServers
SLACK_CHANNEL=CHANNELID
DETECTOR_SENSITIVITY=20
```

## Running with systemd

Here is an example service file that will restart the log watcher on failure. It also sets up the environment variables. This example assumes a typically installation of NodeJS and nginx-logs-watcher installed globally.

```service
[Unit]
Description=NginxLogsWatcher

[Service]
ExecStart=/usr/bin/node /opt/nodejs/lib/node_modules/@77io/nginx-logs-watcher/bin/index.js
Restart=on-failure
Environment=NODE_DEBUG=false LOG_FILE=/var/log/nginx/access.log DEBOUNCE_SECONDS=100 SLACK_TOKEN=xoxb-YOUR-TOKEN-HERE SLACK_CHANNEL=SLACKCHANNELID SERVER_NAME=DevelopmentServer DETECTOR_SENSITIVITY=20

[Install]
WantedBy=multi-user.target
```
