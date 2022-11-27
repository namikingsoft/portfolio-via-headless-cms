import cn from 'classnames'
import { ReactNode } from 'react'

type Props = {
  className?: string
  children: ReactNode
}

const Block = ({ className, children }: Props) => {
  return <div className={cn('first:mt-0 my-44', className)}>{children}</div>
}

export default Block
