import Image from 'next/image'
import avatarImage from '../images/avatar.png'

type Props = {
  size?: number
  alt?: string
}

const MyAvatar = ({ size = 320, alt = 'Avatar' }: Props) => {
  return (
    <Image
      className="rounded-full inline"
      src={avatarImage}
      alt={alt}
      width={size}
      height={size}
    />
  )
}

export default MyAvatar
