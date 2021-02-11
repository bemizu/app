import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import userbase from 'userbase-js';
import { useState, useEffect  } from "react";

import Session from "../contexts/session";

function App ({ Component, pageProps  }) {
  const [loading, setLoading] = useState( true );
  const session = Session( state => state );

  useEffect( () => {
    userbase.init({ appId: `9647171f-9f97-44c6-9fa6-2cc9c3217152` }).then( (data) => {
      session.setSession( data );
      session.setUser( data.user );
      setLoading( false );
      console.log( data );
    });
    
  }, []);

  return <ChakraProvider>
    <Component {...pageProps} loading={ loading } />
  </ChakraProvider>

}

export default App

