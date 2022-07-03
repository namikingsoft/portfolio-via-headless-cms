import Link from 'next/link'
import CoverImage from './cover-image'
import DateRange from './date-range'
import Company from './company'
import { Article } from '../schemas/contentful/types'
import { pagesPath } from '../lib/$path'
import TagList from './tag-list'
import Heading from './heading'

type Props = {
  article: Article
}

const ArticlePreview = ({ article }: Props) => {
  return (
    <section>
      <div className="mb-5">
        <div className="sm:mx-0">
          <Link href={pagesPath.private.articles._slug(article.slug).$url()}>
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
      <Heading as="h3">
        <Link href={pagesPath.private.articles._slug(article.slug).$url()}>
          <a className="hover:underline">{article.title}</a>
        </Link>
      </Heading>
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
      <p className="leading-7 mb-4 text-gray-700">{article.excerpt}</p>
    </section>
  )
}

export default ArticlePreview
