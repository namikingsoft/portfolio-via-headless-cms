import cn from 'classnames'
import Image from 'next/image'
import { useMemo } from 'react'
import { calcGravatarUrl } from '../lib/gravatar'

type Props = {
  className?: string
  email: string
  size?: number
  alt?: string
}

const Gravatar = ({ className, email, size = 320, alt = 'Avatar' }: Props) => {
  const src = useMemo(() => calcGravatarUrl(email, size), [email, size])
  return (
    <Image
      className={cn('rounded-full inline', className)}
      src={src}
      alt={alt}
      width={size}
      height={size}
    />
  )
}

export default Gravatar
