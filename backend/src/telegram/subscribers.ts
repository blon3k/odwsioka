import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../data')
const subscribersFile = path.join(dataDir, 'telegram-subscribers.json')

async function readSubscribers(): Promise<Set<number>> {
  try {
    const raw = await readFile(subscribersFile, 'utf8')
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return new Set()

    return new Set(parsed.filter((id): id is number => typeof id === 'number'))
  } catch {
    return new Set()
  }
}

async function writeSubscribers(subscribers: Set<number>) {
  await mkdir(dataDir, { recursive: true })
  await writeFile(subscribersFile, JSON.stringify([...subscribers], null, 2))
}

export async function listSubscribers(): Promise<number[]> {
  return [...(await readSubscribers())]
}

export async function addSubscriber(chatId: number): Promise<boolean> {
  const subscribers = await readSubscribers()
  if (subscribers.has(chatId)) return false

  subscribers.add(chatId)
  await writeSubscribers(subscribers)
  return true
}

export async function removeSubscriber(chatId: number): Promise<boolean> {
  const subscribers = await readSubscribers()
  if (!subscribers.has(chatId)) return false

  subscribers.delete(chatId)
  await writeSubscribers(subscribers)
  return true
}
