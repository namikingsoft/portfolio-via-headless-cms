import { GraphQLClient } from 'graphql-request'
import {
  getSdk,
  VisitorByBasicAuthQuery,
  ArticleCollectionQuery,
  IntroCollectionQuery,
  TagCollectionQuery,
} from './client.generated'
import { Article, Intro, Tag, Visitor } from './types'
import { contentfulEndpoint, contentfulAccessToken } from '../../env'

const client = new GraphQLClient(contentfulEndpoint, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${contentfulAccessToken}`,
  },
  // NOTE: do not use cross-fetch of default in middleware
  // https://github.com/vercel/next.js/issues/32369
  // https://nextjs.org/docs/api-reference/edge-runtime#fetch
  fetch,
})

type ArticleRaw = NonNullable<
  NonNullable<ArticleCollectionQuery['articleCollection']>['items'][number]
>

type IntroRaw = NonNullable<
  NonNullable<IntroCollectionQuery['introCollection']>['items'][number]
>

type TagRaw = NonNullable<
  NonNullable<TagCollectionQuery['tagCollection']>['items'][number]
>

type VisitorRaw = NonNullable<
  NonNullable<VisitorByBasicAuthQuery['visitorCollection']>['items'][number]
>

// NOTE: contentful fields are all nullable even if required
// https://www.contentfulcommunity.com/t/why-do-required-fields-appear-as-nullable-in-the-graphql-graph/4079
function nonNullable<T>(x: T | null | undefined) {
  if (x == null) throw new Error('nullable not expected')
  return x
}

function toTag(raw: TagRaw): Tag {
  return {
    slug: nonNullable(raw.slug),
    title: nonNullable(raw.title),
  }
}

function toArticle(raw: ArticleRaw): Article {
  return {
    slug: nonNullable(raw.slug),
    title: nonNullable(raw.title),
    excerpt: nonNullable(raw.excerpt),
    content: nonNullable(raw.content),
    publishedAt: nonNullable(raw.sys.publishedAt),
    image: {
      url: nonNullable(raw.image?.url),
      alt: nonNullable(raw.image?.title),
    },
    tags: (raw.tagCollection?.items ?? [])
      .flatMap((x) => (x === null ? [] : [x]))
      .map(toTag),
  }
}

function toIntro(raw: IntroRaw): Intro {
  return {
    title: nonNullable(raw.title),
    content: nonNullable(raw.content),
    image: {
      url: nonNullable(raw.image?.url),
      alt: nonNullable(raw.image?.title),
    },
  }
}

function toVisitor(raw: VisitorRaw): Visitor {
  return {
    username: nonNullable(raw.username),
    disabled: nonNullable(raw.disabled),
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const { articleCollection } = await getSdk(client).ArticleCollection()
  return (articleCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toArticle)
}

export async function getArticle(slug: string): Promise<Article> {
  const { articleCollection } = await getSdk(client).ArticleFromSlug({
    slug,
  })
  return toArticle(nonNullable(articleCollection?.items?.[0]))
}

export async function getIntroList(): Promise<Intro[]> {
  const { introCollection } = await getSdk(client).IntroCollection()
  return (introCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toIntro)
}

export async function getTagList(): Promise<Tag[]> {
  const { tagCollection } = await getSdk(client).TagCollection()
  return (tagCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toTag)
}

type TagWithArticles = {
  tag: Tag
  articles: Article[]
}

export async function getTagWithArticles(
  slug: string,
): Promise<TagWithArticles> {
  const { TagFromSlug, TagWithArticles } = await getSdk(client)
  const { tagCollection } = await TagFromSlug({ slug })
  const firstTag = nonNullable(tagCollection?.items?.[0])
  const { tag } = await TagWithArticles({ tagId: firstTag.sys.id })
  const articleCollection = tag?.linkedFrom?.articleCollection
  const articles = (articleCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toArticle)
  return {
    tag: toTag(firstTag),
    articles,
  }
}

export async function getVisitorByBasicAuth(
  username: string,
  password: string,
): Promise<Visitor> {
  const { visitorCollection } = await getSdk(client).VisitorByBasicAuth({
    username,
    password,
  })
  return toVisitor(nonNullable(visitorCollection?.items?.[0]))
}
