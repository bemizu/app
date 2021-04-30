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



      <link rel='manifest' href='/manifest.json' />
      <link href='icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
      <link rel='apple-touch-icon' href='icons/apple-icon.png'></link>

      <script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDixXZq9Kdeq-3cpsb1p0XgMQmVjkEvkRU&libraries=places">
</script>


        </Head>
        <body>


          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}
