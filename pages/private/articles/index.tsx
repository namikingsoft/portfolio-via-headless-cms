import Head from 'next/head'
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
        <title>Testest | Next.js Blog Example with {siteName}</title>
      </Head>
      {articles.length > 0 && (
        <ArticleList title="All Stories" articles={articles} />
      )}
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
