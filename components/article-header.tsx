import DateFormatter from './date-formatter'

type Props = {
  title: string
  coverImage: string
  date: string
  tags: string[]
}

const ArticleHeader = ({ title, coverImage, date, tags }: Props) => {
  return (
    <>
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {title}
      </h1>
      <div className="hidden md:block md:mb-12">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <img src={coverImage} alt={title} className="shadow-small" />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}

export default ArticleHeader
