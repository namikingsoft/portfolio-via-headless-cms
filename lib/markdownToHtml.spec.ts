import markdownToHtml from './markdownToHtml'

test('image with dimension', async () => {
  const html = await markdownToHtml(`![img {640x480}](//example.com/test.png)`)
  expect(html).toMatchSnapshot()
})

test('image without dimension', async () => {
  const html = await markdownToHtml(`![img](//example.com/test.png)`)
  expect(html).toMatchSnapshot()
})
