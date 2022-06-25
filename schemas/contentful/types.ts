type Image = {
  url: string
  alt: string
}

export type Tag = {
  title: string
  slug: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  dateEnd?: string
  dateIsContinue: boolean
  company: string
  githubRepo?: string | null
  publishedAt: string
  image: Image
  category: Tag
  tags: Tag[]
}

export interface ArticleWithRelated extends Article {
  relatedArticles: Article[]
}

export type Intro = {
  title: string
  content: string
  image: Image
}

export type Pickup = {
  title: string
  description: string
  articles: Article[]
}

export type Visitor = {
  username: string
  label: string
}
