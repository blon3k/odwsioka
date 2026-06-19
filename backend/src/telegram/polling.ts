import { addSubscriber, removeSubscriber } from './subscribers.js'
import {
  formatHelpMessage,
  formatStartMessage,
  formatStopMessage,
} from './messages.js'
import { getTelegramUpdates, isTelegramConfigured, sendTelegramMessage } from './client.js'

let polling = false

async function handleMessage(chatId: number, text: string) {
  const command = text.trim().split(/\s+/)[0]?.toLowerCase()

  if (command === '/start') {
    const added = await addSubscriber(chatId)
    await sendTelegramMessage(chatId, formatStartMessage(added))
    return
  }

  if (command === '/stop') {
    const removed = await removeSubscriber(chatId)
    await sendTelegramMessage(chatId, formatStopMessage(removed))
    return
  }

  await sendTelegramMessage(chatId, formatHelpMessage())
}

async function pollOnce(offset: number): Promise<number> {
  const updates = await getTelegramUpdates(offset)
  let nextOffset = offset

  for (const update of updates) {
    nextOffset = update.update_id + 1

    const message = update.message
    if (!message?.text) continue

    try {
      await handleMessage(message.chat.id, message.text)
    } catch (error) {
      console.error('Telegram message handler failed:', error)
    }
  }

  return nextOffset
}

export function startTelegramPolling() {
  if (!isTelegramConfigured() || polling) return

  polling = true
  let offset = 0

  const loop = async () => {
    while (polling) {
      try {
        offset = await pollOnce(offset)
      } catch (error) {
        console.error('Telegram polling error:', error)
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }
    }
  }

  void loop()
}
