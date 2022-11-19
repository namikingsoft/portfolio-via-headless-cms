import { GraphQLClient } from 'graphql-request'
import {
  getSdk,
  GetVisitorByUsernameQuery,
  GetArticleCollectionQuery,
  GetIntroCollectionQuery,
  GetTagCollectionQuery,
  GetTagGroupCollectionQuery,
  GetTagWithGroupCollectionQuery,
  GetSkillGroupCollectionQuery,
  GetSkillRatingCollectionQuery,
  GetPickupByIdQuery,
} from './client.generated'
import {
  Article,
  ArticleWithRelated,
  Intro,
  Pickup,
  SkillRating,
  SkillGroup,
  Tag,
  TagGroup,
  Visitor,
  RatingRange,
  Feature,
} from './types'
import { contentfulEndpoint, contentfulAccessToken } from '../../env'

const sdk = getSdk(
  new GraphQLClient(contentfulEndpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${contentfulAccessToken}`,
    },
    // NOTE: do not use cross-fetch of default in middleware
    // https://github.com/vercel/next.js/issues/32369
    // https://nextjs.org/docs/api-reference/edge-runtime#fetch
    fetch,
  }),
)

type ArticleRaw = NonNullable<
  NonNullable<GetArticleCollectionQuery['articleCollection']>['items'][number]
>

type IntroRaw = NonNullable<
  NonNullable<GetIntroCollectionQuery['introCollection']>['items'][number]
>

type FeatureRaw = NonNullable<
  NonNullable<IntroRaw['featureCollection']>['items'][number]
>

type TagRaw = NonNullable<
  NonNullable<GetTagCollectionQuery['tagCollection']>['items'][number]
>

type TagWithGroupRaw = NonNullable<
  NonNullable<GetTagWithGroupCollectionQuery['tagCollection']>['items'][number]
>

type TagGroupRaw = NonNullable<
  NonNullable<GetTagGroupCollectionQuery['tagGroupCollection']>['items'][number]
>

type SkillGroupRaw = NonNullable<
  NonNullable<
    GetSkillGroupCollectionQuery['skillGroupCollection']
  >['items'][number]
>

type SkillRatingRaw = NonNullable<
  NonNullable<
    GetSkillRatingCollectionQuery['skillRatingCollection']
  >['items'][number]
>

type PickupRaw = NonNullable<NonNullable<GetPickupByIdQuery['pickup']>>

type VisitorRaw = NonNullable<
  NonNullable<GetVisitorByUsernameQuery['visitorCollection']>['items'][number]
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

function toSkillGroup(raw: SkillGroupRaw): SkillGroup {
  return {
    title: nonNullable(raw.title),
  }
}

function toSkillRating(raw: SkillRatingRaw): SkillRating {
  return {
    title: nonNullable(raw.title),
    rating: nonNullable(raw.rating) as RatingRange,
    description: nonNullable(raw.description),
    group: toSkillGroup(nonNullable(raw.group)),
    relatedTag: raw.relatedTag ? toTag(raw.relatedTag) : null,
  }
}

function toArticle(raw: ArticleRaw): Article {
  return {
    slug: nonNullable(raw.slug),
    title: nonNullable(raw.title),
    excerpt: nonNullable(raw.excerpt),
    content: raw.content ?? '',
    date: nonNullable(raw.date),
    dateEnd: raw.dateEnd,
    dateIsContinue: !!raw.dateIsContinue,
    company: nonNullable(raw.company),
    githubRepo: raw.githubRepo,
    publishedAt: nonNullable(raw.sys.publishedAt),
    image: {
      url: nonNullable(raw.image?.url),
      alt: nonNullable(raw.image?.title),
      width: nonNullable(raw.image?.width),
      height: nonNullable(raw.image?.height),
    },
    category: toTag(nonNullable(raw.category)),
    tags: (raw.tagCollection?.items ?? [])
      .flatMap((x) => (x === null ? [] : [x]))
      .map(toTag),
  }
}

function toFeature(raw: FeatureRaw): Feature {
  return {
    title: nonNullable(raw.title),
    content: nonNullable(raw.content),
    image: {
      url: nonNullable(raw.image?.url),
      alt: nonNullable(raw.image?.title),
      width: nonNullable(raw.image?.width),
      height: nonNullable(raw.image?.height),
    },
  }
}

function toIntro(raw: IntroRaw): Intro {
  return {
    title: nonNullable(raw.title),
    content: nonNullable(raw.content),
    firstName: nonNullable(raw.firstName),
    firstNameRuby: nonNullable(raw.firstNameRuby),
    lastName: nonNullable(raw.lastName),
    lastNameRuby: nonNullable(raw.lastNameRuby),
    position: nonNullable(raw.position),
    githubUrl: nonNullable(raw.githubUrl),
    featureTitle: nonNullable(raw.featureTitle),
    featureDescription: nonNullable(raw.featureDescription),
    portraitImage: {
      url: nonNullable(raw.portraitImage?.url),
      alt: nonNullable(raw.portraitImage?.title),
      width: nonNullable(raw.portraitImage?.width),
      height: nonNullable(raw.portraitImage?.height),
    },
    backgroundImage: {
      url: nonNullable(raw.backgroundImage?.url),
      alt: nonNullable(raw.backgroundImage?.title),
      width: nonNullable(raw.backgroundImage?.width),
      height: nonNullable(raw.backgroundImage?.height),
    },
    features: (raw.featureCollection?.items ?? [])
      .flatMap((x) => (x === null ? [] : [x]))
      .map(toFeature),
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
  const { articleCollection } = await sdk.getArticleCollection()
  return (articleCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toArticle)
}

export async function getArticle(slug: string): Promise<ArticleWithRelated> {
  const { articleCollection } = await sdk.getArticleFromSlug({
    slug,
  })
  const articleRaw = nonNullable(articleCollection?.items?.[0])
  const [parentArticles, relatedArticles] = await Promise.all([
    (async () => {
      const { article } = await sdk.getParentArticle({
        id: articleRaw.sys.id,
      })
      return (article?.linkedFrom?.articleCollection?.items ?? [])
        .flatMap((x) => (x === null ? [] : [x]))
        .map(toArticle)
    })(),
    (async () => {
      const { article } = await sdk.getRelatedArticleCollection({
        id: articleRaw.sys.id,
      })
      return (article?.relatedArticleCollection?.items ?? [])
        .flatMap((x) => (x === null ? [] : [x]))
        .map(toArticle)
    })(),
  ])
  return { ...toArticle(articleRaw), parentArticles, relatedArticles }
}

export async function getIntro(): Promise<Intro> {
  const { introCollection } = await sdk.getIntroCollection()
  return nonNullable(
    (introCollection?.items ?? [])
      .flatMap((x) => (x === null ? [] : [x]))
      .map(toIntro)[0],
  )
}

export async function getTagList(): Promise<Tag[]> {
  const { tagCollection } = await sdk.getTagCollection()
  return (tagCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toTag)
}

export async function getTagGroupList(): Promise<TagGroup[]> {
  const { tagGroupCollection } = await sdk.getTagGroupCollection()
  const tagGroupWithoutTags = (tagGroupCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toTagGroupWithoutTags)

  const { tagCollection } = await sdk.getTagWithGroupCollection()
  const tagsWithGroup = (tagCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toTagWithGroup)
    // exclude tag without articles
    .filter((x) => x.total > 0)

  return tagGroupWithoutTags.map(({ title }) => ({
    title,
    tags: tagsWithGroup
      .filter((tag) => tag.groupTitle === title)
      .sort((a, b) => b.total - a.total),
  }))
}

type TagWithArticles = {
  tag: Tag
  articles: Article[]
}

export async function getTagWithArticles(
  slug: string,
): Promise<TagWithArticles> {
  const { tagCollection } = await sdk.getTagFromSlug({ slug })
  const firstTag = toTag(nonNullable(tagCollection?.items?.[0]))
  const allArticles = await getAllArticles()
  return {
    tag: firstTag,
    articles: allArticles.filter(
      (article) =>
        article.category.slug === firstTag.slug ||
        article.tags.some((tag) => tag.slug === firstTag.slug),
    ),
  }
}

export async function getPickups(): Promise<Pickup[]> {
  const { pickupCollection } = await sdk.getPickupIdCollection()
  const pickupPromises =
    pickupCollection?.items
      .map((raw) => raw?.sys.id)
      .flatMap((x) => (x == null ? [] : [x]))
      .map((id) => sdk.getPickupById({ id })) ?? []
  return (await Promise.all(pickupPromises)).map(({ pickup }) =>
    toPickup(nonNullable(pickup)),
  )
}

export async function getSkillGroupList(): Promise<SkillGroup[]> {
  const { skillGroupCollection } = await sdk.getSkillGroupCollection()
  return (skillGroupCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toSkillGroup)
}

export async function getSkillRatingList(): Promise<SkillRating[]> {
  const { skillRatingCollection } = await sdk.getSkillRatingCollection()
  return (skillRatingCollection?.items ?? [])
    .flatMap((x) => (x === null ? [] : [x]))
    .map(toSkillRating)
}

export async function getVisitorByUsername(username: string): Promise<Visitor> {
  const { visitorCollection } = await sdk.getVisitorByUsername({
    username,
  })
  return toVisitor(nonNullable(visitorCollection?.items?.[0]))
}

export async function getVisitorByPassword(password: string): Promise<Visitor> {
  const { visitorCollection } = await sdk.getVisitorByPassword({
    password,
  })
  return toVisitor(nonNullable(visitorCollection?.items?.[0]))
}
