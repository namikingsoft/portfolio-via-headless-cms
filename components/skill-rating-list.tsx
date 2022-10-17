import Link from 'next/link'
import { MdStar, MdStarOutline } from 'react-icons/md'
import { SkillRating } from '../schemas/contentful/types'

type Props = {
  skillRatings: SkillRating[]
}

const SkillRatingList = ({ skillRatings }: Props) => {
  const skillGroups = Array.from(
    skillRatings.reduce((acc, x) => {
      const xs = acc.get(x.groupTitle)
      if (xs) xs.push(x)
      else acc.set(x.groupTitle, [x])
      return acc
    }, new Map<string, SkillRating[]>()),
  )
  return (
    <>
      {skillGroups.map(([groupTitle, skillRatings]) => (
        <section key={groupTitle}>
          <h3 className="mt-5 mb-2 font-bold text-xl">{groupTitle}</h3>
          {skillRatings.map((skillRating) => (
            <dl key={skillRating.title}>
              <dt>{skillRating.title}</dt>
              <dd>
                {[...Array(10)].map((_, i) =>
                  i < skillRating.rating ? (
                    <MdStar key={i} className="inline" />
                  ) : (
                    <MdStarOutline key={i} className="inline" />
                  ),
                )}
              </dd>
            </dl>
          ))}
        </section>
      ))}
    </>
  )
}

export default SkillRatingList
