import { MdStar } from 'react-icons/md'
import { calcStarType } from '../lib/calcStarType'
import { SkillGroup } from '../schemas/contentful/types'

type Props = {
  skillGroups: SkillGroup[]
}

const SkillRatingList = ({ skillGroups }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-16">
      {skillGroups.map((skillGroup) => (
        <section
          key={skillGroup.title}
          className="flex flex-col md:flex-row items-stretch gap-14"
        >
          <h3 className="self-start font-bold text-xl text-white bg-yellow-800 p-6 whitespace-nowrap shadow-xl -skew-x-6">
            {skillGroup.title}
          </h3>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5">
            {skillGroup.skillRatings.map((skillRating) => (
              <div key={skillRating.title}>
                <dl className="grid grid-cols-2 gap-2 items-baseline mb-3 whitespace-nowrap">
                  <dt className="font-bold text-lg">{skillRating.title}</dt>
                  <dd className="text-2xl text-yellow-500 drop-shadow-sm text-right whitespace-nowrap">
                    {([1, 2, 3, 4, 5] as const).map((pos) => {
                      switch (calcStarType(pos, skillRating.rating)) {
                        case 'full':
                          return <MdStar key={pos} className="inline" />
                        case 'half':
                          return (
                            <span className="inline-block relative">
                              <MdStar
                                key={pos}
                                className="inline"
                                style={{ clipPath: 'inset(0 50% 0 0)' }}
                              />
                              <MdStar
                                key={pos}
                                className="inline text-gray-300 absolute bottom-0 left-0 -z-10"
                              />
                            </span>
                          )
                        default:
                          return (
                            <MdStar
                              key={pos}
                              className="inline text-gray-300"
                            />
                          )
                      }
                    })}
                  </dd>
                </dl>
                <p className="text-gray-700">{skillRating.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default SkillRatingList
