import Image from 'next/image'
import cn from 'classnames'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  aspectRatio?: number
  objectPosition?: 'top' | 'center'
  priority?: boolean
  blurSrc?: string
  className?: string
}

const FillImage = ({
  src,
  alt,
  width,
  height,
  aspectRatio = 16 / 9,
  objectPosition = 'top',
  priority,
  blurSrc,
  className,
}: Props) => {
  const imageElement = (
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
      priority={priority}
      className={cn(
        !blurSrc ? className : undefined,
        objectPosition === 'top' ? 'object-top' : 'object-center',
        'object-cover min-w-full min-h-full',
      )}
      style={{ aspectRatio }}
    />
  )

  return blurSrc ? (
    <div
      className={cn(blurSrc ? className : undefined, 'bg-cover')}
      style={{ backgroundImage: `url(${blurSrc})` }}
    >
      {imageElement}
    </div>
  ) : (
    imageElement
  )
}

export default FillImage
