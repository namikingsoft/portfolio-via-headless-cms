import Document, { Html, Head, Main, NextScript } from 'next/document'
import { gtagId } from '../env'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
        <body className="base">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
