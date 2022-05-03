import Head from 'next/head'
import Link from 'next/link'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import { CMS_NAME } from '../../lib/constants'
import { getAllArticles, Article } from '../../lib/contentful'

type Props = {
  articles: Article[]
}

const Post = ({ articles }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Testest | Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Container>
        <Header />
        <section>
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            More Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
            <ul>
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    as={`/articles/${article.slug}`}
                    href="/articles/[slug]"
                  >
                    <a className="hover:underline">{article.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Container>
    </Layout>
  )
}

export default Post

export async function getStaticProps(): Promise<{ props: Props }> {
  const articles = await getAllArticles()
  return {
    props: {
      articles,
    },
  }
}
