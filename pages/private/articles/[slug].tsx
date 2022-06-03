import Head from 'next/head'
import ArticleBody from '../../../components/article-body'
import ArticleHeader from '../../../components/article-header'
import markdownToHtml from '../../../lib/markdownToHtml'
import { CMS_NAME } from '../../../lib/constants'
import { Article } from '../../../contentful/types'
import { getAllArticles, getArticle } from '../../../contentful'

type Props = {
  article: Article
  content: string
}

const Post = ({ article, content }: Props) => {
  return (
    <>
      <Head>
        <title>
          {article.title} | Next.js Blog Example with {CMS_NAME}
        </title>
      </Head>
      <article className="mb-32">
        <ArticleHeader article={article} />
        <ArticleBody content={content} />
      </article>
    </>
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
  const content = await markdownToHtml(article.content)
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
