import type { Cat } from '@/entities/cat/types'
import { CatCard } from '@/entities/cat/ui/CatCard'
import '@/pages/cats/CatsPage.css'
import { useCatsInfiniteScroll } from '@/pages/cats/useCatsInfiniteScroll'
import { NavTabs } from '@/shared/ui/NavTabs'

const TABS = [
  { label: 'Все котики', active: true },
  { label: 'Любимые котики', active: false },
]

export function CatsPage() {
  const { cats, isLoading, error, sentinelRef } = useCatsInfiniteScroll()
  const hasCats = cats.length > 0

  return (
    <div className="cats-page">
      <NavTabs tabs={TABS} />
      <main className="cats-page__content">
        {error && !hasCats ? <p className="cats-page__status">{error}</p> : null}
        {hasCats ? (
          <section className="cats-page__grid" aria-label="Список котиков">
            {cats.map((cat: Cat) => (
              <CatCard key={cat.id} src={cat.url} />
            ))}
          </section>
        ) : null}
        <div ref={sentinelRef} className="cats-page__sentinel" aria-hidden="true" />
        {hasCats && isLoading ? (
          <p className="cats-page__status cats-page__status--loading">
            ... загружаем еще котиков ...
          </p>
        ) : null}
        {hasCats && error ? <p className="cats-page__status cats-page__status--loading">{error}</p> : null}
      </main>
    </div>
  )
}
