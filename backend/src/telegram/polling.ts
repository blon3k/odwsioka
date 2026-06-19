import { addSubscriber, removeSubscriber } from './subscribers.js'
import {
  formatHelpMessage,
  formatStartMessage,
  formatStopMessage,
} from './messages.js'
import {
  deleteTelegramWebhook,
  getTelegramUpdates,
  isTelegramConfigured,
  sendTelegramMessage,
  TelegramPollingConflictError,
} from './client.js'

let polling = false
let conflictLogged = false

export function stopTelegramPolling() {
  polling = false
}

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
    try {
      await deleteTelegramWebhook()
    } catch (error) {
      console.warn('Telegram deleteWebhook failed:', error)
    }

    while (polling) {
      try {
        offset = await pollOnce(offset)
        conflictLogged = false
      } catch (error) {
        const isConflict = error instanceof TelegramPollingConflictError
        if (isConflict && !conflictLogged) {
          console.error('Telegram polling conflict:', error.message)
          conflictLogged = true
        } else if (!isConflict) {
          console.error('Telegram polling error:', error)
        }

        const delayMs = isConflict ? 15_000 : 5_000
        await new Promise((resolve) => setTimeout(resolve, delayMs))

        if (isConflict) {
          try {
            await deleteTelegramWebhook()
          } catch {
            // Retry on next loop iteration.
          }
        }
      }
    }
  }

  void loop()
}
