import Head from 'next/head'
import ArticleList from '../../../components/article-list'
import { CMS_NAME } from '../../../lib/constants'
import { Article } from '../../../contentful/types'
import { getAllArticles } from '../../../contentful'

type Props = {
  articles: Article[]
}

const ArticleIndex = ({ articles }: Props) => {
  return (
    <>
      <Head>
        <title>Testest | Next.js Blog Example with {CMS_NAME}</title>
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
