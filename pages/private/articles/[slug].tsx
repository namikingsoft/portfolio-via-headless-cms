import Head from 'next/head'
import Link from 'next/link'
import CoverImage from '../../../components/cover-image'
import { siteName } from '../../../lib/constants'
import { Article } from '../../../schemas/contentful/types'
import { getAllArticles, getArticle } from '../../../schemas/contentful'
import { pagesPath } from '../../../lib/$path'
import markdownToHtml from '../../../lib/markdownToHtml'
import markdownStyles from '../../../components/markdown-styles.module.css'
import Container from '../../../components/container'
import DateRange from '../../../components/date-range'

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
        <div className="py-20">
          <Container>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight">
              {article.title}
            </h1>
            <div className="mt-10 text-2xl text-slate-500">
              <DateRange
                date={article.date}
                dateEnd={article.dateEnd}
                isContinue={article.dateIsContinue}
              />
            </div>
            <div className="mt-10">
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
          </Container>
        </div>
        <div className="mb-8 md:mb-16">
          <CoverImage src={article.image.url} alt={article.image.alt} />
        </div>
        <Container className="max-w-2xl">
          <div
            className={markdownStyles.markdown}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Container>
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
