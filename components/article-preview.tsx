import classnames from 'classnames'
import DateFormatter from './date-formatter'
import Link from 'next/link'

type Props = {
  title: string
  thumbnail: string
  date: string
  excerpt: string
  slug: string
}

const ArticlePreview = ({ title, thumbnail, date, excerpt, slug }: Props) => {
  return (
    <div>
      <div className="mb-5">
        <div className="sm:mx-0">
          <Link as={`/articles/${slug}`} href="/articles/[slug]">
            <img
              src={thumbnail}
              alt={title}
              className={classnames('shadow-small', {
                'hover:shadow-medium transition-shadow duration-200': slug,
              })}
            />
          </Link>
        </div>
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/articles/${slug}`} href="/articles/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
}

export default ArticlePreview
