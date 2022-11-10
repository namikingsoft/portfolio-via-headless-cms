import { FaTag } from 'react-icons/fa'
import { calcStarType } from '../lib/star'
import { SkillGroup, SkillRating } from '../schemas/contentful/types'
import { pagesPath } from '../lib/$path'
import Star from './star'
import Link from 'next/link'

type Props = {
  skillGroups: SkillGroup[]
  skillRatings: SkillRating[]
}

const SkillRatingList = ({ skillGroups, skillRatings }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {skillGroups.map((skillGroup) => (
        <section
          key={skillGroup.title}
          className="flex flex-row items-stretch gap-7 sm:gap-14"
        >
          <h3 className="self-start font-bold text:lg sm:text-xl text-white bg-teal-700 p-4 sm:p-6 whitespace-nowrap shadow-xl -skew-x-6">
            {skillGroup.title}
          </h3>
          <div className="flex-grow flex flex-col gap-3">
            {skillRatings
              .filter((skill) => skill.group.title === skillGroup.title)
              .map((skillRating) => (
                <div key={skillRating.title}>
                  <dl className="grid grid-cols-2 gap-2 items-baseline mb-3 whitespace-nowrap">
                    <dt className="font-bold text-lg">
                      {skillRating.relatedTag ? (
                        <Link
                          className="group"
                          href={pagesPath.private.tags
                            ._slug(skillRating.relatedTag.slug)
                            .$url()}
                        >
                          <span className="group-hover:underline">
                            {skillRating.title}
                          </span>
                          <FaTag className="inline-block text-sm ml-1 mb-2 group-hover:text-teal-700" />
                        </Link>
                      ) : (
                        skillRating.title
                      )}
                    </dt>
                    <dd className="text-3xl text-yellow-500 drop-shadow-sm text-right whitespace-nowrap">
                      {([1, 2, 3, 4, 5] as const).map((pos) => (
                        <Star
                          key={pos}
                          type={calcStarType(pos, skillRating.rating)}
                        />
                      ))}
                    </dd>
                  </dl>
                  <p
                    className="text-gray-700 h-8 text-xs line-clamp-2"
                    title={skillRating.description}
                  >
                    {skillRating.description}
                  </p>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default SkillRatingList
