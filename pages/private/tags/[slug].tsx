import { GetStaticProps, GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Heading from '../../../components/heading'
import Container from '../../../components/container'
import ArticleList from '../../../components/article-list'
import { Article, Tag } from '../../../schemas/contentful/types'
import { getTagWithArticles, getTagList } from '../../../schemas/contentful'
import { siteName } from '../../../lib/constants'

type Props = {
  tag: Tag
  articles: Article[]
}

const TagIndex = ({ tag, articles }: Props) => {
  return (
    <>
      <Head>
        <title>{`${tag.title} | ${siteName}`}</title>
      </Head>
      <Container>
        <div className="py-10">
          <Heading as="h1">{tag.title}</Heading>
        </div>
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
