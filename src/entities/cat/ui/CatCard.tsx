import { FaHeart, FaRegHeart } from 'react-icons/fa'

import '@/entities/cat/ui/CatCard.css'

interface CatCardProps {
  src: string
  alt?: string
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function CatCard({ src, alt = 'Котик', isFavorite, onToggleFavorite }: CatCardProps) {
  return (
    <article className="cat-card">
      <img className="cat-card__image" src={src} alt={alt} loading="lazy" />
      <div className="cat-card__overlay">
        <button
          className={`cat-card__heart${isFavorite ? ' cat-card__heart--active' : ''}`}
          type="button"
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          onClick={onToggleFavorite}
        >
          <FaRegHeart
            className="cat-card__heart-icon cat-card__heart-icon--outline"
            aria-hidden="true"
          />
          <FaHeart
            className="cat-card__heart-icon cat-card__heart-icon--filled"
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  )
}
