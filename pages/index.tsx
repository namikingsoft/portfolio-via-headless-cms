import Container from '../components/container'
import IntroSection from '../components/intro-section'
import ArticleList from '../components/article-list'
import SiteTitle from '../components/site-title'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { Article, Intro } from '../api/contentful/types'
import { getAllArticles, getIntroList } from '../api/contentful'

type Props = {
  intros: Intro[]
  articles: Article[]
}

const Index = ({ intros, articles }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <SiteTitle />
          {intros.length > 0 &&
            intros.map((intro) => (
              <IntroSection key={intro.title} intro={intro} />
            ))}
          {articles.length > 0 && (
            <ArticleList title="More Stories" articles={articles} />
          )}
        </Container>
      </Layout>
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
