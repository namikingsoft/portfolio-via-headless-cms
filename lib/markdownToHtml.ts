import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import gfm from 'remark-gfm'
import toc from 'remark-toc'
import math from 'remark-math'
import katex from 'remark-html-katex'
import emoji from 'remark-emoji'
import simplePlantUML from '@akebifiky/remark-simple-plantuml'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(gfm)
    .use(toc, { heading: 'toc|TOC|Table of Contents|目次', maxDepth: 2 })
    .use(math)
    .use(katex)
    .use(simplePlantUML)
    .use(emoji)
    .use(prism)
    .use(html, { sanitize: false }) // cms content only
    .process(markdown)
  return result.toString()
}
