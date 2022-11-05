import cn from 'classnames'
import markdownStyles from './markdown.module.css'

type Props = {
  type: 'detail' | 'lite'
  children: string
}

const Markdown = ({ type, children }: Props) => {
  return (
    <div
      className={cn(markdownStyles.base, {
        [markdownStyles.detail]: type === 'detail',
        [markdownStyles.lite]: type === 'lite',
      })}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}

export default Markdown
