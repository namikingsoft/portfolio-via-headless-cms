import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { ArticleWithRelated } from '../../../schemas/contentful/types'
import { getAllArticles, getArticle } from '../../../schemas/contentful'
import markdownToHtml from '../../../lib/markdownToHtml'
import Block from '../../../components/block'
import Container from '../../../components/container'
import CoverImage from '../../../components/cover-image'
import Markdown from '../../../components/markdown'
import Company from '../../../components/company'
import DateRange from '../../../components/date-range'
import GithubLink from '../../../components/github-link'
import ArticleListRelative from '../../../components/article-list-relative'
import TagList from '../../../components/tag-list'
import Heading from '../../../components/heading'

type Props = {
  article: ArticleWithRelated
  content: string
}

const Post = ({ article, content }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{`${article.title} | ${t('siteName')}`}</title>
      </Head>
      <article>
        <Block>
          <div className="py-20 lg:py-28">
            <Container>
              <Heading as="h1">{article.title}</Heading>
              <div className="mt-6 text-xs sm:text-sm md:text-base lg:visible text-slate-600">
                {article.excerpt}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-6 mt-16 lg:mt-28 text-lg md:text-2xl text-slate-500">
                <div>
                  <Company company={article.company} />
                </div>
                <div>
                  <DateRange
                    date={article.date}
                    dateEnd={article.dateEnd}
                    isContinue={article.dateIsContinue}
                  />
                </div>
                <div>
                  <GithubLink repo={article.githubRepo} />
                </div>
                <div className="text-sm md:col-span-2">
                  <TagList article={article} />
                </div>
              </div>
            </Container>
          </div>
          <Block>
            <CoverImage
              src={article.image.url}
              alt={article.image.alt}
              type="detail"
              aspectRatio={article.image.width / article.image.height}
            />
          </Block>
          <Container narrow>
            <div className="text-gray-700 text-lg">
              <Markdown content={content} />
            </div>
          </Container>
        </Block>
      </article>
      {article.relatedArticles.length > 0 && (
        <aside>
          <Block>
            <Container narrow>
              <ArticleListRelative articles={article.relatedArticles} />
            </Container>
          </Block>
        </aside>
      )}
    </>
  )
}

export default Post

type Params = {
  slug: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
  locale,
}) => {
  const article = await getArticle(params!.slug)
  const content = await markdownToHtml(article.content)
  return {
    props: {
      article,
      content,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async ({ locales }) => {
  const articles = await getAllArticles()

  return {
    paths: locales!.flatMap((locale) =>
      articles.map((article) => ({
        params: {
          slug: article.slug,
        },
        locale,
      })),
    ),
    fallback: false,
  }
}
