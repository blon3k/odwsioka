import { sendTelegramFormattedMessage } from './client.js'
import type { FormattedTelegramMessage } from './messages.js'
import { listSubscribers } from './subscribers.js'

export async function notifySubscribers(message: FormattedTelegramMessage): Promise<void> {
  const subscribers = await listSubscribers()
  if (subscribers.length === 0) return

  await Promise.allSettled(
    subscribers.map(async (chatId) => {
      try {
        await sendTelegramFormattedMessage(chatId, message.rich, message.plain)
      } catch (error) {
        console.error(`Telegram notification failed for chat ${chatId}:`, error)
      }
    }),
  )
}
