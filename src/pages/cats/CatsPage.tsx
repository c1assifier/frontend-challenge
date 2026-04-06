import { useState } from 'react'

import { useFavorites } from '@/entities/cat/lib/useFavorites'
import type { Cat } from '@/entities/cat/types'
import { CatCard } from '@/entities/cat/ui/CatCard'
import '@/pages/cats/CatsPage.css'
import { useCatsInfiniteScroll } from '@/pages/cats/useCatsInfiniteScroll'
import { NavTabs } from '@/shared/ui/NavTabs'

const TAB_ALL = 'Все котики'
const TAB_FAVORITES = 'Любимые котики'

export function CatsPage() {
  const [activeTab, setActiveTab] = useState<string>(TAB_ALL)
  const { cats, isLoading, error, sentinelRef } = useCatsInfiniteScroll()
  const { favorites, toggleFavorite } = useFavorites()

  const isAllTab = activeTab === TAB_ALL
  const displayedCats: Cat[] = isAllTab ? cats : cats.filter((c) => favorites.has(c.id))

  const tabs = [
    { label: TAB_ALL, active: isAllTab },
    { label: TAB_FAVORITES, active: !isAllTab },
  ]

  return (
    <div className="cats-page">
      <NavTabs tabs={tabs} onTabChange={setActiveTab} />
      <main className="cats-page__content">
        {error && cats.length === 0 ? <p className="cats-page__status">{error}</p> : null}
        {displayedCats.length > 0 ? (
          <section className="cats-page__grid" aria-label="Список котиков">
            {displayedCats.map((cat) => (
              <CatCard
                key={cat.id}
                src={cat.url}
                isFavorite={favorites.has(cat.id)}
                onToggleFavorite={() => toggleFavorite(cat.id)}
              />
            ))}
          </section>
        ) : null}
        {isAllTab ? (
          <>
            <div ref={sentinelRef} className="cats-page__sentinel" aria-hidden="true" />
            {isLoading ? (
              <p className="cats-page__status cats-page__status--loading">
                ... загружаем еще котиков ...
              </p>
            ) : null}
          </>
        ) : null}
        {!isAllTab && displayedCats.length === 0 ? (
          <p className="cats-page__status">Нет избранных котиков</p>
        ) : null}
      </main>
    </div>
  )
}
