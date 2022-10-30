import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { MdOutlineArticle } from 'react-icons/md'
import { FaGithub } from 'react-icons/fa'
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
import FillImage from '../../components/fill-image'
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
        <title>{`${t('siteName')} | ${t('siteDescription')}`}</title>
      </Head>

      <Block>
        <FillImage
          src={intro.backgroundImage.url}
          alt={intro.backgroundImage.alt}
          width={intro.backgroundImage.width}
          height={intro.backgroundImage.height}
          className="w-screen h-screen sepia contrast-50 brightness-110 shadow-medium -z-10"
          objectPosition="center"
        />
        <Container>
          <div className="relative z-10 -mt-72 md:-mt-64 p-0.5 overflow-hidden">
            <div className="md:grid lg:grid-cols-2 md:gap-x-16 lg:gap-x-16 bg-white p-12 sm:p-16 rounded-xl shadow-lg">
              <div>
                <FillImage
                  src={intro.portraitImage.url}
                  alt={intro.portraitImage.alt}
                  width={intro.portraitImage.width}
                  height={intro.portraitImage.height}
                  className="shadow-medium aspect-video lg:aspect-square xl:aspect-video -mt-2 -ml-2 sm:-mt-7 sm:-ml-7"
                />
                <a
                  href={intro.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-1.5 font-bold text-md bg-black hover:bg-teal-500 transition shadow-md -rotate-45 text-white absolute top-12 -left-12 border-t border-b border-white w-56"
                >
                  <FaGithub className="text-xl" />
                  GitHub
                </a>
                <h2 className="text-4xl sm:text-6xl font-bold inline-flex flex-row-reverse gap-9 mt-12 mb-10">
                  <ruby>
                    {intro.firstName}
                    <rt>{intro.firstNameRuby}</rt>
                  </ruby>
                  <ruby>
                    {intro.lastName}
                    <rt>{intro.lastNameRuby}</rt>
                  </ruby>
                </h2>
              </div>
              <div className="text-lg leading-relaxed">
                <Markdown content={intro.content} />
              </div>
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
            <Link
              className="inline-flex gap-2 items-center border border-stone-200 px-12 py-5 bg-white hover:bg-slate-50"
              href={pagesPath.private.articles.$url()}
            >
              <MdOutlineArticle className="inline" size={20} />
              {t('allArticles')}
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
