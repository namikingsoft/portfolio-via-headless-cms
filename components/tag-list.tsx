import Link from 'next/link'
import { Tag } from '../schemas/contentful/types'
import { pagesPath } from '../lib/$path'

type Props = {
  tags: Tag[]
}

const TagList = ({ tags }: Props) => {
  return (
    <>
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={pagesPath.private.tags._slug(tag.slug).$url()}
        >
          <a className="hover last:mr-0 mr-2">
            <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-slate-600 bg-slate-200">
              {tag.title}
            </span>
          </a>
        </Link>
      ))}
    </>
  )
}

export default TagList
