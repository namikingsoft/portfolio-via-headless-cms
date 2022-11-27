import { ReactNode } from 'react'
import cn from 'classnames'

type Props = {
  className?: string
  narrow?: boolean
  children?: ReactNode
}

const Container = ({ className, narrow, children }: Props) => {
  return (
    <div
      className={cn(
        'container mx-auto px-6 lg:px-8 xl:px-10',
        {
          'max-w-2xl': narrow,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Container
