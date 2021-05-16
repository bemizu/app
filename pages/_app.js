import "../styles/globals.css";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import theme from "../public/theme";



function App({ Component, pageProps  }) {
  return (
    <Auth0Provider
      domain={`${process.env.AUTH0_DOMAIN}`}
      clientId={`${process.env.AUTH0_CLIENT_ID}`}
      redirectUri={ [`${process.env.AUTH0_REDIRECT}`, "https://business.bemizu.app/" ][0] }
    >
    {/* <AuthProvider session={pageProps.session}> */}
      <ChakraProvider theme={ theme }>
        <Component {...pageProps} />
      </ChakraProvider>
      {/* </AuthProvider> */}
    </Auth0Provider>
  );
}

export default App;


App.getServerSideProps = async ({ req }) => {
  const subdomain = req.headers.host.split('.')[0];
  return { subdomain };
};