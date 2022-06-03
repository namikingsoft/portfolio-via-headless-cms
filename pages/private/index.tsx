import IntroSection from '../../components/intro-section'
import ArticleList from '../../components/article-list'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import { Article, Intro } from '../../contentful/types'
import { getAllArticles, getIntroList } from '../../contentful'

type Props = {
  intros: Intro[]
  articles: Article[]
}

const Index = ({ intros, articles }: Props) => {
  return (
    <>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      {intros.length > 0 &&
        intros.map((intro) => <IntroSection key={intro.title} intro={intro} />)}
      {articles.length > 0 && (
        <ArticleList title="More Stories" articles={articles} />
      )}
    </>
  )
}

export default Index

export async function getStaticProps() {
  const intros = await getIntroList()
  const articles = await getAllArticles()
  return {
    props: {
      intros,
      articles,
    },
  }
}
