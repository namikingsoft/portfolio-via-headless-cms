import Image from 'next/image'
import cn from 'classnames'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  aspectRatio?: number
  objectPosition?: 'top' | 'center'
  className?: string
}

const FillImage = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  objectPosition = 'top',
  className,
}: Props) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        'object-cover min-w-full',
        { 'aspect-video': !aspectRatio },
        objectPosition === 'top' ? 'object-top' : 'object-center',
        className,
      )}
      style={{ aspectRatio }}
    />
  )
}

export default FillImage
