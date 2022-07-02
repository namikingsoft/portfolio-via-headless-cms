import Link from 'next/link'
import { TagGroup } from '../schemas/contentful/types'
import { pagesPath } from '../lib/$path'

type Props = {
  tagGroups: TagGroup[]
}

const TagGroupList = ({ tagGroups }: Props) => {
  return (
    <>
      {tagGroups.map((tagGroup) => (
        <section key={tagGroup.title}>
          <h3 className="mt-5 mb-2 font-bold text-xl">{tagGroup.title}</h3>
          <ul className="flex flex-row gap-5">
            {tagGroup.tags.map((tag) => (
              <li key={tag.slug}>
                <Link href={pagesPath.private.tags._slug(tag.slug).$url()}>
                  <a className="hover">
                    {tag.title} ({tag.total})
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}

export default TagGroupList
