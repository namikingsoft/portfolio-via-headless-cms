import { Feature } from '../schemas/contentful/types'

type Props = {
  features: Feature[]
}

const FeatureList = ({ features }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-10">
      {features.map((feature) => (
        <div key={feature.title} className="flex flex-col gap-5">
          <div className="flex flex-col items-center justify-center gap-8">
            <img
              src={feature.image.url}
              alt={feature.image.alt}
              style={{
                filter:
                  'invert(53%) sepia(99%) saturate(359%) hue-rotate(121deg) brightness(86%) contrast(88%)',
              }}
              className="w-48 md:w-40"
            />
            <h4 className="text-4xl md:text-3xl font-bold md:text-center">
              {feature.title}
            </h4>
          </div>
          <p>{feature.content}</p>
        </div>
      ))}
    </div>
  )
}

export default FeatureList