import type { Cat } from './types'

type CatApiResponse = {
  id: string
  url: string
}

export async function fetchCats(limit = 15) {
  const apiKey = import.meta.env.VITE_CAT_API_KEY
  const headers = apiKey ? { 'x-api-key': apiKey } : undefined

  const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`, {
    headers,
  })

  if (!response.ok) {
    throw new Error('Failed to fetch cats')
  }

  const data = (await response.json()) as CatApiResponse[]

  return data.map<Cat>(({ id, url }) => ({ id, url }))
}
