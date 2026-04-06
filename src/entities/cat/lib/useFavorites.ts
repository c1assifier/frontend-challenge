import { useEffect, useState } from 'react'

const STORAGE_KEY = 'favorites'

function readFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as unknown) : []
    return new Set(Array.isArray(parsed) ? (parsed as string[]) : [])
  } catch {
    return new Set()
  }
}

function writeToStorage(favorites: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(readFromStorage)

  useEffect(() => {
    writeToStorage(favorites)
  }, [favorites])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return { favorites, toggleFavorite }
}
