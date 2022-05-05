import Head from 'next/head'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import ArticleList from '../../components/article-list'
import { CMS_NAME } from '../../lib/constants'
import { getAllArticles, Article } from '../../lib/contentful'

type Props = {
  articles: Article[]
}

const ArticleIndex = ({ articles }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Testest | Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Container>
        <Header />
        {articles.length > 0 && <ArticleList articles={articles} />}
      </Container>
    </Layout>
  )
}

export default ArticleIndex

export async function getStaticProps(): Promise<{ props: Props }> {
  const articles = await getAllArticles()
  return {
    props: {
      articles,
    },
  }
}
