import "../styles/globals.css";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as AuthProvider } from 'next-auth/client'
import theme from "../public/theme";
import Session from "../contexts/session";


function App({ Component, pageProps }) {
  const [ first, setFirst ] = useState( true )
  const session = Session( state => state );
  

  useEffect( () => {
    if ( first ) {
      setFirst( false )
      session.setLoadingFalse();
    }
  }, [])

  return (
    <Auth0Provider
      domain={`${process.env.AUTH0_DOMAIN}`}
      clientId={`${process.env.AUTH0_CLIENT_ID}`}
      redirectUri={ "https://bemizu.app/" }
      // redirectUri={ "http://localhost:3000/" }
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
