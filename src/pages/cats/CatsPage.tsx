import { useEffect, useState } from 'react'

import { fetchCats } from '@/entities/cat/api'
import type { Cat } from '@/entities/cat/types'
import { CatCard } from '@/entities/cat/ui/CatCard'
import '@/pages/cats/CatsPage.css'
import { NavTabs } from '@/shared/ui/NavTabs'

const TABS = [
  { label: 'Все котики', active: true },
  { label: 'Любимые котики', active: false },
]

export function CatsPage() {
  const [cats, setCats] = useState<Cat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadCats = async () => {
      try {
        const nextCats = await fetchCats()
        if (isMounted) setCats(nextCats)
      } catch {
        if (isMounted) setError('Не удалось загрузить котиков')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void loadCats()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="cats-page">
      <NavTabs tabs={TABS} />
      <main className="cats-page__content">
        {isLoading ? <p className="cats-page__status">Загрузка...</p> : null}
        {error ? <p className="cats-page__status">{error}</p> : null}
        {!isLoading && !error ? (
          <section className="cats-page__grid" aria-label="Список котиков">
            {cats.map((cat) => (
              <CatCard key={cat.id} src={cat.url} />
            ))}
          </section>
        ) : null}
      </main>
    </div>
  )
}
