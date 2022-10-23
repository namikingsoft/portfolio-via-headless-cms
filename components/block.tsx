import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Block = ({ children }: Props) => {
  return <div className="first:mt-0 my-24">{children}</div>
}

export default Block
