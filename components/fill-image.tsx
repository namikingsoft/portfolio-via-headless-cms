import Image from 'next/image'
import cn from 'classnames'
import { useCallback, useState } from 'react'

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
  aspectRatio,
  objectPosition = 'top',
  priority,
  blurSrc,
  className,
}: Props) => {
  const [loaded, setLoaded] = useState(false)
  const onLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const baseClassName = cn(
    className,
    objectPosition === 'top' ? 'object-top' : 'object-center',
    'object-cover min-w-full',
  )

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        priority={priority}
        className={cn(baseClassName, {
          hidden: !loaded && blurSrc,
        })}
        style={{ aspectRatio }}
        onLoad={onLoad}
      />
      {blurSrc && !loaded && (
        // eslint-disable-next-line @next/next/no-img-element -- only blur image
        <img
          src={blurSrc}
          alt={alt}
          className={baseClassName}
          style={{ aspectRatio }}
        />
      )}
    </>
  )
}

export default FillImage
