/**
 * @jest-environment jsdom
 */

/* eslint-disable @next/next/no-img-element -- for test */

import { render, fireEvent } from '@testing-library/react'
import useZoomImage from './use-zoom-image'

const Usage = () => {
  const zoomImage = useZoomImage('a[href$=".png"]')

  return (
    <>
      <a href="https://example.com/test.png" data-testid="link1">
        <img src="https://example.com/test.png" alt="test1" />
      </a>
      <a href="https://example.com/test.png" data-testid="link2">
        <img src="https://example.com/different.png" alt="test2" />
      </a>
      <a href="https://example.com/test.gif" data-testid="link3">
        <img src="https://example.com/test.gif" alt="test3" />
      </a>
      {zoomImage}
    </>
  )
}

test('useZoomImage', () => {
  const { getByTestId } = render(<Usage />)

  const link1 = getByTestId('link1') as HTMLAnchorElement
  const link2 = getByTestId('link2') as HTMLAnchorElement
  const link3 = getByTestId('link3') as HTMLAnchorElement
  const findZoomImage = (): HTMLImageElement =>
    document.body.querySelector('img[alt="Zoom Image"]')!

  expect(link1.className).toBe('cursor-zoom-in')
  expect(findZoomImage()).toBeNull()

  fireEvent.click(link1)

  expect(findZoomImage()).not.toBeNull()
  expect(findZoomImage().src).toBe('https://example.com/test.png')

  fireEvent.click(findZoomImage())

  expect(findZoomImage()).toBeNull()

  fireEvent.click(link2)

  expect(findZoomImage()).not.toBeNull()
  expect(findZoomImage().src).toBe('https://example.com/different.png')

  fireEvent.click(findZoomImage())

  expect(findZoomImage()).toBeNull()

  fireEvent.click(link3)

  expect(findZoomImage()).toBeNull()
})
