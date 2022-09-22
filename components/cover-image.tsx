import cn from 'classnames'

type Props = {
  src: string
  alt: string
  hasHoverStyle?: boolean
  fixedAspectRatio?: boolean
}

const CoverImage = ({ src, alt, hasHoverStyle, fixedAspectRatio }: Props) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn({
        'shadow-medium': !hasHoverStyle,
        'shadow-small hover:shadow-medium transition-shadow duration-200':
          hasHoverStyle,
        'object-cover object-top aspect-video': fixedAspectRatio,
      })}
    />
  )
}

export default CoverImage
