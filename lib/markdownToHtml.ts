import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import simplePlantUML from '@akebifiky/remark-simple-plantuml'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(simplePlantUML)
    .use(prism)
    .use(html, { sanitize: false })
    .process(markdown)
  return result.toString()
}
