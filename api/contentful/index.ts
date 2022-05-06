import { GraphQLClient } from 'graphql-request'
import {
  getSdk,
  ArticleCollectionQuery,
  IntroCollectionQuery,
} from './client.generated'
import { Article, Intro } from './types'
import { contentfulEndpoint, contentfulAccessToken } from '../../env'

type ArticleRaw = NonNullable<
  NonNullable<ArticleCollectionQuery['articleCollection']>['items'][number]
>

type IntroRaw = NonNullable<
  NonNullable<IntroCollectionQuery['introCollection']>['items'][number]
>

// NOTE: contentful fields are all nullable even if required
// https://www.contentfulcommunity.com/t/why-do-required-fields-appear-as-nullable-in-the-graphql-graph/4079
function nonNullable<T>(x: T | null | undefined) {
  if (x == null) throw new Error('nullable not expected')
  return x
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
    tags: (raw.tagCollection?.items ?? []).map((tag) => ({
      slug: nonNullable(tag?.slug),
      title: nonNullable(tag?.title),
    })),
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

const client = new GraphQLClient(contentfulEndpoint, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${contentfulAccessToken}`,
  },
})

export async function getAllArticles(): Promise<Article[]> {
  const { articleCollection } = await getSdk(client).ArticleCollection()
  return (articleCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toArticle)
}

export async function getArticle(slug: string): Promise<Article> {
  const { articleCollection } = await getSdk(client).ArticleFromSlug({ slug })
  return toArticle(nonNullable(articleCollection?.items?.[0]))
}

export async function getIntroList(): Promise<Intro[]> {
  const { introCollection } = await getSdk(client).IntroCollection()
  return (introCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toIntro)
}
