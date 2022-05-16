import Head from 'next/head'
import Layout from '../../components/layout'
import Container from '../../components/container'
import SiteTitle from '../../components/site-title'
import ArticleList from '../../components/article-list'
import { CMS_NAME } from '../../lib/constants'
import { Article } from '../../api/contentful/types'
// import { getAllArticles } from '../../api/contentful'

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
        <SiteTitle isLowerPage />
        {articles.length > 0 && (
          <ArticleList title="All Stories" articles={articles} />
        )}
      </Container>
    </Layout>
  )
}

export default ArticleIndex

export async function getStaticProps(): Promise<{ props: Props }> {
  // const articles = await getAllArticles()
  return {
    props: {
      articles: [],
    },
  }
}
