import cn from 'classnames'
import { ReactNode } from 'react'

type Props = {
  className?: string
  as: 'h1' | 'h2' | 'h3'
  children: ReactNode
}

const Heading = ({ className, as: Component, children }: Props) => {
  return (
    <Component
      className={cn(
        {
          'text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-10':
            Component === 'h1',
          'mb-10 text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-tight':
            Component === 'h2',
          'text-2xl xl:text-3xl mb-4 leading-snug': Component === 'h3',
        },
        className,
      )}
    >
      {children}
    </Component>
  )
}

export default Heading
