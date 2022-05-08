import Link from 'next/link'
import DateFormatter from './date-formatter'
import { Article } from '../api/contentful/types'

type Props = {
  article: Article
}

const ArticlePreview = ({ article }: Props) => {
  return (
    <div>
      <div className="mb-5">
        <div className="sm:mx-0">
          <Link as={`/articles/${article.slug}`} href="/articles/[slug]">
            <a className="hover">
              <img
                src={article.image.url}
                alt={article.image.alt}
                className="shadow-small hover:shadow-medium transition-shadow duration-200"
              />
            </a>
          </Link>
        </div>
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/articles/${article.slug}`} href="/articles/[slug]">
          <a className="hover:underline">{article.title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={article.publishedAt} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{article.excerpt}</p>
    </div>
  )
}

export default ArticlePreview
