import { GraphQLClient } from 'graphql-request'
import {
  getSdk,
  VisitorByUsernameQuery,
  ArticleCollectionQuery,
  IntroCollectionQuery,
  TagCollectionQuery,
  TagGroupCollectionQuery,
  TagWithGroupCollectionQuery,
  PickupByIdQuery,
} from './client.generated'
import {
  Article,
  ArticleWithRelated,
  Intro,
  Pickup,
  Tag,
  TagGroup,
  Visitor,
} from './types'
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

type TagWithGroupRaw = NonNullable<
  NonNullable<TagWithGroupCollectionQuery['tagCollection']>['items'][number]
>

type TagGroupRaw = NonNullable<
  NonNullable<TagGroupCollectionQuery['tagGroupCollection']>['items'][number]
>

type PickupRaw = NonNullable<NonNullable<PickupByIdQuery['pickup']>>

type VisitorRaw = NonNullable<
  NonNullable<VisitorByUsernameQuery['visitorCollection']>['items'][number]
>

type TagGroupWithoutTags = Omit<TagGroup, 'tags'>

interface TagWithGroup extends Tag {
  total: number
  groupTitle?: string | null
}

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

function toTagWithGroup(raw: TagWithGroupRaw): TagWithGroup {
  return {
    slug: nonNullable(raw.slug),
    title: nonNullable(raw.title),
    total: raw.linkedFrom?.articleCollection?.total ?? 0,
    groupTitle: raw.tagGroup?.title,
  }
}

function toTagGroupWithoutTags(raw: TagGroupRaw): TagGroupWithoutTags {
  return {
    title: nonNullable(raw.title),
  }
}

function toArticle(raw: ArticleRaw): Article {
  return {
    slug: nonNullable(raw.slug),
    title: nonNullable(raw.title),
    excerpt: nonNullable(raw.excerpt),
    content: nonNullable(raw.content),
    date: nonNullable(raw.date),
    dateEnd: raw.dateEnd,
    dateIsContinue: !!raw.dateIsContinue,
    company: nonNullable(raw.company),
    githubRepo: raw.githubRepo,
    publishedAt: nonNullable(raw.sys.publishedAt),
    image: {
      url: nonNullable(raw.image?.url),
      alt: nonNullable(raw.image?.title),
    },
    category: toTag(nonNullable(raw.category)),
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

function toPickup(raw: PickupRaw): Pickup {
  return {
    title: nonNullable(raw.title),
    description: raw.description || '',
    articles: (raw.articleCollection?.items ?? [])
      .flatMap((x) => (x === null ? [] : [x]))
      .map(toArticle),
  }
}

function toVisitor(raw: VisitorRaw): Visitor {
  return {
    username: nonNullable(raw.username),
    label: nonNullable(raw.label),
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const { articleCollection } = await getSdk(client).ArticleCollection()
  return (articleCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toArticle)
}

export async function getArticle(slug: string): Promise<ArticleWithRelated> {
  const { articleCollection } = await getSdk(client).ArticleFromSlug({
    slug,
  })
  const articleRaw = nonNullable(articleCollection?.items?.[0])
  const { article } = await getSdk(client).RelatedArticleCollection({
    id: articleRaw.sys.id,
  })
  const relatedArticles = (article?.relatedArticleCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toArticle)
  return { ...toArticle(articleRaw), relatedArticles }
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

export async function getTagGroupList(): Promise<TagGroup[]> {
  const { tagGroupCollection } = await getSdk(client).TagGroupCollection()
  const tagGroupWithoutTags = (tagGroupCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toTagGroupWithoutTags)

  const { tagCollection } = await getSdk(client).TagWithGroupCollection()
  const tagsWithGroup = (tagCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toTagWithGroup)

  return tagGroupWithoutTags.map(({ title }) => ({
    title,
    tags: tagsWithGroup.filter((tag) => tag.groupTitle === title),
  }))
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

export async function getPickups(): Promise<Pickup[]> {
  const { PickupIdCollection, PickupById } = await getSdk(client)
  const { pickupCollection } = await PickupIdCollection()
  const pickupPromises =
    pickupCollection?.items
      .map((raw) => raw?.sys.id)
      .flatMap((x) => (x == null ? [] : [x]))
      .map((id) => PickupById({ id })) ?? []
  return (await Promise.all(pickupPromises)).map(({ pickup }) =>
    toPickup(nonNullable(pickup)),
  )
}

export async function getVisitorByUsername(username: string): Promise<Visitor> {
  const { visitorCollection } = await getSdk(client).VisitorByUsername({
    username,
  })
  return toVisitor(nonNullable(visitorCollection?.items?.[0]))
}

export async function getVisitorByPassword(password: string): Promise<Visitor> {
  const { visitorCollection } = await getSdk(client).VisitorByPassword({
    password,
  })
  return toVisitor(nonNullable(visitorCollection?.items?.[0]))
}
