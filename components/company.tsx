import cn from 'classnames'
import { FaRegBuilding } from 'react-icons/fa'

type Props = {
  className?: string
  company: string
}

const Company = ({ className, company }: Props) => {
  return (
    <div className={cn('flex flex-row items-center', className)}>
      <FaRegBuilding className="mr-1" />
      <span>{company}</span>
    </div>
  )
}

export default Company
