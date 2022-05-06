import { Intro } from '../api/contentful/types'

type Props = {
  intro: Intro
}

const IntroSection = ({ intro }: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <img
          src={intro.image.url}
          alt={intro.image.alt}
          className="shadow-small"
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            {intro.title}
          </h3>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{intro.content}</p>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
