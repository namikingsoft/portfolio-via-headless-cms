import { RatingRange } from '../schemas/contentful/types'

type StarPosition = 1 | 2 | 3 | 4 | 5

const ratio = 2 // position to rating

export type StarType = 'none' | 'half' | 'full'

export const calcStarType = (
  position: StarPosition,
  rating: RatingRange,
): StarType => {
  const w = position * ratio
  if (w - rating <= 0) return 'full'
  else if (w - rating >= ratio || rating % ratio === 0) return 'none'
  else return 'half'
}
