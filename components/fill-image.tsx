import Image from 'next/image'
import cn from 'classnames'

type Props = {
  src: string
  alt: string
  aspectRatio?: number
  objectPosition?: 'top' | 'center'
  className?: string
}

const FillImage = ({
  src,
  alt,
  aspectRatio,
  objectPosition = 'top',
  className,
}: Props) => {
  return (
    <div
      className={cn({ 'aspect-video': !aspectRatio }, className, 'relative')}
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        objectPosition={objectPosition}
      />
    </div>
  )
}

export default FillImage
