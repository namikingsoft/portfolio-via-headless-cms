import Head from 'next/head'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Intro, Pickup, TagGroup } from '../../schemas/contentful/types'
import {
  getIntroList,
  getPickups,
  getTagGroupList,
} from '../../schemas/contentful'
import Section from '../../components/section'
import Container from '../../components/container'
import CoverImage from '../../components/cover-image'
import CoverImageBlock from '../../components/cover-image-block'
import ArticleList from '../../components/article-list'
import TagGroupList from '../../components/tag-group-list'
import Heading from '../../components/heading'

type Props = {
  intros: Intro[]
  pickups: Pickup[]
  tagGroups: TagGroup[]
}

const Index = ({ intros, pickups, tagGroups }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>
          {t('siteName')} | {t('siteDescription')}
        </title>
      </Head>
      {intros.length > 0 &&
        intros.map((intro) => (
          <Section key={intro.title}>
            <CoverImageBlock>
              <CoverImage src={intro.image.url} alt={intro.image.alt} />
            </CoverImageBlock>
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
          </Section>
        ))}
      {pickups.map((pickup) => (
        <Section key={pickup.title}>
          <Container>
            <Heading as="h2">{pickup.title}</Heading>
            {pickup.articles.length > 0 && (
              <ArticleList articles={pickup.articles} />
            )}
          </Container>
        </Section>
      ))}

      <Section>
        <Container>
          <TagGroupList tagGroups={tagGroups} />
        </Container>
      </Section>
    </>
  )
}

export default Index

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const intros = await getIntroList()
  const pickups = await getPickups()
  const tagGroups = await getTagGroupList()
  return {
    props: {
      intros,
      pickups,
      tagGroups,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
