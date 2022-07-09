import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
};

/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type Article = Entry & {
  __typename?: 'Article';
  category?: Maybe<Tag>;
  company?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  date?: Maybe<Scalars['DateTime']>;
  dateEnd?: Maybe<Scalars['DateTime']>;
  dateIsContinue?: Maybe<Scalars['Boolean']>;
  excerpt?: Maybe<Scalars['String']>;
  githubRepo?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<ArticleLinkingCollections>;
  relatedArticleCollection?: Maybe<ArticleRelatedArticleCollection>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  tagCollection?: Maybe<ArticleTagCollection>;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleCategoryArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleCompanyArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleContentArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleDateArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleDateEndArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleDateIsContinueArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleExcerptArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleGithubRepoArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleRelatedArticleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleTagCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/article) */
export type ArticleTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ArticleCollection = {
  __typename?: 'ArticleCollection';
  items: Array<Maybe<Article>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ArticleFilter = {
  AND?: InputMaybe<Array<InputMaybe<ArticleFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ArticleFilter>>>;
  category?: InputMaybe<CfTagNestedFilter>;
  category_exists?: InputMaybe<Scalars['Boolean']>;
  company?: InputMaybe<Scalars['String']>;
  company_contains?: InputMaybe<Scalars['String']>;
  company_exists?: InputMaybe<Scalars['Boolean']>;
  company_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  company_not?: InputMaybe<Scalars['String']>;
  company_not_contains?: InputMaybe<Scalars['String']>;
  company_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  content?: InputMaybe<Scalars['String']>;
  content_contains?: InputMaybe<Scalars['String']>;
  content_exists?: InputMaybe<Scalars['Boolean']>;
  content_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  content_not?: InputMaybe<Scalars['String']>;
  content_not_contains?: InputMaybe<Scalars['String']>;
  content_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  date?: InputMaybe<Scalars['DateTime']>;
  dateEnd?: InputMaybe<Scalars['DateTime']>;
  dateEnd_exists?: InputMaybe<Scalars['Boolean']>;
  dateEnd_gt?: InputMaybe<Scalars['DateTime']>;
  dateEnd_gte?: InputMaybe<Scalars['DateTime']>;
  dateEnd_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  dateEnd_lt?: InputMaybe<Scalars['DateTime']>;
  dateEnd_lte?: InputMaybe<Scalars['DateTime']>;
  dateEnd_not?: InputMaybe<Scalars['DateTime']>;
  dateEnd_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  dateIsContinue?: InputMaybe<Scalars['Boolean']>;
  dateIsContinue_exists?: InputMaybe<Scalars['Boolean']>;
  dateIsContinue_not?: InputMaybe<Scalars['Boolean']>;
  date_exists?: InputMaybe<Scalars['Boolean']>;
  date_gt?: InputMaybe<Scalars['DateTime']>;
  date_gte?: InputMaybe<Scalars['DateTime']>;
  date_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  date_lt?: InputMaybe<Scalars['DateTime']>;
  date_lte?: InputMaybe<Scalars['DateTime']>;
  date_not?: InputMaybe<Scalars['DateTime']>;
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  excerpt?: InputMaybe<Scalars['String']>;
  excerpt_contains?: InputMaybe<Scalars['String']>;
  excerpt_exists?: InputMaybe<Scalars['Boolean']>;
  excerpt_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  excerpt_not?: InputMaybe<Scalars['String']>;
  excerpt_not_contains?: InputMaybe<Scalars['String']>;
  excerpt_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  githubRepo?: InputMaybe<Scalars['String']>;
  githubRepo_contains?: InputMaybe<Scalars['String']>;
  githubRepo_exists?: InputMaybe<Scalars['Boolean']>;
  githubRepo_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  githubRepo_not?: InputMaybe<Scalars['String']>;
  githubRepo_not_contains?: InputMaybe<Scalars['String']>;
  githubRepo_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  relatedArticleCollection_exists?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  tagCollection_exists?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ArticleLinkingCollections = {
  __typename?: 'ArticleLinkingCollections';
  articleCollection?: Maybe<ArticleCollection>;
  entryCollection?: Maybe<EntryCollection>;
  pickupCollection?: Maybe<PickupCollection>;
};


export type ArticleLinkingCollectionsArticleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ArticleLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ArticleLinkingCollectionsPickupCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ArticleOrder {
  CompanyAsc = 'company_ASC',
  CompanyDesc = 'company_DESC',
  DateEndAsc = 'dateEnd_ASC',
  DateEndDesc = 'dateEnd_DESC',
  DateIsContinueAsc = 'dateIsContinue_ASC',
  DateIsContinueDesc = 'dateIsContinue_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  GithubRepoAsc = 'githubRepo_ASC',
  GithubRepoDesc = 'githubRepo_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type ArticleRelatedArticleCollection = {
  __typename?: 'ArticleRelatedArticleCollection';
  items: Array<Maybe<Article>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ArticleTagCollection = {
  __typename?: 'ArticleTagCollection';
  items: Array<Maybe<Tag>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']>;
  transform?: InputMaybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']>;
  contentType_contains?: InputMaybe<Scalars['String']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentType_not?: InputMaybe<Scalars['String']>;
  contentType_not_contains?: InputMaybe<Scalars['String']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName?: InputMaybe<Scalars['String']>;
  fileName_contains?: InputMaybe<Scalars['String']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName_not?: InputMaybe<Scalars['String']>;
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  height?: InputMaybe<Scalars['Int']>;
  height_exists?: InputMaybe<Scalars['Boolean']>;
  height_gt?: InputMaybe<Scalars['Int']>;
  height_gte?: InputMaybe<Scalars['Int']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  height_lt?: InputMaybe<Scalars['Int']>;
  height_lte?: InputMaybe<Scalars['Int']>;
  height_not?: InputMaybe<Scalars['Int']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size?: InputMaybe<Scalars['Int']>;
  size_exists?: InputMaybe<Scalars['Boolean']>;
  size_gt?: InputMaybe<Scalars['Int']>;
  size_gte?: InputMaybe<Scalars['Int']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size_lt?: InputMaybe<Scalars['Int']>;
  size_lte?: InputMaybe<Scalars['Int']>;
  size_not?: InputMaybe<Scalars['Int']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url?: InputMaybe<Scalars['String']>;
  url_contains?: InputMaybe<Scalars['String']>;
  url_exists?: InputMaybe<Scalars['Boolean']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url_not?: InputMaybe<Scalars['String']>;
  url_not_contains?: InputMaybe<Scalars['String']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['Int']>;
  width_exists?: InputMaybe<Scalars['Boolean']>;
  width_gt?: InputMaybe<Scalars['Int']>;
  width_gte?: InputMaybe<Scalars['Int']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  width_lt?: InputMaybe<Scalars['Int']>;
  width_lte?: InputMaybe<Scalars['Int']>;
  width_not?: InputMaybe<Scalars['Int']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  articleCollection?: Maybe<ArticleCollection>;
  entryCollection?: Maybe<EntryCollection>;
  introCollection?: Maybe<IntroCollection>;
};


export type AssetLinkingCollectionsArticleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsIntroCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']>;
};

/** Top page sections [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/intro) */
export type Intro = Entry & {
  __typename?: 'Intro';
  content?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<IntroLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** Top page sections [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/intro) */
export type IntroContentArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Top page sections [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/intro) */
export type IntroImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** Top page sections [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/intro) */
export type IntroLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Top page sections [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/intro) */
export type IntroTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type IntroCollection = {
  __typename?: 'IntroCollection';
  items: Array<Maybe<Intro>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type IntroFilter = {
  AND?: InputMaybe<Array<InputMaybe<IntroFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<IntroFilter>>>;
  content?: InputMaybe<Scalars['String']>;
  content_contains?: InputMaybe<Scalars['String']>;
  content_exists?: InputMaybe<Scalars['Boolean']>;
  content_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  content_not?: InputMaybe<Scalars['String']>;
  content_not_contains?: InputMaybe<Scalars['String']>;
  content_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type IntroLinkingCollections = {
  __typename?: 'IntroLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type IntroLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum IntroOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Article pickup [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/pickup) */
export type Pickup = Entry & {
  __typename?: 'Pickup';
  articleCollection?: Maybe<PickupArticleCollection>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PickupLinkingCollections>;
  sortNumber?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** Article pickup [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/pickup) */
export type PickupArticleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** Article pickup [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/pickup) */
export type PickupDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Article pickup [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/pickup) */
export type PickupLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Article pickup [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/pickup) */
export type PickupSortNumberArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Article pickup [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/pickup) */
export type PickupTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type PickupArticleCollection = {
  __typename?: 'PickupArticleCollection';
  items: Array<Maybe<Article>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type PickupCollection = {
  __typename?: 'PickupCollection';
  items: Array<Maybe<Pickup>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type PickupFilter = {
  AND?: InputMaybe<Array<InputMaybe<PickupFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PickupFilter>>>;
  articleCollection_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sortNumber?: InputMaybe<Scalars['Int']>;
  sortNumber_exists?: InputMaybe<Scalars['Boolean']>;
  sortNumber_gt?: InputMaybe<Scalars['Int']>;
  sortNumber_gte?: InputMaybe<Scalars['Int']>;
  sortNumber_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sortNumber_lt?: InputMaybe<Scalars['Int']>;
  sortNumber_lte?: InputMaybe<Scalars['Int']>;
  sortNumber_not?: InputMaybe<Scalars['Int']>;
  sortNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PickupLinkingCollections = {
  __typename?: 'PickupLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type PickupLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum PickupOrder {
  SortNumberAsc = 'sortNumber_ASC',
  SortNumberDesc = 'sortNumber_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articleCollection?: Maybe<ArticleCollection>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  entryCollection?: Maybe<EntryCollection>;
  intro?: Maybe<Intro>;
  introCollection?: Maybe<IntroCollection>;
  pickup?: Maybe<Pickup>;
  pickupCollection?: Maybe<PickupCollection>;
  skillGroup?: Maybe<SkillGroup>;
  skillGroupCollection?: Maybe<SkillGroupCollection>;
  skillRating?: Maybe<SkillRating>;
  skillRatingCollection?: Maybe<SkillRatingCollection>;
  tag?: Maybe<Tag>;
  tagCollection?: Maybe<TagCollection>;
  tagGroup?: Maybe<TagGroup>;
  tagGroupCollection?: Maybe<TagGroupCollection>;
  visitor?: Maybe<Visitor>;
  visitorCollection?: Maybe<VisitorCollection>;
};


export type QueryArticleArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryArticleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ArticleOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleFilter>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryIntroArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryIntroCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<IntroOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IntroFilter>;
};


export type QueryPickupArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryPickupCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PickupOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PickupFilter>;
};


export type QuerySkillGroupArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QuerySkillGroupCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<SkillGroupOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SkillGroupFilter>;
};


export type QuerySkillRatingArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QuerySkillRatingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<SkillRatingOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SkillRatingFilter>;
};


export type QueryTagArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryTagCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TagOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagFilter>;
};


export type QueryTagGroupArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryTagGroupCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TagGroupOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagGroupFilter>;
};


export type QueryVisitorArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryVisitorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<VisitorOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VisitorFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/skillGroup) */
export type SkillGroup = Entry & {
  __typename?: 'SkillGroup';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<SkillGroupLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/skillGroup) */
export type SkillGroupLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/skillGroup) */
export type SkillGroupTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type SkillGroupCollection = {
  __typename?: 'SkillGroupCollection';
  items: Array<Maybe<SkillGroup>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type SkillGroupFilter = {
  AND?: InputMaybe<Array<InputMaybe<SkillGroupFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SkillGroupFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type SkillGroupLinkingCollections = {
  __typename?: 'SkillGroupLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  skillRatingCollection?: Maybe<SkillRatingCollection>;
};


export type SkillGroupLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SkillGroupLinkingCollectionsSkillRatingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum SkillGroupOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/skillRating) */
export type SkillRating = Entry & {
  __typename?: 'SkillRating';
  contentfulMetadata: ContentfulMetadata;
  group?: Maybe<SkillGroup>;
  linkedFrom?: Maybe<SkillRatingLinkingCollections>;
  rating?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/skillRating) */
export type SkillRatingGroupArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/skillRating) */
export type SkillRatingLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/skillRating) */
export type SkillRatingRatingArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/skillRating) */
export type SkillRatingTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type SkillRatingCollection = {
  __typename?: 'SkillRatingCollection';
  items: Array<Maybe<SkillRating>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type SkillRatingFilter = {
  AND?: InputMaybe<Array<InputMaybe<SkillRatingFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SkillRatingFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  group?: InputMaybe<CfSkillGroupNestedFilter>;
  group_exists?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Int']>;
  rating_exists?: InputMaybe<Scalars['Boolean']>;
  rating_gt?: InputMaybe<Scalars['Int']>;
  rating_gte?: InputMaybe<Scalars['Int']>;
  rating_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  rating_lt?: InputMaybe<Scalars['Int']>;
  rating_lte?: InputMaybe<Scalars['Int']>;
  rating_not?: InputMaybe<Scalars['Int']>;
  rating_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type SkillRatingLinkingCollections = {
  __typename?: 'SkillRatingLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type SkillRatingLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum SkillRatingOrder {
  RatingAsc = 'rating_ASC',
  RatingDesc = 'rating_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/tag) */
export type Tag = Entry & {
  __typename?: 'Tag';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<TagLinkingCollections>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  tagGroup?: Maybe<TagGroup>;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/tag) */
export type TagLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/tag) */
export type TagSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/tag) */
export type TagTagGroupArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/tag) */
export type TagTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type TagCollection = {
  __typename?: 'TagCollection';
  items: Array<Maybe<Tag>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TagFilter = {
  AND?: InputMaybe<Array<InputMaybe<TagFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TagFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  tagGroup?: InputMaybe<CfTagGroupNestedFilter>;
  tagGroup_exists?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/tagGroup) */
export type TagGroup = Entry & {
  __typename?: 'TagGroup';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<TagGroupLinkingCollections>;
  sortNumber?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/tagGroup) */
export type TagGroupLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/tagGroup) */
export type TagGroupSortNumberArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/tagGroup) */
export type TagGroupTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type TagGroupCollection = {
  __typename?: 'TagGroupCollection';
  items: Array<Maybe<TagGroup>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TagGroupFilter = {
  AND?: InputMaybe<Array<InputMaybe<TagGroupFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TagGroupFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sortNumber?: InputMaybe<Scalars['Int']>;
  sortNumber_exists?: InputMaybe<Scalars['Boolean']>;
  sortNumber_gt?: InputMaybe<Scalars['Int']>;
  sortNumber_gte?: InputMaybe<Scalars['Int']>;
  sortNumber_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sortNumber_lt?: InputMaybe<Scalars['Int']>;
  sortNumber_lte?: InputMaybe<Scalars['Int']>;
  sortNumber_not?: InputMaybe<Scalars['Int']>;
  sortNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TagGroupLinkingCollections = {
  __typename?: 'TagGroupLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  tagCollection?: Maybe<TagCollection>;
};


export type TagGroupLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type TagGroupLinkingCollectionsTagCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum TagGroupOrder {
  SortNumberAsc = 'sortNumber_ASC',
  SortNumberDesc = 'sortNumber_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type TagLinkingCollections = {
  __typename?: 'TagLinkingCollections';
  articleCollection?: Maybe<ArticleCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type TagLinkingCollectionsArticleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type TagLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum TagOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/visitor) */
export type Visitor = Entry & {
  __typename?: 'Visitor';
  contentfulMetadata: ContentfulMetadata;
  disabled?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<VisitorLinkingCollections>;
  password?: Maybe<Scalars['String']>;
  sys: Sys;
  username?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/visitor) */
export type VisitorDisabledArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/visitor) */
export type VisitorLabelArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/visitor) */
export type VisitorLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/visitor) */
export type VisitorPasswordArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/t7esxj10x2zh/content_types/visitor) */
export type VisitorUsernameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type VisitorCollection = {
  __typename?: 'VisitorCollection';
  items: Array<Maybe<Visitor>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type VisitorFilter = {
  AND?: InputMaybe<Array<InputMaybe<VisitorFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<VisitorFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  disabled_exists?: InputMaybe<Scalars['Boolean']>;
  disabled_not?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  label_contains?: InputMaybe<Scalars['String']>;
  label_exists?: InputMaybe<Scalars['Boolean']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label_not?: InputMaybe<Scalars['String']>;
  label_not_contains?: InputMaybe<Scalars['String']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  password?: InputMaybe<Scalars['String']>;
  password_contains?: InputMaybe<Scalars['String']>;
  password_exists?: InputMaybe<Scalars['Boolean']>;
  password_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  password_not?: InputMaybe<Scalars['String']>;
  password_not_contains?: InputMaybe<Scalars['String']>;
  password_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  username?: InputMaybe<Scalars['String']>;
  username_contains?: InputMaybe<Scalars['String']>;
  username_exists?: InputMaybe<Scalars['Boolean']>;
  username_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  username_not?: InputMaybe<Scalars['String']>;
  username_not_contains?: InputMaybe<Scalars['String']>;
  username_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type VisitorLinkingCollections = {
  __typename?: 'VisitorLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type VisitorLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum VisitorOrder {
  DisabledAsc = 'disabled_ASC',
  DisabledDesc = 'disabled_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  PasswordAsc = 'password_ASC',
  PasswordDesc = 'password_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UsernameAsc = 'username_ASC',
  UsernameDesc = 'username_DESC'
}

export type CfSkillGroupNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfSkillGroupNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfSkillGroupNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CfTagGroupNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfTagGroupNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfTagGroupNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sortNumber?: InputMaybe<Scalars['Int']>;
  sortNumber_exists?: InputMaybe<Scalars['Boolean']>;
  sortNumber_gt?: InputMaybe<Scalars['Int']>;
  sortNumber_gte?: InputMaybe<Scalars['Int']>;
  sortNumber_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sortNumber_lt?: InputMaybe<Scalars['Int']>;
  sortNumber_lte?: InputMaybe<Scalars['Int']>;
  sortNumber_not?: InputMaybe<Scalars['Int']>;
  sortNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CfTagNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfTagNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfTagNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  tagGroup_exists?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ArticleWithRelatedFragment = { __typename?: 'Article', slug?: string | null, title?: string | null, excerpt?: string | null, content?: string | null, date?: any | null, dateEnd?: any | null, dateIsContinue?: boolean | null, company?: string | null, githubRepo?: string | null, relatedArticleCollection?: { __typename?: 'ArticleRelatedArticleCollection', items: Array<{ __typename?: 'Article', slug?: string | null, title?: string | null, excerpt?: string | null, content?: string | null, date?: any | null, dateEnd?: any | null, dateIsContinue?: boolean | null, company?: string | null, githubRepo?: string | null, image?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null, category?: { __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null, tagCollection?: { __typename?: 'ArticleTagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, sys: { __typename?: 'Sys', id: string, publishedAt?: any | null } } | null> } | null, image?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null, category?: { __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null, tagCollection?: { __typename?: 'ArticleTagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, sys: { __typename?: 'Sys', id: string, publishedAt?: any | null } };

export type ArticleFragment = { __typename?: 'Article', slug?: string | null, title?: string | null, excerpt?: string | null, content?: string | null, date?: any | null, dateEnd?: any | null, dateIsContinue?: boolean | null, company?: string | null, githubRepo?: string | null, image?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null, category?: { __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null, tagCollection?: { __typename?: 'ArticleTagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, sys: { __typename?: 'Sys', id: string, publishedAt?: any | null } };

export type IntroFragment = { __typename?: 'Intro', title?: string | null, content?: string | null, image?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null };

export type TagFragment = { __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } };

export type VisitorFragment = { __typename?: 'Visitor', username?: string | null, label?: string | null };

export type GetArticleCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticleCollectionQuery = { __typename?: 'Query', articleCollection?: { __typename?: 'ArticleCollection', items: Array<{ __typename?: 'Article', slug?: string | null, title?: string | null, excerpt?: string | null, content?: string | null, date?: any | null, dateEnd?: any | null, dateIsContinue?: boolean | null, company?: string | null, githubRepo?: string | null, image?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null, category?: { __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null, tagCollection?: { __typename?: 'ArticleTagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, sys: { __typename?: 'Sys', id: string, publishedAt?: any | null } } | null> } | null };

export type GetArticleFromSlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetArticleFromSlugQuery = { __typename?: 'Query', articleCollection?: { __typename?: 'ArticleCollection', items: Array<{ __typename?: 'Article', slug?: string | null, title?: string | null, excerpt?: string | null, content?: string | null, date?: any | null, dateEnd?: any | null, dateIsContinue?: boolean | null, company?: string | null, githubRepo?: string | null, image?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null, category?: { __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null, tagCollection?: { __typename?: 'ArticleTagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, sys: { __typename?: 'Sys', id: string, publishedAt?: any | null } } | null> } | null };

export type GetIntroCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIntroCollectionQuery = { __typename?: 'Query', introCollection?: { __typename?: 'IntroCollection', items: Array<{ __typename?: 'Intro', title?: string | null, content?: string | null, image?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null } | null> } | null };

export type GetPickupByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPickupByIdQuery = { __typename?: 'Query', pickup?: { __typename?: 'Pickup', title?: string | null, description?: string | null, articleCollection?: { __typename?: 'PickupArticleCollection', items: Array<{ __typename?: 'Article', slug?: string | null, title?: string | null, excerpt?: string | null, content?: string | null, date?: any | null, dateEnd?: any | null, dateIsContinue?: boolean | null, company?: string | null, githubRepo?: string | null, image?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null, category?: { __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null, tagCollection?: { __typename?: 'ArticleTagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, sys: { __typename?: 'Sys', id: string, publishedAt?: any | null } } | null> } | null } | null };

export type GetPickupIdCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPickupIdCollectionQuery = { __typename?: 'Query', pickupCollection?: { __typename?: 'PickupCollection', items: Array<{ __typename?: 'Pickup', sys: { __typename?: 'Sys', id: string } } | null> } | null };

export type GetRelatedArticleCollectionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRelatedArticleCollectionQuery = { __typename?: 'Query', article?: { __typename?: 'Article', relatedArticleCollection?: { __typename?: 'ArticleRelatedArticleCollection', items: Array<{ __typename?: 'Article', slug?: string | null, title?: string | null, excerpt?: string | null, content?: string | null, date?: any | null, dateEnd?: any | null, dateIsContinue?: boolean | null, company?: string | null, githubRepo?: string | null, image?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null, category?: { __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null, tagCollection?: { __typename?: 'ArticleTagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, sys: { __typename?: 'Sys', id: string, publishedAt?: any | null } } | null> } | null } | null };

export type GetSkillRatingCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSkillRatingCollectionQuery = { __typename?: 'Query', skillRatingCollection?: { __typename?: 'SkillRatingCollection', items: Array<{ __typename?: 'SkillRating', title?: string | null, rating?: number | null, group?: { __typename?: 'SkillGroup', title?: string | null } | null } | null> } | null };

export type GetTagCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagCollectionQuery = { __typename?: 'Query', tagCollection?: { __typename?: 'TagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };

export type GetTagFromSlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetTagFromSlugQuery = { __typename?: 'Query', tagCollection?: { __typename?: 'TagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };

export type GetTagGroupCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagGroupCollectionQuery = { __typename?: 'Query', tagGroupCollection?: { __typename?: 'TagGroupCollection', items: Array<{ __typename?: 'TagGroup', title?: string | null } | null> } | null };

export type GetTagWithArticlesQueryVariables = Exact<{
  tagId: Scalars['String'];
}>;


export type GetTagWithArticlesQuery = { __typename?: 'Query', tag?: { __typename?: 'Tag', slug?: string | null, title?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', articleCollection?: { __typename?: 'ArticleCollection', items: Array<{ __typename?: 'Article', slug?: string | null, title?: string | null, excerpt?: string | null, content?: string | null, date?: any | null, dateEnd?: any | null, dateIsContinue?: boolean | null, company?: string | null, githubRepo?: string | null, image?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null, category?: { __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null, tagCollection?: { __typename?: 'ArticleTagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, sys: { __typename?: 'Sys', id: string, publishedAt?: any | null } } | null> } | null } | null, sys: { __typename?: 'Sys', id: string } } | null };

export type GetTagWithGroupCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagWithGroupCollectionQuery = { __typename?: 'Query', tagCollection?: { __typename?: 'TagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, title?: string | null, tagGroup?: { __typename?: 'TagGroup', title?: string | null } | null, linkedFrom?: { __typename?: 'TagLinkingCollections', articleCollection?: { __typename?: 'ArticleCollection', total: number } | null } | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };

export type GetVisitorByPasswordQueryVariables = Exact<{
  password: Scalars['String'];
}>;


export type GetVisitorByPasswordQuery = { __typename?: 'Query', visitorCollection?: { __typename?: 'VisitorCollection', items: Array<{ __typename?: 'Visitor', username?: string | null, label?: string | null } | null> } | null };

export type GetVisitorByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetVisitorByUsernameQuery = { __typename?: 'Query', visitorCollection?: { __typename?: 'VisitorCollection', items: Array<{ __typename?: 'Visitor', username?: string | null, label?: string | null } | null> } | null };

export const TagFragmentDoc = gql`
    fragment tag on Tag {
  slug
  title
  sys {
    id
  }
}
    `;
export const ArticleFragmentDoc = gql`
    fragment article on Article {
  slug
  title
  excerpt
  content
  date
  dateEnd
  dateIsContinue
  company
  githubRepo
  image {
    title
    url
  }
  category {
    ...tag
  }
  tagCollection {
    items {
      ...tag
    }
  }
  sys {
    id
    publishedAt
  }
}
    ${TagFragmentDoc}`;
export const ArticleWithRelatedFragmentDoc = gql`
    fragment articleWithRelated on Article {
  ...article
  relatedArticleCollection {
    items {
      ...article
    }
  }
}
    ${ArticleFragmentDoc}`;
export const IntroFragmentDoc = gql`
    fragment intro on Intro {
  title
  content
  image {
    title
    url
  }
}
    `;
export const VisitorFragmentDoc = gql`
    fragment visitor on Visitor {
  username
  label
}
    `;
export const GetArticleCollectionDocument = gql`
    query getArticleCollection {
  articleCollection {
    items {
      ...article
    }
  }
}
    ${ArticleFragmentDoc}`;
export const GetArticleFromSlugDocument = gql`
    query getArticleFromSlug($slug: String!) {
  articleCollection(where: {slug: $slug}) {
    items {
      ...article
    }
  }
}
    ${ArticleFragmentDoc}`;
export const GetIntroCollectionDocument = gql`
    query getIntroCollection {
  introCollection {
    items {
      ...intro
    }
  }
}
    ${IntroFragmentDoc}`;
export const GetPickupByIdDocument = gql`
    query getPickupById($id: String!) {
  pickup(id: $id) {
    title
    description
    articleCollection {
      items {
        ...article
      }
    }
  }
}
    ${ArticleFragmentDoc}`;
export const GetPickupIdCollectionDocument = gql`
    query getPickupIdCollection {
  pickupCollection(order: sortNumber_ASC) {
    items {
      sys {
        id
      }
    }
  }
}
    `;
export const GetRelatedArticleCollectionDocument = gql`
    query getRelatedArticleCollection($id: String!) {
  article(id: $id) {
    relatedArticleCollection {
      items {
        ...article
      }
    }
  }
}
    ${ArticleFragmentDoc}`;
export const GetSkillRatingCollectionDocument = gql`
    query getSkillRatingCollection {
  skillRatingCollection {
    items {
      title
      rating
      group {
        title
      }
    }
  }
}
    `;
export const GetTagCollectionDocument = gql`
    query getTagCollection {
  tagCollection {
    items {
      ...tag
    }
  }
}
    ${TagFragmentDoc}`;
export const GetTagFromSlugDocument = gql`
    query getTagFromSlug($slug: String!) {
  tagCollection(where: {slug: $slug}) {
    items {
      ...tag
    }
  }
}
    ${TagFragmentDoc}`;
export const GetTagGroupCollectionDocument = gql`
    query getTagGroupCollection {
  tagGroupCollection(order: sortNumber_ASC) {
    items {
      title
    }
  }
}
    `;
export const GetTagWithArticlesDocument = gql`
    query getTagWithArticles($tagId: String!) {
  tag(id: $tagId) {
    ...tag
    linkedFrom {
      articleCollection {
        items {
          ...article
        }
      }
    }
  }
}
    ${TagFragmentDoc}
${ArticleFragmentDoc}`;
export const GetTagWithGroupCollectionDocument = gql`
    query getTagWithGroupCollection {
  tagCollection {
    items {
      ...tag
      tagGroup {
        title
      }
      linkedFrom {
        articleCollection {
          total
        }
      }
    }
  }
}
    ${TagFragmentDoc}`;
export const GetVisitorByPasswordDocument = gql`
    query getVisitorByPassword($password: String!) {
  visitorCollection(where: {password: $password, disabled: false}) {
    items {
      ...visitor
    }
  }
}
    ${VisitorFragmentDoc}`;
export const GetVisitorByUsernameDocument = gql`
    query getVisitorByUsername($username: String!) {
  visitorCollection(where: {username: $username, disabled: false}) {
    items {
      ...visitor
    }
  }
}
    ${VisitorFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getArticleCollection(variables?: GetArticleCollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetArticleCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetArticleCollectionQuery>(GetArticleCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getArticleCollection', 'query');
    },
    getArticleFromSlug(variables: GetArticleFromSlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetArticleFromSlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetArticleFromSlugQuery>(GetArticleFromSlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getArticleFromSlug', 'query');
    },
    getIntroCollection(variables?: GetIntroCollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetIntroCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetIntroCollectionQuery>(GetIntroCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getIntroCollection', 'query');
    },
    getPickupById(variables: GetPickupByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPickupByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPickupByIdQuery>(GetPickupByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPickupById', 'query');
    },
    getPickupIdCollection(variables?: GetPickupIdCollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPickupIdCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPickupIdCollectionQuery>(GetPickupIdCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPickupIdCollection', 'query');
    },
    getRelatedArticleCollection(variables: GetRelatedArticleCollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRelatedArticleCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRelatedArticleCollectionQuery>(GetRelatedArticleCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRelatedArticleCollection', 'query');
    },
    getSkillRatingCollection(variables?: GetSkillRatingCollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetSkillRatingCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSkillRatingCollectionQuery>(GetSkillRatingCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSkillRatingCollection', 'query');
    },
    getTagCollection(variables?: GetTagCollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTagCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagCollectionQuery>(GetTagCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTagCollection', 'query');
    },
    getTagFromSlug(variables: GetTagFromSlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTagFromSlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagFromSlugQuery>(GetTagFromSlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTagFromSlug', 'query');
    },
    getTagGroupCollection(variables?: GetTagGroupCollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTagGroupCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagGroupCollectionQuery>(GetTagGroupCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTagGroupCollection', 'query');
    },
    getTagWithArticles(variables: GetTagWithArticlesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTagWithArticlesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagWithArticlesQuery>(GetTagWithArticlesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTagWithArticles', 'query');
    },
    getTagWithGroupCollection(variables?: GetTagWithGroupCollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTagWithGroupCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagWithGroupCollectionQuery>(GetTagWithGroupCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTagWithGroupCollection', 'query');
    },
    getVisitorByPassword(variables: GetVisitorByPasswordQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetVisitorByPasswordQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVisitorByPasswordQuery>(GetVisitorByPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVisitorByPassword', 'query');
    },
    getVisitorByUsername(variables: GetVisitorByUsernameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetVisitorByUsernameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVisitorByUsernameQuery>(GetVisitorByUsernameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVisitorByUsername', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;