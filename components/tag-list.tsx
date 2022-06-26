import Link from 'next/link'
import cn from 'classnames'
import { Article } from '../schemas/contentful/types'
import { pagesPath } from '../lib/$path'

type Props = {
  article: Article
}

const baseClassName = 'font-semibold inline-block mt-2 py-1 px-2 rounded'

const TagList = ({ article }: Props) => {
  return (
    <div className="-mt-2">
      <Link
        key={article.category.slug}
        href={pagesPath.private.tags._slug(article.category.slug).$url()}
      >
        <a className="hover last:mr-0 mr-3">
          <span className={cn(baseClassName, 'text-green-600 bg-green-200 ')}>
            {article.category.title}
          </span>
        </a>
      </Link>
      {article.tags.map((tag) => (
        <Link
          key={tag.slug}
          href={pagesPath.private.tags._slug(tag.slug).$url()}
        >
          <a className="hover last:mr-0 mr-2">
            <span className={cn(baseClassName, 'text-slate-600 bg-slate-200')}>
              {tag.title}
            </span>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default TagList
