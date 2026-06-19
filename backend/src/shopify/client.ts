import { config } from '../config.js'

type GraphqlResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

export async function adminGraphql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  if (!config.SHOPIFY_ADMIN_ACCESS_TOKEN) {
    throw new Error(
      'SHOPIFY_ADMIN_ACCESS_TOKEN is not set. Add an Admin API token (shpat_...) to use product search.',
    )
  }

  const response = await fetch(config.adminApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': config.SHOPIFY_ADMIN_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Shopify Admin API error (${response.status}): ${body}`)
  }

  const json = (await response.json()) as GraphqlResponse<T>

  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join('; '))
  }

  if (!json.data) {
    throw new Error('Shopify Admin API returned no data')
  }

  return json.data
}

export async function storefrontGraphql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(config.storefrontApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Shopify Storefront API error (${response.status}): ${body}`)
  }

  const json = (await response.json()) as GraphqlResponse<T>

  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join('; '))
  }

  if (!json.data) {
    throw new Error('Shopify Storefront API returned no data')
  }

  return json.data
}
