import cn from 'classnames'
import Image from 'next/image'
import avatarImage from '../images/avatar.png'

type Props = {
  className?: string
  size?: number
  alt?: string
}

const MyAvatar = ({ className, size = 320, alt = 'Avatar' }: Props) => {
  return (
    <Image
      className={cn('rounded-full inline', className)}
      src={avatarImage}
      alt={alt}
      width={size}
      height={size}
    />
  )
}

export default MyAvatar
