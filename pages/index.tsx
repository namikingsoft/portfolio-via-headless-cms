import Container from '../components/container'
import ArticleList from '../components/article-list'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { getAllArticles, Article } from '../lib/contentful'

type Props = {
  articles: Article[]
}

const Index = ({ articles }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {articles.length > 0 && <ArticleList articles={articles} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps() {
  const articles = await getAllArticles()
  return {
    props: {
      articles,
    },
  }
}
