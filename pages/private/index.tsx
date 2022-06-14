import Head from 'next/head'
import { siteName } from '../../lib/constants'
import { Article, Intro } from '../../schemas/contentful/types'
import { getAllArticles, getIntroList } from '../../schemas/contentful'
import Container from '../../components/container'
import CoverImage from '../../components/cover-image'
import ArticleList from '../../components/article-list'

type Props = {
  intros: Intro[]
  articles: Article[]
}

const Index = ({ intros, articles }: Props) => {
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
                  <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
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
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          More Stories
        </h2>
        {articles.length > 0 && <ArticleList articles={articles} />}
      </Container>
    </>
  )
}

export default Index

export async function getStaticProps() {
  const intros = await getIntroList()
  const articles = await getAllArticles()
  return {
    props: {
      intros,
      articles,
    },
  }
}
