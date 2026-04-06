import { useEffect, useState } from 'react'

import { fetchCats } from '@/entities/cat/api'
import type { Cat } from '@/entities/cat/types'
import '@/pages/cats/CatsPage.css'

export function CatsPage() {
  const [cats, setCats] = useState<Cat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadCats = async () => {
      try {
        const nextCats = await fetchCats()

        if (isMounted) {
          setCats(nextCats)
        }
      } catch {
        if (isMounted) {
          setError('Не удалось загрузить котиков')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadCats()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="cats-page">
      <div className="cats-page__content">
        <header className="cats-page__header">
          <h1 className="cats-page__title">Котики</h1>
        </header>

        {isLoading ? <p className="cats-page__status">Загрузка...</p> : null}
        {error ? <p className="cats-page__status">{error}</p> : null}

        {!isLoading && !error ? (
          <section className="cats-page__grid" aria-label="Список котиков">
            {cats.map((cat) => (
              <article key={cat.id} className="cats-page__card">
                <img className="cats-page__image" src={cat.url} alt="Котик" loading="lazy" />
              </article>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  )
}
