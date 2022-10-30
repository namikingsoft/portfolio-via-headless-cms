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
        className,
        `object-cover ${
          objectPosition === 'top' ? 'object-top' : 'object-center'
        }`,
        { 'aspect-video': !aspectRatio },
      )}
      style={{ aspectRatio }}
    />
  )
}

export default FillImage
