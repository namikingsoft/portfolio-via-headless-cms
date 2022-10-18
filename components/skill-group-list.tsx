import { MdStar, MdStarHalf, MdStarOutline } from 'react-icons/md'
import { calcStarType } from '../lib/calcStarType'
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
                {([1, 2, 3, 4, 5] as const).map((pos) => {
                  switch (calcStarType(pos, skillRating.rating)) {
                    case 'full':
                      return <MdStar key={pos} className="inline" />
                    case 'half':
                      return <MdStarHalf key={pos} className="inline" />
                    default:
                      return <MdStarOutline key={pos} className="inline" />
                  }
                })}
              </dd>
            </dl>
          ))}
        </section>
      ))}
    </>
  )
}

export default SkillRatingList
