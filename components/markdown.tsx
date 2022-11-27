import cn from 'classnames'
import markdownStyles from './markdown.module.css'

type Props = {
  className?: string
  type: 'detail' | 'lite'
  children: string
}

const Markdown = ({ className, type, children }: Props) => {
  return (
    <div
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
}

export default Markdown
