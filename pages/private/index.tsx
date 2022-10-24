import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { MdOutlineArticle } from 'react-icons/md'
import {
  Intro,
  Pickup,
  TagGroup,
  SkillGroup,
} from '../../schemas/contentful/types'
import {
  getIntro,
  getPickups,
  getSkillGroupList,
  getTagGroupList,
} from '../../schemas/contentful'
import { pagesPath } from '../../lib/$path'
import Block from '../../components/block'
import Container from '../../components/container'
import Markdown from '../../components/markdown'
import ArticleList from '../../components/article-list'
import TagGroupList from '../../components/tag-group-list'
import Heading from '../../components/heading'
import SkillGroupList from '../../components/skill-group-list'
import FeatureList from '../../components/feature-list'
import markdownToHtml from '../../lib/markdownToHtml'

type Props = {
  intro: Intro
  pickups: Pickup[]
  tagGroups: TagGroup[]
  skillGroups: SkillGroup[]
}

const Index = ({ intro, pickups, tagGroups, skillGroups }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>
          {t('siteName')} | {t('siteDescription')}
        </title>
      </Head>

      <Block>
        <Block>
          <img
            src={intro.image.url}
            alt={intro.image.alt}
            className="sepia contrast-50 brightness-110 object-cover object-top aspect-video shadow-medium"
          />
        </Block>
        <Container>
          <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
            <div>
              <Heading as="h2">{intro.title}</Heading>
            </div>
            <div className="text-lg leading-relaxed">
              <Markdown content={intro.content} />
            </div>
          </div>
        </Container>
      </Block>

      <Block>
        <Container>
          <FeatureList features={intro.features} />
        </Container>
      </Block>

      <Block>
        <Container>
          <h2 className="hidden">{t('skills')}</h2>
          <SkillGroupList skillGroups={skillGroups} />
        </Container>
      </Block>

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

      <Block>
        <Container>
          <div className="text-center">
            <Link href={pagesPath.private.articles.$url()}>
              <a className="inline-flex gap-2 items-center border border-stone-200 px-12 py-5 bg-white hover:bg-slate-50">
                <MdOutlineArticle className="inline" size={20} />
                {t('allArticles')}
              </a>
            </Link>
          </div>
        </Container>
      </Block>
    </>
  )
}

export default Index

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const intro = await getIntro()
  const pickups = await getPickups()
  const tagGroups = await getTagGroupList()
  const skillGroups = await getSkillGroupList()
  return {
    props: {
      intro: {
        ...intro,
        content: await markdownToHtml(intro.content),
      },
      pickups,
      tagGroups,
      skillGroups,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
