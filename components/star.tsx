import { MdStar } from 'react-icons/md'
import { StarType } from '../lib/star'

type Props = {
  type: StarType
}

const Star = ({ type }: Props) => {
  switch (type) {
    case 'full':
      return <MdStar className="inline" />
    case 'half':
      return (
        <span className="inline-block relative">
          <MdStar className="inline" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          <MdStar className="inline text-gray-300 absolute bottom-0 left-0 -z-10" />
        </span>
      )
    default:
      return <MdStar className="inline text-gray-300" />
  }
}

export default Star
