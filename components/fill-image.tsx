import Image from 'next/image'
import cn from 'classnames'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (loading) {
      const img = new window.Image()
      img.onload = () => {
        setLoaded(true)
      }
      img.src = src
    }
  }, [src])

  return (
    <Image
      src={loading ? blurSrc : src}
      alt={alt}
      width={width}
      height={height}
      sizes="100vw"
      priority={priority}
      className={cn(
        className,
        objectPosition === 'top' ? 'object-top' : 'object-center',
        'object-cover min-w-full',
      )}
      style={{ aspectRatio }}
    />
  )
}

export default FillImage
