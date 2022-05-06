import ArticlePreview from './article-preview'
import { Article } from '../api/contentful/types'

type Props = {
  articles: Article[]
}

const ArticleList = ({ articles }: Props) => {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {articles.map((article) => (
          <ArticlePreview key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}

export default ArticleList
