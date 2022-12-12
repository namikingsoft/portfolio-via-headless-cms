import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Heading from '../../../components/heading'
import Container from '../../../components/container'
import ArticleList from '../../../components/article-list'
import { siteName } from '../../../lib/constants'
import { Article } from '../../../schemas/contentful/types'
import { getAllArticles } from '../../../schemas/contentful'

type Props = {
  articles: Article[]
}

const ArticleIndex = ({ articles }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{`${t('allArticles')} | ${siteName}`}</title>
      </Head>
      <Container>
        <Heading as="h2" className="py-10">
          {t('allArticles')}
        </Heading>
        {articles.length > 0 && (
          <ArticleList articles={articles} priorityLessThanIndex={2} />
        )}
      </Container>
    </>
  )
}

export default ArticleIndex

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const articles = await getAllArticles()
  return {
    props: {
      articles,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
