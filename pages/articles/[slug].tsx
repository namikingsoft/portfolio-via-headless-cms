import Head from 'next/head'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import markdownToHtml from '../../lib/markdownToHtml'
import { CMS_NAME } from '../../lib/constants'
import { getAllArticles, getArticle, Article } from '../../lib/contentful'
import markdownStyles from '../../components/markdown-styles.module.css'

type Props = {
  article: Article
  content: string
}

const Post = ({ article, content }: Props) => {
  return (
    <Layout>
      <Head>
        <title>
          {article.title} | Next.js Blog Example with {CMS_NAME}
        </title>
      </Head>
      <Container>
        <Header />
        <section>
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            {article.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
            <div
              className={markdownStyles.markdown}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>
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
