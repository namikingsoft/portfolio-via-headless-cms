import { GraphQLClient } from 'graphql-request'
import {
  getSdk,
  ArticleCollectionQuery,
  IntroCollectionQuery,
} from './client.generated'
import { contentfulEndpoint, contentfulAccessToken } from '../../env'

export type Article = NonNullable<
  NonNullable<ArticleCollectionQuery['articleCollection']>['items'][number]
>

export type Intro = NonNullable<
  NonNullable<IntroCollectionQuery['introCollection']>['items'][number]
>

const client = new GraphQLClient(contentfulEndpoint, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${contentfulAccessToken}`,
  },
})

export async function getAllArticles(): Promise<Article[]> {
  const { articleCollection } = await getSdk(client).ArticleCollection()
  return (articleCollection?.items ?? []).flatMap((x) =>
    x === null ? [] : [x],
  )
}

export async function getArticle(slug: string): Promise<Article> {
  const { articleCollection } = await getSdk(client).ArticleFromSlug({ slug })
  const article = articleCollection?.items?.[0]
  if (!article) throw new Error('article not found')
  return article
}

export async function getIntroList(): Promise<Intro[]> {
  const { introCollection } = await getSdk(client).IntroCollection()
  return (introCollection?.items ?? []).flatMap((x) => (x === null ? [] : [x]))
}
