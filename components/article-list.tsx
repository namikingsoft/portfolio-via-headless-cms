import Link from 'next/link'
import FillImage from './fill-image'
import DateRange from './date-range'
import Company from './company'
import { Article } from '../schemas/contentful/types'
import { pagesPath } from '../lib/$path'
import TagList from './tag-list'

type Props = {
  articles: Article[]
}

const ArticleList = ({ articles }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32">
      {articles.map((article) => (
        <section key={article.slug}>
          <Link
            className="group cursor-pointer"
            href={pagesPath.private.articles._slug(article.slug).$url()}
          >
            <FillImage
              className="mb-6 shadow-small group-hover:shadow-medium transition-shadow duration-200"
              src={article.image.url}
              alt={article.image.alt}
              width={article.image.width}
              height={article.image.height}
              aspectRatio={16 / 9}
            />
            <h3 className="group-hover:underline text-2xl xl:text-3xl mb-4 leading-snug">
              {article.title}
            </h3>
          </Link>
          <p className="leading-7 mb-4 text-gray-700">{article.excerpt}</p>
          <div className="text-sm mb-1">
            <Company company={article.company} />
          </div>
          <div className="text-sm mb-4">
            <DateRange
              date={article.date}
              dateEnd={article.dateEnd}
              isContinue={article.dateIsContinue}
            />
          </div>
          <div className="text-sm mb-4">
            <TagList article={article} />
          </div>
        </section>
      ))}
    </div>
  )
}

export default ArticleList
