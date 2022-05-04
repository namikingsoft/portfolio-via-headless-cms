import Head from 'next/head'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import ArticleBody from '../../components/article-body'
import ArticleHeader from '../../components/article-header'
import markdownToHtml from '../../lib/markdownToHtml'
import { CMS_NAME } from '../../lib/constants'
import { getAllArticles, getArticle, Article } from '../../lib/contentful'

type Props = {
  article: Article
  content: string
}

const Post = ({ article, content }: Props) => {
  return (
    <Layout>
      <Container>
        <Header />
        <article className="mb-32">
          <Head>
            <title>
              {article.title} | Next.js Blog Example with {CMS_NAME}
            </title>
          </Head>
          <ArticleHeader
            title={article.title || ''}
            coverImage={article.thumbnail?.url || ''}
            date={article.sys.publishedAt}
          />
          <ArticleBody content={content} />
        </article>
      </Container>
    </Layout>
  )
}

export default Post

type Context = {
  params: {
    slug: string
  }
}
export async function getStaticProps({
  params: { slug },
}: Context): Promise<{ props: Props }> {
  const article = await getArticle(slug)
  const content = await markdownToHtml(article.description ?? '')
  return {
    props: {
      article,
      content,
    },
  }
}

export async function getStaticPaths() {
  const articles = await getAllArticles()

  return {
    paths: articles.map((article) => {
      return {
        params: {
          slug: article.slug,
        },
      }
    }),
    fallback: false,
  }
}
