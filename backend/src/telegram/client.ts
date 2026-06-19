import { config } from '../config.js'

const TELEGRAM_API = `https://api.telegram.org/bot${config.TELEGRAM_BOT_API}`

async function telegramRequest(method: string, body: Record<string, unknown>): Promise<Response> {
  return fetch(`${TELEGRAM_API}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function sendTelegramMessage(chatId: number, text: string): Promise<void> {
  const response = await telegramRequest('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram sendMessage failed (${response.status}): ${body}`)
  }
}

export async function sendTelegramRichMessage(chatId: number, html: string): Promise<void> {
  const response = await telegramRequest('sendRichMessage', {
    chat_id: chatId,
    rich_message: { html },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram sendRichMessage failed (${response.status}): ${body}`)
  }
}

export async function sendTelegramFormattedMessage(
  chatId: number,
  richHtml: string,
  fallbackHtml: string,
): Promise<void> {
  try {
    await sendTelegramRichMessage(chatId, richHtml)
  } catch (error) {
    console.warn(`Rich message failed for chat ${chatId}, falling back to sendMessage:`, error)
    await sendTelegramMessage(chatId, fallbackHtml)
  }
}

export async function deleteTelegramWebhook(): Promise<void> {
  const response = await telegramRequest('deleteWebhook', { drop_pending_updates: false })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram deleteWebhook failed (${response.status}): ${body}`)
  }
}

export class TelegramPollingConflictError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TelegramPollingConflictError'
  }
}

type TelegramUpdate = {
  update_id: number
  message?: {
    chat: { id: number }
    text?: string
  }
}

export async function getTelegramUpdates(offset: number): Promise<TelegramUpdate[]> {
  const url = new URL(`${TELEGRAM_API}/getUpdates`)
  url.searchParams.set('offset', String(offset))
  url.searchParams.set('timeout', '30')

  const response = await fetch(url)
  const body = await response.text()

  if (!response.ok) {
    if (response.status === 409) {
      throw new TelegramPollingConflictError(
        'Another bot instance is polling getUpdates. Stop other dev servers or production instances using this bot token.',
      )
    }
    throw new Error(`Telegram getUpdates failed (${response.status}): ${body}`)
  }

  const data = JSON.parse(body) as { ok: boolean; error_code?: number; result: TelegramUpdate[] }
  if (!data.ok) {
    if (data.error_code === 409) {
      throw new TelegramPollingConflictError(
        'Another bot instance is polling getUpdates. Stop other dev servers or production instances using this bot token.',
      )
    }
    throw new Error('Telegram getUpdates returned ok=false')
  }

  return data.result
}

export function isTelegramConfigured(): boolean {
  return Boolean(config.TELEGRAM_BOT_API)
}
