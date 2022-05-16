export const gtagId = process.env.NEXT_PUBLIC_GTAG_ID
export const contentfulEndpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`
export const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN!
export const visitorTokenSignerKey128 =
  process.env.VISITOR_TOKEN_SIGNER_KEY_128!
export const visitorTokenCryptoKey128 =
  process.env.VISITOR_TOKEN_CRYPTO_KEY_128!
