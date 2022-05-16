import Head from 'next/head'
import Layout from '../../components/layout'
import Container from '../../components/container'
import SiteTitle from '../../components/site-title'
import ArticleBody from '../../components/article-body'
import ArticleHeader from '../../components/article-header'
// import markdownToHtml from '../../lib/markdownToHtml'
import { CMS_NAME } from '../../lib/constants'
import { Article } from '../../api/contentful/types'
// import { getAllArticles, getArticle } from '../../api/contentful'

type Props = {
  article: Article
  content: string
}

const Post = ({ article, content }: Props) => {
  return (
    <Layout>
      <Container>
        <SiteTitle isLowerPage />
        <article className="mb-32">
          <Head>
            <title>
              {article.title} | Next.js Blog Example with {CMS_NAME}
            </title>
          </Head>
          <ArticleHeader article={article} />
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
  // const article = await getArticle(slug)
  // const content = await markdownToHtml(article.content)
  return {
    props: {
      article: {
        slug: '',
        title: '',
        excerpt: '',
        content: '',
        publishedAt: '',
        image: {
          url: '',
          alt: '',
        },
        tags: [],
      },
      content: '',
    },
  }
}

export async function getStaticPaths() {
  // const articles = await getAllArticles()

  return {
    // paths: articles.map((article) => {
    //   return {
    //     params: {
    //       slug: article.slug,
    //     },
    //   }
    // }),
    paths: [],
    fallback: false,
  }
}
