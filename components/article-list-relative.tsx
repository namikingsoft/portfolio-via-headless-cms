import Link from 'next/link'
import CoverImage from './cover-image'
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
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-auto">
              <h3 className="text-2xl mb-4">
                <Link
                  href={pagesPath.private.articles._slug(article.slug).$url()}
                >
                  <a className="hover:underline">{article.title}</a>
                </Link>
              </h3>
              <p className="col-span-2 leading-7 text-gray-700">
                {article.excerpt}
              </p>
            </div>
            <div className="flex-none sm:w-40">
              <Link
                href={pagesPath.private.articles._slug(article.slug).$url()}
              >
                <a className="hover">
                  <CoverImage
                    src={article.image.url}
                    alt={article.image.alt}
                    hasHoverStyle
                  />
                </a>
              </Link>
            </div>
          </div>
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