import Markdown from './markdown'

type Props = {
  title: string
  description: string
}

const TitleDescription = ({ title, description }: Props) => {
  return (
    <>
      <h2 className="text-center text-4xl font-bold mb-7 text-accent-600 drop-shadow-sm">
        {title}
      </h2>
      <div className="text-center mb-28 leading-7">
        <Markdown type="lite">{description}</Markdown>
      </div>
    </>
  )
}

export default TitleDescription
