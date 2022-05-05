import Container from '../components/container'
import IntroSection from '../components/intro-section'
import ArticleList from '../components/article-list'
import SiteTitle from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { getAllArticles, Article, getIntroList, Intro } from '../api/contentful'

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
              <IntroSection
                key={intro.title}
                title={intro.title ?? ''}
                imageUrl={intro.image?.url ?? ''}
                imageAlt={intro.image?.title ?? ''}
                content={intro.content ?? ''}
              />
            ))}
          {articles.length > 0 && <ArticleList articles={articles} />}
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
