import { GetStaticProps, GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Container from '../../../components/container'
import ArticleList from '../../../components/article-list'
import { Article, Tag } from '../../../schemas/contentful/types'
import { getTagWithArticles, getTagList } from '../../../schemas/contentful'

type Props = {
  tag: Tag
  articles: Article[]
}

const TagIndex = ({ tag, articles }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>
          {tag.title} | {t('siteName')}
        </title>
      </Head>
      <Container>
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          {tag.title}
        </h2>
        {articles.length > 0 && <ArticleList articles={articles} />}
      </Container>
    </>
  )
}

export default TagIndex

type Params = {
  slug: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
  locale,
}) => {
  const { tag, articles } = await getTagWithArticles(params!.slug)
  return {
    props: {
      tag,
      articles,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async ({ locales }) => {
  const tags = await getTagList()

  return {
    paths: locales!.flatMap((locale) =>
      tags.map((tag) => ({
        params: {
          slug: tag.slug,
        },
        locale,
      })),
    ),
    fallback: false,
  }
}
