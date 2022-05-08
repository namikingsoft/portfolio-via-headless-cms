import cn from 'classnames'

type Props = {
  src: string
  alt: string
  hasHoverStyle?: boolean
}

const CoverImage = ({ src, alt, hasHoverStyle }: Props) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': hasHoverStyle,
      })}
    />
  )
}

export default CoverImage
