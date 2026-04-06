import { FaHeart, FaRegHeart } from 'react-icons/fa'

import '@/entities/cat/ui/CatCard.css'

interface CatCardProps {
  src: string
  alt?: string
}

export function CatCard({ src, alt = 'Котик' }: CatCardProps) {
  return (
    <article className="cat-card">
      <img className="cat-card__image" src={src} alt={alt} loading="lazy" />
      <div className="cat-card__overlay">
        <button className="cat-card__heart" type="button" aria-label="Добавить в избранное">
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
