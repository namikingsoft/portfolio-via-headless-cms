type Image = {
  url: string
  alt: string
  width: number
  height: number
}

export type Tag = {
  title: string
  slug: string
}

interface TagWithTotal extends Tag {
  total: number
}

export type TagGroup = {
  title: string
  tags: TagWithTotal[]
}

export type RatingRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type SkillGroup = {
  title: string
}

export type SkillRating = {
  title: string
  rating: RatingRange
  description: string
  group: SkillGroup
  relatedTag: Tag | null
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

export type Feature = {
  title: string
  content: string
  image: Image
}

export type Intro = {
  title: string
  content: string
  firstName: string
  firstNameRuby: string
  lastName: string
  lastNameRuby: string
  position: string
  githubUrl: string
  portraitImage: Image
  backgroundImage: Image
  featureTitle: string
  featureDescription: string
  features: Feature[]
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
