import "../styles/globals.css";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as AuthProvider } from 'next-auth/client'
import theme from "../public/theme";
import Session from "../contexts/session";
import { createClient } from "@supabase/supabase-js";
import { useAuth0 } from "@auth0/auth0-react";

function App({ Component, pageProps }) {
  const [ first, setFirst ] = useState( true )
  const session = Session( state => state );
  const { user, isLoading } = useAuth0();

  useEffect( () => {
    if ( first ) {
      setFirst( false )
      session.setLoadingFalse();

      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_PUBLIC_ANON
      );

      session.setSupabase( supabase )
    }
  }, [])

  return (
    <Auth0Provider
      domain={`${process.env.AUTH0_DOMAIN}`}
      clientId={`${process.env.AUTH0_CLIENT_ID}`}
      redirectUri={ `${process.env.AUTH0_REDIRECT}` }
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
