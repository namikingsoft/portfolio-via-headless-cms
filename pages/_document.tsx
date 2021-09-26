import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    const { NEXT_PUBLIC_GTAG_ID } = process.env
    return (
      <Html lang="en">
        <Head>
          {NEXT_PUBLIC_GTAG_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GTAG_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${NEXT_PUBLIC_GTAG_ID}');
                  `.replace(/\r?\n\s*/gs, ''),
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
