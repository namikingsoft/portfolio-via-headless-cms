export const pagesPath = {
  "private": {
    "articles": {
      _slug: (slug: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/private/articles/[slug]' as const, query: { slug }, hash: url?.hash })
      })
    },
    "tags": {
      _slug: (slug: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/private/tags/[slug]' as const, query: { slug }, hash: url?.hash })
      })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/private' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
