type Tag = {
  title: string
  slug: string
}

type Image = {
  url: string
  alt: string
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  image: Image
  tags: Tag[]
}

export type Intro = {
  title: string
  content: string
  image: Image
}
