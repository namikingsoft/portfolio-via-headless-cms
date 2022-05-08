import { remark } from 'remark'
import html from 'remark-html'
import simplePlantUML from '@akebifiky/remark-simple-plantuml'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(simplePlantUML)
    .process(markdown)
  return result.toString()
}
