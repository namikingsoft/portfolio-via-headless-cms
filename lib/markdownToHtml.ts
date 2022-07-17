import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkPrism from 'remark-prism'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import remarkMath from 'remark-math'
import remarkHtmlKatex from 'remark-html-katex'
import remarkEmoji from 'remark-emoji'
import remarkSimplePlantUML from '@akebifiky/remark-simple-plantuml'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkToc, { heading: 'toc|TOC|Table of Contents|目次', maxDepth: 2 })
    .use(remarkMath)
    .use(remarkHtmlKatex)
    .use(remarkSimplePlantUML)
    .use(remarkEmoji)
    .use(remarkPrism)
    .use(remarkHtml, { sanitize: false }) // cms content only
    .process(markdown)
  return result.toString()
}
