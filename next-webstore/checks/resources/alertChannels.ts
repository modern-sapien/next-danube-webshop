import { EmailAlertChannel, SlackAlertChannel, WebhookAlertChannel } from 'checkly/constructs';

export const emailChannel = new EmailAlertChannel('email-channel-1', {
  address: 'alerts@acme.com',
});

export const slackChannel = new SlackAlertChannel('slack-channel-1', {
  url: new URL(`https://hooks.slack.com/services/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'`),
  channel: '#ops'
})

export const webhookChannel = new WebhookAlertChannel('webhook-channel-1', {
  name: 'Pushover webhook',
  method: 'POST',
  url: new URL('https://api.pushover.net/1/messages.json'),
  headers: [ { key: 'X-My-Header', value: 'myToken' }],
  template: `{
    "token":"FILL_IN_YOUR_SECRET_TOKEN_FROM_PUSHOVER",
    "user":"FILL_IN_YOUR_USER_FROM_PUSHOVER",
    "title":"{{ALERT_TITLE}}",
    "html":1,
    "priority":2,
    "retry":30,
    "expire":10800,
    "message":"{{ALERT_TYPE}} {{STARTED_AT}} ({{RESPONSE_TIME}}ms) {{RESULT_LINK}}"
  }`
})