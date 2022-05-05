import classnames from 'classnames'
import Link from 'next/link'

type Props = {
  title: string
  thumbnail: string
  excerpt: string
  slug: string
}

const PagePreview = ({ title, thumbnail, excerpt, slug }: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <img
          src={thumbnail}
          alt={title}
          className={classnames('shadow-small', {
            'hover:shadow-medium transition-shadow duration-200': slug,
          })}
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/pages/${slug}`} href="/pages/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        </div>
      </div>
    </section>
  )
}

export default PagePreview
