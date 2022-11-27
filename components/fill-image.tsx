import cn from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

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

  const loading = blurSrc && !loaded

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
          hidden: loading,
        })}
        style={{ aspectRatio }}
        onLoad={() => setLoaded(true)}
      />
      {loading && (
        // eslint-disable-next-line @next/next/no-img-element -- light image
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
