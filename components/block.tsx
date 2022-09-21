import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Block = ({ children }: Props) => {
  return <div className="mb-24">{children}</div>
}

export default Block
