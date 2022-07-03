import { ReactNode } from 'react'
import cn from 'classnames'

type Props = {
  narrow?: boolean
  children?: ReactNode
}

const Container = ({ narrow, children }: Props) => {
  return (
    <div
      className={cn('container mx-auto px-6', {
        'max-w-2xl': narrow,
      })}
    >
      {children}
    </div>
  )
}

export default Container
