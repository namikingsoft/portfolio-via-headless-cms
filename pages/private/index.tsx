import Head from 'next/head'
import jimp from 'jimp'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { FaGithub } from 'react-icons/fa'
import cn from 'classnames'
import { siteName, siteDescription } from '../../lib/constants'
import {
  Intro,
  Pickup,
  TagGroup,
  SkillGroup,
  SkillRating,
} from '../../schemas/contentful/types'
import {
  getIntro,
  getPickups,
  getSkillGroupList,
  getSkillRatingList,
  getTagGroupList,
} from '../../schemas/contentful'
import Block from '../../components/block'
import Container from '../../components/container'
import Markdown from '../../components/markdown'
import FillImage from '../../components/fill-image'
import ArticleList from '../../components/article-list'
import TagGroupList from '../../components/tag-group-list'
import SkillGroupList from '../../components/skill-group-list'
import FeatureList from '../../components/feature-list'
import markdownToHtml from '../../lib/markdownToHtml'
import TitleDescription from '../../components/title-description'
import styles from './index.module.css'

type Props = {
  intro: Intro & {
    backgroundImageBlurDataUri: string
    portraitImageBlurDataUri: string
  }
  pickups: Pickup[]
  tagGroups: TagGroup[]
  skillGroups: SkillGroup[]
  skillRatings: SkillRating[]
}

const Index = ({
  intro,
  pickups,
  tagGroups,
  skillGroups,
  skillRatings,
}: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{`${siteName} | ${siteDescription}`}</title>
      </Head>

      <Block className="w-screen h-screen relative">
        <FillImage
          src={intro.backgroundImage.url}
          alt={intro.backgroundImage.alt}
          width={intro.backgroundImage.width}
          height={intro.backgroundImage.height}
          blurSrc={intro.backgroundImageBlurDataUri}
          className={cn(
            'w-screen h-screen absolute shadow-medium -z-10',
            styles.animateFilterRemoval,
          )}
          priority
        />
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-2 absolute bottom-0 md:bottom-16 left-0 px-20 py-14 backdrop-blur-sm bg-opacity-75 bg-black text-white">
          <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-snug font-bold mb-6 drop-shadow-sm">
            {intro.catchTitle}
          </h2>
          <Markdown
            type="lite"
            className={cn(
              'sm:text-lg leading-relaxed drop-shadow',
              styles.animateStrong,
            )}
          >
            {intro.catchDescription}
          </Markdown>
        </div>
      </Block>

      <Block>
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-16 xl:gap-x-20">
          <div>
            <div className="relative p-1 overflow-hidden shadow-medium">
              <FillImage
                src={intro.portraitImage.url}
                alt={intro.portraitImage.alt}
                width={intro.portraitImage.width}
                height={intro.portraitImage.height}
                blurSrc={intro.portraitImageBlurDataUri}
                priority
                className="aspect-video lg:aspect-square"
              />
              <a
                href={intro.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-1.5 font-bold text-md bg-black hover:bg-accent-500 transition shadow-md -rotate-45 text-white absolute top-12 -left-12 border-t border-b border-white w-56"
              >
                <FaGithub className="text-xl" />
                GitHub
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-4xl sm:text-6xl font-bold inline-flex flex-row-reverse gap-9">
                <ruby>
                  {intro.firstName}
                  <rt className="font-normal text-sm">{intro.firstNameRuby}</rt>
                </ruby>
                <ruby>
                  {intro.lastName}
                  <rt className="font-normal text-sm">{intro.lastNameRuby}</rt>
                </ruby>
              </h2>
              <div className="block border-t border-gray-500 text-gray-500 text-sm pt-1 mt-1">
                {intro.position}
              </div>
            </div>
            <Markdown type="lite" className="text-lg leading-relaxed">
              {intro.content}
            </Markdown>
          </div>
        </Container>
      </Block>

      <Block>
        <Container>
          <TitleDescription
            title={intro.featureTitle}
            description={intro.featureDescription}
          />
          <FeatureList features={intro.features} />
        </Container>
      </Block>

      <Block>
        <Container>
          <h2 className="hidden">{t('skills')}</h2>
          <SkillGroupList
            skillGroups={skillGroups}
            skillRatings={skillRatings}
          />
        </Container>
      </Block>

      {pickups.map((pickup) => (
        <Block key={pickup.title}>
          <Container>
            <TitleDescription
              title={pickup.title}
              description={pickup.description}
            />
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

const createDataUriBlurImage = async (url: string): Promise<string> => {
  const image = await jimp.read(url)
  return image.resize(64, jimp.AUTO).blur(1).getBase64Async(jimp.MIME_PNG)
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const intro = await getIntro()
  const pickups = await getPickups()
  const tagGroups = await getTagGroupList()
  const skillGroups = await getSkillGroupList()
  const skillRatings = await getSkillRatingList()
  return {
    props: {
      intro: {
        ...intro,
        content: await markdownToHtml(intro.content),
        catchDescription: await markdownToHtml(intro.catchDescription),
        featureDescription: await markdownToHtml(intro.featureDescription),
        backgroundImageBlurDataUri: await createDataUriBlurImage(
          intro.backgroundImage.url,
        ),
        portraitImageBlurDataUri: await createDataUriBlurImage(
          intro.portraitImage.url,
        ),
      },
      pickups: await Promise.all(
        pickups.map(async (pickup) => ({
          ...pickup,
          description: await markdownToHtml(pickup.description),
        })),
      ),
      tagGroups,
      skillGroups,
      skillRatings,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
