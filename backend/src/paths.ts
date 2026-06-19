import path from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export const monorepoRoot = path.resolve(packageDir, '..')
export const envFilePath = path.join(monorepoRoot, '.env')
export const frontendDistDir = path.join(monorepoRoot, 'frontend/dist')
