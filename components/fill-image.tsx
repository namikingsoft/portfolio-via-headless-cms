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
      sizes="
        (max-width: 640px) 640px,
        (max-width: 800px) 800px,
        (max-width: 1024px) 1024px,
        (max-width: 1280px) 1280px,
        (max-width: 1440px) 1440px,
        (max-width: 1680px) 1680px,
        (max-width: 1920px) 1920px,
        (max-width: 2560px) 2560px,
        3840px
      "
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
