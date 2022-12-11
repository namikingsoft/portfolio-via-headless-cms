import cn from 'classnames'
import { forwardRef } from 'react'
import markdownStyles from './markdown.module.css'

type Props = {
  className?: string
  type: 'detail' | 'lite'
  children: string
}

const Markdown = forwardRef<HTMLDivElement, Props>(
  ({ className, type, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          markdownStyles.base,
          {
            [markdownStyles.detail]: type === 'detail',
            [markdownStyles.lite]: type === 'lite',
          },
          className,
        )}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    )
  },
)

Markdown.displayName = 'Markdown'

export default Markdown
