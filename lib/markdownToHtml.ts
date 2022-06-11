import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import gfm from 'remark-gfm'
import math from 'remark-math'
import emoji from 'remark-emoji'
import simplePlantUML from '@akebifiky/remark-simple-plantuml'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(gfm)
    .use(math)
    .use(simplePlantUML)
    .use(emoji)
    .use(prism)
    .use(html, { sanitize: false })
    .process(markdown)
  return result.toString()
}
