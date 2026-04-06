import type { Cat } from './types'

type CatApiResponse = {
  id: string
  url: string
}

export async function fetchCats() {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')

  if (!response.ok) {
    throw new Error('Failed to fetch cats')
  }

  const data = (await response.json()) as CatApiResponse[]

  return data.map<Cat>(({ id, url }) => ({ id, url }))
}
