import Link from 'next/link'
import CoverImage from './cover-image'
import DateRange from './date-range'
import Company from './company'
import { Article } from '../schemas/contentful/types'
import { pagesPath } from '../lib/$path'
import TagList from './tag-list'
import Heading from './heading'

type Props = {
  articles: Article[]
}

const ArticleList = ({ articles }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32">
      {articles.map((article) => (
        <section key={article.slug}>
          <div className="mb-6">
            <div className="sm:mx-0">
              <Link
                href={pagesPath.private.articles._slug(article.slug).$url()}
              >
                <a className="hover">
                  <CoverImage
                    src={article.image.url}
                    alt={article.image.alt}
                    type="thumbnail"
                  />
                </a>
              </Link>
            </div>
          </div>
          <Heading as="h3">
            <Link href={pagesPath.private.articles._slug(article.slug).$url()}>
              <a className="hover:underline">{article.title}</a>
            </Link>
          </Heading>
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
