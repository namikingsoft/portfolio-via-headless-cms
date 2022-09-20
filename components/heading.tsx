import cn from 'classnames'
import { ReactNode } from 'react'

type Props = {
  as: 'h1' | 'h2' | 'h3'
  children: ReactNode
}

const Heading = ({ as: Component, children }: Props) => {
  return (
    <Component
      className={cn({
        'text-6xl md:text-7xl font-bold tracking-tighter leading-tight':
          Component === 'h1',
        'mb-8 text-6xl md:text-6xl font-bold tracking-tighter leading-tight':
          Component === 'h2',
        'text-3xl mb-4 leading-snug': Component === 'h3',
      })}
    >
      {children}
    </Component>
  )
}

export default Heading
