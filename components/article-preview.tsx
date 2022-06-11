import Link from 'next/link'
import CoverImage from './cover-image'
import DateRange from './date-range'
import { Article } from '../schemas/contentful/types'
import { pagesPath } from '../lib/$path'
import TagList from './tag-list'

type Props = {
  article: Article
}

const ArticlePreview = ({ article }: Props) => {
  return (
    <div>
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
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={pagesPath.private.articles._slug(article.slug).$url()}>
          <a className="hover:underline">{article.title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateRange
          date={article.date}
          dateEnd={article.dateEnd}
          isContinue={article.dateIsContinue}
        />
      </div>
      <div className="mb-4">
        <TagList tags={article.tags} />
      </div>
      <p className="leading-relaxed mb-4">{article.excerpt}</p>
    </div>
  )
}

export default ArticlePreview
