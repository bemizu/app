import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as AuthProvider } from 'next-auth/client'


function App({ Component, pageProps }) {

  return (
    // <Auth0Provider
    //   domain={`${process.env.AUTH0_DOMAIN}`}
    //   clientId={`${process.env.AUTH0_CLIENT_ID}`}
    //   redirectUri={"http://localhost:3000/"}
    // >
    <AuthProvider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      </AuthProvider>
    // </Auth0Provider>
  );
}

export default App;
