import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Container from '../../../components/container'
import ArticleList from '../../../components/article-list'
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
        <title>
          {t('allArticles')} | {t('siteName')}
        </title>
      </Head>
      <Container className="mb-32">
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          {t('allArticles')}
        </h2>
        {articles.length > 0 && <ArticleList articles={articles} />}
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
