import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import userbase from 'userbase-js';
import { useState, useEffect  } from "react";

function App ({ Component, pageProps  }) {
  const [user, setUser] = useState();
  const [ session, setSession ] = useState();


  useEffect( () => {
    userbase.init({ appId: `9647171f-9f97-44c6-9fa6-2cc9c3217152` }).then( (data) => {
      setSession( data );
      console.log( data );
    });
    
  }, []);

  return <ChakraProvider>
    <Component {...pageProps} user={user} setUser={ setUser } session={ session } />
  </ChakraProvider>

}

export default App

