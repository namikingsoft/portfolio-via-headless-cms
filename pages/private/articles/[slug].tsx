import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { ArticleWithRelated } from '../../../schemas/contentful/types'
import { getAllArticles, getArticle } from '../../../schemas/contentful'
import markdownToHtml from '../../../lib/markdownToHtml'
import markdownStyles from '../../../components/markdown-styles.module.css'
import Section from '../../../components/section'
import Container from '../../../components/container'
import CoverImage from '../../../components/cover-image'
import CoverImageBlock from '../../../components/cover-image-block'
import Company from '../../../components/company'
import DateRange from '../../../components/date-range'
import GithubLink from '../../../components/github-link'
import ArticleList from '../../../components/article-list'
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
        <title>
          {article.title} | {t('siteName')}
        </title>
      </Head>
      <article>
        <Section>
          <div className="py-20">
            <Container>
              <Heading as="h1">{article.title}</Heading>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 mt-10 text-2xl">
                <div className="text-slate-500">
                  <Company company={article.company} />
                </div>
                <div className="text-slate-500">
                  <DateRange
                    date={article.date}
                    dateEnd={article.dateEnd}
                    isContinue={article.dateIsContinue}
                  />
                </div>
                <div className="text-slate-500">
                  <GithubLink repo={article.githubRepo} />
                </div>
                <div className="text-sm col-span-2">
                  <TagList article={article} />
                </div>
              </div>
            </Container>
          </div>
          <CoverImageBlock>
            <CoverImage src={article.image.url} alt={article.image.alt} />
          </CoverImageBlock>
          <Container narrow>
            <div
              className={markdownStyles.markdown}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Container>
        </Section>
      </article>
      {article.relatedArticles.length > 0 && (
        <aside>
          <Section>
            <Container>
              <ArticleList articles={article.relatedArticles} />
            </Container>
          </Section>
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
