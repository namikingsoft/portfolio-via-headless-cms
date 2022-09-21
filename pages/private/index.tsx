import Head from 'next/head'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  Intro,
  Pickup,
  TagGroup,
  SkillRating,
} from '../../schemas/contentful/types'
import {
  getIntroList,
  getPickups,
  getSkillRatingList,
  getTagGroupList,
} from '../../schemas/contentful'
import Block from '../../components/block'
import Container from '../../components/container'
import CoverImage from '../../components/cover-image'
import ArticleList from '../../components/article-list'
import TagGroupList from '../../components/tag-group-list'
import Heading from '../../components/heading'

type Props = {
  intros: Intro[]
  pickups: Pickup[]
  tagGroups: TagGroup[]
  skillRatings: SkillRating[]
}

const Index = ({ intros, pickups, tagGroups, skillRatings }: Props) => {
  const { t } = useTranslation()

  console.log('skillRatings', skillRatings)

  return (
    <>
      <Head>
        <title>
          {t('siteName')} | {t('siteDescription')}
        </title>
      </Head>
      {intros.length > 0 &&
        intros.map((intro) => (
          <Block key={intro.title}>
            <Block>
              <CoverImage src={intro.image.url} alt={intro.image.alt} />
            </Block>
            <Container>
              <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                  <Heading as="h2">{intro.title}</Heading>
                </div>
                <div>
                  <p className="text-lg leading-relaxed mb-4">
                    {intro.content}
                  </p>
                </div>
              </div>
            </Container>
          </Block>
        ))}
      {pickups.map((pickup) => (
        <Block key={pickup.title}>
          <Container>
            <Heading as="h2">{pickup.title}</Heading>
            {pickup.articles.length > 0 && (
              <ArticleList articles={pickup.articles} />
            )}
          </Container>
        </Block>
      ))}

      <Block>
        <Container>
          <TagGroupList tagGroups={tagGroups} />
        </Container>
      </Block>
    </>
  )
}

export default Index

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const intros = await getIntroList()
  const pickups = await getPickups()
  const tagGroups = await getTagGroupList()
  const skillRatings = await getSkillRatingList()
  return {
    props: {
      intros,
      pickups,
      tagGroups,
      skillRatings,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
