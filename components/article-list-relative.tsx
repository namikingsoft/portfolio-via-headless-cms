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

const ArticleListRelative = ({ articles }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-y-24">
      {articles.map((article) => (
        <section key={article.slug}>
          <Link
            key={article.slug}
            className="group cursor-pointer"
            href={pagesPath.private.articles._slug(article.slug).$url()}
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-auto">
                <h3 className="text-2xl mb-4 group-hover:underline">
                  {article.title}
                </h3>
                <p className="col-span-2 leading-7 text-gray-700">
                  {article.excerpt}
                </p>
              </div>
              <div className="flex-none sm:w-40">
                <Link
                  className="group-hover"
                  href={pagesPath.private.articles._slug(article.slug).$url()}
                >
                  <FillImage
                    className="shadow-small group-hover:shadow-medium transition-shadow duration-200"
                    src={article.image.url}
                    alt={article.image.alt}
                    width={article.image.width}
                    height={article.image.height}
                    aspectRatio={16 / 9}
                  />
                </Link>
              </div>
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm mt-5">
            <div>
              <Company company={article.company} />
            </div>
            <div>
              <DateRange
                date={article.date}
                dateEnd={article.dateEnd}
                isContinue={article.dateIsContinue}
              />
            </div>
            <div className="col-span-2">
              <TagList article={article} />
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default ArticleListRelative
