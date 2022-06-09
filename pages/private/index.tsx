import IntroSection from '../../components/intro-section'
import ArticleList from '../../components/article-list'
import Head from 'next/head'
import { siteName } from '../../lib/constants'
import { Article, Intro } from '../../schemas/contentful/types'
import { getAllArticles, getIntroList } from '../../schemas/contentful'
import Container from '../../components/container'

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
      <Container>
        {intros.length > 0 &&
          intros.map((intro) => (
            <IntroSection key={intro.title} intro={intro} />
          ))}
        {articles.length > 0 && (
          <ArticleList title="More Stories" articles={articles} />
        )}
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
