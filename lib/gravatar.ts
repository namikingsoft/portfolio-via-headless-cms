import md5 from 'blueimp-md5'

export const calcGravatarUrl = (email: string, size: number): string =>
  `https://www.gravatar.com/avatar/${md5(email)}?s=${size}&d=mp`
