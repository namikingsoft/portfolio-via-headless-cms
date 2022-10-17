import { MdStar, MdStarOutline } from 'react-icons/md'
import { SkillGroup } from '../schemas/contentful/types'

type Props = {
  skillGroups: SkillGroup[]
}

const SkillRatingList = ({ skillGroups }: Props) => {
  return (
    <>
      {skillGroups.map((skillGroup) => (
        <section key={skillGroup.title}>
          <h3 className="mt-5 mb-2 font-bold text-xl">{skillGroup.title}</h3>
          {skillGroup.skillRatings.map((skillRating) => (
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
