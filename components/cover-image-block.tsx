import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const CoverImageBlock = ({ children }: Props) => {
  return <div className="mb-32">{children}</div>
}

export default CoverImageBlock
