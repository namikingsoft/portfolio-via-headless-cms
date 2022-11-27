import cn from 'classnames'
import { MdStar } from 'react-icons/md'
import { StarType } from '../lib/star'

type Props = {
  className?: string
  type: StarType
}

const Star = ({ className, type }: Props) => {
  switch (type) {
    case 'full':
      return <MdStar className={cn('inline', className)} />
    case 'half':
      return (
        <span className={cn('inline-block relative', className)}>
          <MdStar className="inline" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          <MdStar className="inline text-gray-300 absolute bottom-0 left-0 -z-10" />
        </span>
      )
    default:
      return <MdStar className={cn('inline text-gray-300', className)} />
  }
}

export default Star
