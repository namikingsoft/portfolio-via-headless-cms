import Head from 'next/head'
import { siteName } from '../../../lib/constants'
import { ArticleWithRelated } from '../../../schemas/contentful/types'
import { getAllArticles, getArticle } from '../../../schemas/contentful'
import markdownToHtml from '../../../lib/markdownToHtml'
import markdownStyles from '../../../components/markdown-styles.module.css'
import Container from '../../../components/container'
import CoverImage from '../../../components/cover-image'
import DateRange from '../../../components/date-range'
import GithubLink from '../../../components/github-link'
import ArticleList from '../../../components/article-list'
import TagList from '../../../components/tag-list'

type Props = {
  article: ArticleWithRelated
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 mt-10">
              <div className="text-2xl text-slate-500">
                <DateRange
                  date={article.date}
                  dateEnd={article.dateEnd}
                  isContinue={article.dateIsContinue}
                />
              </div>
              <div className="text-2xl text-slate-500">
                <GithubLink repo={article.githubRepo} />
              </div>
              <div className="col-span-2">
                <TagList article={article} />
              </div>
            </div>
          </Container>
        </div>
        <div className="mb-8 md:mb-16">
          <CoverImage src={article.image.url} alt={article.image.alt} />
        </div>
        <Container className="max-w-2xl mt-18">
          <div
            className={markdownStyles.markdown}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Container>
        {article.relatedArticles.length > 0 && (
          <Container className="mt-32">
            <ArticleList articles={article.relatedArticles} />
          </Container>
        )}
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
