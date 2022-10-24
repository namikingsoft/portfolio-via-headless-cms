import markdownStyles from './markdown.module.css'

type Props = {
  content: string
}

const Markdown = ({ content }: Props) => {
  return (
    <div
      className={markdownStyles.markdown}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default Markdown
