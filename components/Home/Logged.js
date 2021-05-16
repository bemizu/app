import Onboarding from "./Onboarding";
import Loading from "./Loading";
import Home from "./Home";
import Session from "../../contexts/session";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {GetUser} from "../../utils/getUser";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLIC_ANON
);


function Logged() {
  const session = Session(state => state);
  const [ loading, setLoading ] = useState( true );
  const { user } = useAuth0();

  


  useEffect(async () => {
    const { data, error } = await session.supabase
      .from("business_users")
      .select(
        `
      id,
      email, 
      onboarded
    `
      )
      .eq("email", user.email);

    if (!error && data.length) {
        session.setUser( data[0] );
    } else if (!error) {
      const newUserReq = await session.supabase
        .from("business_users")
        .insert([{ email: user.email, auth0: user.sub }]);
        
        if ( !newUserReq.error ) {
          session.setUser( newUserReq.data[0] );
        }

        console.log( newUserReq );

    }

    setLoading( false );
  }, []);

  if ( loading ) {
    return <Loading />
  } else {
    return <Home />;
  } 
}

export default Logged;
