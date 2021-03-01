import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../utils/analytics'
import { GoogleFonts } from "next-google-fonts";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>


          <GoogleFonts href="https://fonts.googleapis.com/css2?family=Lato&display=swap" />
          <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" />
          <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" />
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
        </Head>
        <body>

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}