import { calcGravatarUrl } from './gravatar'

describe('calcGravatarUrl', () => {
  it('should return gravatar url', () => {
    expect(calcGravatarUrl('info@example.com', 100)).toBe(
      'https://www.gravatar.com/avatar/cb3045d1eb66dda5eae9ae2f96edeee9?s=100&d=mp',
    )
  })
})
