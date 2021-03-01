import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as AuthProvider } from 'next-auth/client'
import theme from "../public/theme";

function App({ Component, pageProps }) {

  let returnUrl = process.env.development ? "http://localhost:3000/" : "https://bemizu.app/";
  return (
    <Auth0Provider
      domain={`${process.env.AUTH0_DOMAIN}`}
      clientId={`${process.env.AUTH0_CLIENT_ID}`}
      redirectUri={ returnUrl }
    >
    <AuthProvider session={pageProps.session}>
      <ChakraProvider theme={ theme }>
        <Component {...pageProps} />
      </ChakraProvider>
      </AuthProvider>
    </Auth0Provider>
  );
}

export default App;
