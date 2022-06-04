type Image = {
  url: string
  alt: string
}

export type Tag = {
  title: string
  slug: string
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

export type Visitor = {
  username: string
  label: string
}
