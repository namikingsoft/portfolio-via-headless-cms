import { unified } from 'unified'
import { createElement, Fragment } from 'react'
import { renderToString } from 'react-dom/server'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'
import rehypeRaw from 'rehype-raw'
import remarkPrism from 'remark-prism'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import remarkMath from 'remark-math'
import remarkHtmlKatex from 'remark-html-katex'
import remarkEmoji from 'remark-emoji'
import remarkSimplePlantUML from '@akebifiky/remark-simple-plantuml'
import ImageOnMarkdown from '../components/image-on-markdown'

export default async function markdownToHtml(
  markdown: string,
): Promise<string> {
  const { result } = await unified()
    .use(remarkGfm)
    .use(remarkToc, { heading: 'toc|TOC|Table of Contents|目次', maxDepth: 2 })
    .use(remarkMath)
    .use(remarkHtmlKatex)
    .use(remarkSimplePlantUML)
    .use(remarkEmoji)
    .use(remarkPrism)
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true }) // cms content only
    .use(rehypeRaw)
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        img: ImageOnMarkdown,
      },
    })
    .process(markdown)

  return renderToString(result)
}
