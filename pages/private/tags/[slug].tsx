import Head from 'next/head'
import ArticleList from '../../../components/article-list'
import { CMS_NAME } from '../../../lib/constants'
import { Article, Tag } from '../../../contentful/types'
import { getTagWithArticles, getTagList } from '../../../contentful'

type Props = {
  tag: Tag
  articles: Article[]
}

const ArticleIndex = ({ tag, articles }: Props) => {
  return (
    <>
      <Head>
        <title>
          {tag.title} | Next.js Blog Example with {CMS_NAME}
        </title>
      </Head>
      {articles.length > 0 && (
        <ArticleList title={tag.title} articles={articles} />
      )}
    </>
  )
}

export default ArticleIndex

type Context = {
  params: {
    slug: string
  }
}

export async function getStaticProps({
  params: { slug },
}: Context): Promise<{ props: Props }> {
  const { tag, articles } = await getTagWithArticles(slug)
  return {
    props: {
      tag,
      articles,
    },
  }
}

export async function getStaticPaths() {
  const tags = await getTagList()

  return {
    paths: tags.map((tag) => {
      return {
        params: {
          slug: tag.slug,
        },
      }
    }),
    fallback: false,
  }
}
