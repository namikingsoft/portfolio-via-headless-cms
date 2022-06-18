import Head from 'next/head'
import Container from '../../../components/container'
import ArticleList from '../../../components/article-list'
import { siteName } from '../../../lib/constants'
import { Article } from '../../../schemas/contentful/types'
import { getAllArticles } from '../../../schemas/contentful'

type Props = {
  articles: Article[]
}

const ArticleIndex = ({ articles }: Props) => {
  return (
    <>
      <Head>
        <title>All Articles | Next.js Blog Example with {siteName}</title>
      </Head>
      <Container>
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          All Articles
        </h2>
        {articles.length > 0 && <ArticleList articles={articles} />}
      </Container>
    </>
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
