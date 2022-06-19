import Head from 'next/head'
import { siteName } from '../../lib/constants'
import { Article, Intro, Pickup } from '../../schemas/contentful/types'
import { getIntroList, getPickups } from '../../schemas/contentful'
import Container from '../../components/container'
import CoverImage from '../../components/cover-image'
import ArticleList from '../../components/article-list'

type Props = {
  intros: Intro[]
  articles: Article[]
  pickups: Pickup[]
}

const Index = ({ intros, articles, pickups }: Props) => {
  return (
    <>
      <Head>
        <title>Next.js Blog Example with {siteName}</title>
      </Head>
      {intros.length > 0 &&
        intros.map((intro) => (
          <section key={intro.title}>
            <div className="mb-8 md:mb-16">
              <CoverImage src={intro.image.url} alt={intro.image.alt} />
            </div>
            <Container>
              <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                  <h3 className="mb-4 text-4xl lg:text-6xl font-bold leading-tight">
                    {intro.title}
                  </h3>
                </div>
                <div>
                  <p className="text-lg leading-relaxed mb-4">
                    {intro.content}
                  </p>
                </div>
              </div>
            </Container>
          </section>
        ))}
      <Container>
        {pickups.map((pickup) => (
          <section key={pickup.title}>
            <h2 className="mb-8 text-6xl md:text-6xl font-bold tracking-tighter leading-tight">
              {pickup.title}
            </h2>
            {pickup.articles.length > 0 && (
              <ArticleList articles={pickup.articles} />
            )}
          </section>
        ))}
      </Container>
    </>
  )
}

export default Index

export async function getStaticProps() {
  const intros = await getIntroList()
  const pickups = await getPickups()
  return {
    props: {
      intros,
      pickups,
    },
  }
}
