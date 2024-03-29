import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { ArticleWithRelated } from '../../../schemas/contentful/types'
import { getAllArticles, getArticle } from '../../../schemas/contentful'
import { siteName } from '../../../lib/constants'
import markdownToHtml from '../../../lib/markdownToHtml'
import Block from '../../../components/block'
import Container from '../../../components/container'
import FillImage from '../../../components/fill-image'
import Markdown from '../../../components/markdown'
import Company from '../../../components/company'
import DateRange from '../../../components/date-range'
import GithubLink from '../../../components/github-link'
import ArticleListRelative from '../../../components/article-list-relative'
import TagList from '../../../components/tag-list'
import Heading from '../../../components/heading'
import useZoomImage from '../../../lib/use-zoom-image'
import useLazyStylesheet from '../../../lib/use-lazy-stylesheet'

type Props = {
  article: ArticleWithRelated
  content: string
}

const Post = ({ article, content }: Props) => {
  const { t } = useTranslation()

  const zoomImage = useZoomImage(
    'a[href$=".png"], a[href$=".svg"], a[href$=".jpg"], a[href$=".gif"], a[href$=".webp"]',
  )

  useLazyStylesheet({
    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/brands.min.css',
  })

  useLazyStylesheet({
    href: 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css',
    integrity:
      'sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC',
    crossOrigin: 'anonymous',
  })

  return (
    <>
      <Head>
        <title>{`${article.title} | ${siteName}`}</title>
      </Head>
      <Block>
        <article>
          <Container className="mt-16 lg:mt-20">
            <Heading as="h1">{article.title}</Heading>
            <h2 className="mt-6 text-base lg:visible text-slate-600">
              {article.excerpt}
            </h2>
            <div className="flex flex-col md:flex-row gap-12 mt-12 lg:mt-24 text-slate-500">
              <div className="flex-none md:w-1/2 lg:w-2/5">
                <a href={article.image.url}>
                  <FillImage
                    className="shadow-small hover:shadow-medium transition-shadow duration-200"
                    src={article.image.url}
                    alt={article.image.alt}
                    width={article.image.width}
                    height={article.image.height}
                    aspectRatio={article.image.width / article.image.height}
                    priority
                  />
                </a>
              </div>
              <div className="flex flex-col gap-2 lg:gap-5 text-lg md:text-xl lg:text-2xl">
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
            </div>
          </Container>
          <Container narrow>
            <div className="text-gray-700 text-lg mt-16 md:mt-28 lg:mt-44">
              <Markdown type="detail">{content}</Markdown>
            </div>
          </Container>
        </article>
      </Block>
      {article.relatedArticles.length > 0 && (
        <Block>
          <aside>
            <Container narrow>
              <ArticleListRelative articles={article.relatedArticles} />
            </Container>
          </aside>
        </Block>
      )}
      {article.parentArticles.length > 0 && (
        <Block>
          <aside>
            <Container narrow>
              <h3 className="flex flex-row items-center gap-1 font-bold text-xl mb-4">
                <FaChevronCircleLeft /> {t('referrer')}
              </h3>
              <ArticleListRelative articles={article.parentArticles} />
            </Container>
          </aside>
        </Block>
      )}
      {zoomImage}
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
