import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../utils/analytics'
import { GoogleFonts } from "next-google-fonts";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>


          <GoogleFonts href="https://fonts.googleapis.com/css2?family=Lato&family=Roboto&family=Roboto+Mono&display=swap" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

          <meta property="og:title" content="Bemizu" />
          <meta property="og:description" content="Talent sourcing for all your hiring needs." />
          <meta property="og:image" content="https://bemizu.app/social.jpg" />
          <meta property="og:url" content="https://bemizu.app/" />


          <meta name="twitter:title" content="Bemizu" />
          <meta name="twitter:description" content="Talent sourcing for all your hiring needs." />
          <meta name="twitter:image" content="http://bemizu.app/social.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}