import { logger } from 'firebase-functions'
import { App } from '@slack/bolt'
import { NGROK_URL } from '~/utils/secret'

import fetch from 'node-fetch'

export const registerTestCommand = (app: App) => {
  app.command('/keyopen', async ({ ack, body, context }) => {
    await ack()

    const response = await fetch(NGROK_URL)
    const pageBody = await response.text()

    logger.log(pageBody)

    try {
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: body.channel_id,
        text: '解錠!'
      })
    } catch (err) {
      logger.log(err)
    }
  })
}
