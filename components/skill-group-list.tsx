import Link from 'next/link'
import cn from 'classnames'
import { calcStarType } from '../lib/star'
import { SkillGroup, SkillRating } from '../schemas/contentful/types'
import { pagesPath } from '../lib/$path'
import Star from './star'
import useIntersection from '../lib/use-intersection'
import useLapTimer from '../lib/use-lap-timer'

type Props = {
  className?: string
  skillGroups: SkillGroup[]
  skillRatings: SkillRating[]
}

const SkillRatingList = ({ className, skillGroups, skillRatings }: Props) => {
  const { done, setRef } = useIntersection({ rootMargin: '-40% 0px' })

  const lap = useLapTimer(
    {
      begin1: 100,
      end1: 200,
      begin2: 200,
      end2: 400,
      begin3: 300,
      end3: 500,
      begin4: 400,
      end4: 600,
      begin5: 500,
      end5: 700,
    },
    done,
  )

  return (
    <div
      ref={setRef}
      className={cn('grid grid-cols-1 lg:grid-cols-2 gap-16', className)}
    >
      {skillGroups.map((skillGroup) => (
        <section
          key={skillGroup.title}
          className="flex flex-row items-stretch gap-7 sm:gap-14"
        >
          <h3 className="self-start font-bold text:lg sm:text-xl text-white bg-accent-700 p-4 sm:p-6 whitespace-nowrap shadow-xl -skew-x-6">
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
                          className="underline hover:no-underline"
                          href={pagesPath.private.tags
                            ._slug(skillRating.relatedTag.slug)
                            .$url()}
                        >
                          {skillRating.title}
                        </Link>
                      ) : (
                        skillRating.title
                      )}
                    </dt>
                    <dd className="text-3xl text-yellow-500 drop-shadow-sm text-right whitespace-nowrap">
                      {([1, 2, 3, 4, 5] as const).map((pos) => {
                        const type = calcStarType(pos, skillRating.rating)
                        return (
                          <Star
                            key={pos}
                            type={type}
                            className={cn('transition-transform duration-200', {
                              'scale-200 rotate-90':
                                skillRating.rating === 10 &&
                                type !== 'none' &&
                                lap[`begin${pos}`] &&
                                !lap[`end${pos}`],
                              'text-red-500':
                                skillRating.rating === 10 &&
                                type !== 'none' &&
                                lap[`end${pos}`],
                            })}
                          />
                        )
                      })}
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
