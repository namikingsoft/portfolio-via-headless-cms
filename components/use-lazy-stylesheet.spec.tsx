/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import useLazyStylesheet from './use-lazy-stylesheet'

const Usage = () => {
  useLazyStylesheet({
    href: 'https://example.com/style1.css',
  })
  useLazyStylesheet({
    href: 'https://example.com/style2.css',
    integrity: 'sha1-style2',
    crossOrigin: 'anonymous',
  })
  useLazyStylesheet({
    href: 'https://example.com/style1.css',
    integrity: 'sha1-style1',
    crossOrigin: 'anonymous',
  })

  return <>something page</>
}

test('useLazyStylesheet', () => {
  render(<Usage />)

  const links = document.head.querySelectorAll('link')

  expect(links[0].outerHTML).toEqual(
    '<link rel="stylesheet" type="text/css" href="https://example.com/style1.css">',
  )
  expect(links[1].outerHTML).toEqual(
    '<link rel="stylesheet" type="text/css" href="https://example.com/style2.css" crossorigin="anonymous">',
  )
  expect(links[2]).toBeUndefined()
})
