import Document, { Html, Head, Main, NextScript } from 'next/document'
import { gtagId } from '../env'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/brands.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
            integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
            crossOrigin="anonymous"
          />
          {gtagId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtagId}');
                  `.replace(/\r?\n\s*/gs, ''),
                }}
              />
            </>
          )}
        </Head>
        <body className="bg-stone-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
