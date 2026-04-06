import { useEffect, useEffectEvent, useRef, useState } from 'react'

import { fetchCats } from '@/entities/cat/api'
import type { Cat } from '@/entities/cat/types'

const CATS_BATCH_SIZE = 15
const LOAD_MORE_DELAY_MS = 900

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export function useCatsInfiniteScroll() {
  const [cats, setCats] = useState<Cat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isFetching = useRef(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const loadMore = useEffectEvent(async () => {
    if (isFetching.current) return
    isFetching.current = true
    setIsLoading(true)
    setError(null)

    try {
      if (cats.length > 0) {
        await sleep(LOAD_MORE_DELAY_MS)
      }

      const next = await fetchCats(CATS_BATCH_SIZE)
      setCats((prev) => [...prev, ...next])
    } catch {
      setError('Не удалось загрузить котиков')
    } finally {
      setIsLoading(false)
      isFetching.current = false
    }
  })

  useEffect(() => {
    void loadMore()
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching.current) {
          void loadMore()
        }
      },
      { rootMargin: '200px' },
    )

    observerRef.current.observe(sentinel)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [cats.length])

  return { cats, isLoading, error, sentinelRef }
}
