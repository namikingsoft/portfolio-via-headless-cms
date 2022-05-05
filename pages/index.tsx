import Container from '../components/container'
import PagePreview from '../components/page-preview'
import ArticleList from '../components/article-list'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { getAllArticles, Article, getAllPages, Page } from '../api/contentful'

type Props = {
  articles: Article[]
  pages: Page[]
}

const Index = ({ articles, pages }: Props) => {
  const firstPage = pages?.[0]
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {firstPage && (
            <PagePreview
              title={firstPage.title ?? ''}
              thumbnail={firstPage.thumbnail?.url ?? ''}
              excerpt={firstPage.excerpt ?? ''}
              slug={firstPage.slug ?? ''}
            />
          )}
          {articles.length > 0 && <ArticleList articles={articles} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps() {
  const articles = await getAllArticles()
  const pages = await getAllPages()
  return {
    props: {
      articles,
      pages,
    },
  }
}
