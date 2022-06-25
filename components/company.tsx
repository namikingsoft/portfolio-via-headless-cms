import { FaRegBuilding } from 'react-icons/fa'

type Props = {
  company: string
}

const Company = ({ company }: Props) => {
  return (
    <div className="flex flex-row items-center">
      <FaRegBuilding className="mr-1" />
      <span>{company}</span>
    </div>
  )
}

export default Company
