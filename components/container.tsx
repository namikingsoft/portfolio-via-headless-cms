import { ReactNode } from 'react'
import cn from 'classnames'

type Props = {
  className?: string
  children?: ReactNode
}

const Container = ({ className, children }: Props) => {
  return (
    <div className={cn('container mx-auto px-5', className)}>{children}</div>
  )
}

export default Container
