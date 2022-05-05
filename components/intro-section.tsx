type Props = {
  title: string
  imageUrl: string
  imageAlt: string
  content: string
}

const IntroSection = ({ title, imageUrl, imageAlt, content }: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <img src={imageUrl} alt={imageAlt} className="shadow-small" />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">{title}</h3>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{content}</p>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
