import cn from 'classnames'
import FillImage from './fill-image'

interface BaseProps {
  src: string
  alt: string
  width: number
  height: number
}

interface ThumbnailProps extends BaseProps {
  type: 'thumbnail'
}

interface DetailProps extends BaseProps {
  type: 'detail'
  aspectRatio: number
}

type Props = ThumbnailProps | DetailProps

const CoverImage = ({ src, alt, width, height, type, ...aspect }: Props) => {
  const hasHoverStyle = type === 'thumbnail'
  return (
    <FillImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn({
        'shadow-medium': !hasHoverStyle,
        'shadow-small hover:shadow-medium transition-shadow duration-200':
          hasHoverStyle,
      })}
      {...aspect}
    />
  )
}

export default CoverImage
