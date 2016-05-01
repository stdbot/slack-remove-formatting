# Remove [Slack][slack] message [formatting][formatting] [![npm version](http://img.shields.io/npm/v/slack-remove-formatting.svg?style=flat-square)](https://www.npmjs.org/package/slack-remove-formatting)

[slack]: https://slack.com/
[formatting]: https://api.slack.com/docs/formatting

Library version of [this code][code].

[code]: https://github.com/slackhq/hubot-slack/blob/596c4181ccb9f8423c15077e3df2e960cd9981eb/src/slack.coffee#L174-L213

## Usage

```js
const slack = require('@slack/client')
const makeRemoveFormatting = require('slack-remove-formatting')

const rtm = new slack.RtmClient(config.token)

rtm.on(slack.CLIENT_EVENTS.RTM.AUTHENTICATED, state => {
  const removeFormatting = makeRemoveFormatting(state)

  rtm.on(slack.RTM_EVENTS.MESSAGE, message => {
    const text = removeFormatting(message.text)
    console.log(text)
  })
})
```
