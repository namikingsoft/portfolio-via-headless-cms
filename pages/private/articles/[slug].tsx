import Head from 'next/head'
import Link from 'next/link'
import CoverImage from '../../../components/cover-image'
import DateFormatter from '../../../components/date-formatter'
import { siteName } from '../../../lib/constants'
import { Article } from '../../../schemas/contentful/types'
import { getAllArticles, getArticle } from '../../../schemas/contentful'
import { pagesPath } from '../../../lib/$path'
import markdownToHtml from '../../../lib/markdownToHtml'
import markdownStyles from '../../../components/markdown-styles.module.css'

type Props = {
  article: Article
  content: string
}

const Post = ({ article, content }: Props) => {
  return (
    <>
      <Head>
        <title>
          {article.title} | Next.js Blog Example with {siteName}
        </title>
      </Head>
      <article className="mb-32">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          {article.title}
        </h1>
        <div className="hidden md:block md:mb-12">
          {article.tags.map((tag) => (
            <Link
              key={tag.slug}
              href={pagesPath.private.tags._slug(tag.slug).$url()}
            >
              <a className="hover last:mr-0 mr-2">
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-pink-600 bg-pink-200 uppercase">
                  {tag.title}
                </span>
              </a>
            </Link>
          ))}
        </div>
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage src={article.image.url} alt={article.image.alt} />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 text-lg">
            <DateFormatter dateString={article.publishedAt} />
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div
            className={markdownStyles.markdown}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
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
