import Onboarding from "./Onboarding";
import Loading from "./Loading";
import Home from "./Home";
import Session from "../../contexts/session";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {GetUser} from "../../utils/getUser";

function Logged() {
  const [ loading, setLoading ] = useState( true );
  const session = Session(state => state);
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
      const { data, error } = await session.supabase
        .from("business_users")
        .insert([{ email: user.email, auth0: user.sub }]);
    }

    setLoading( false );
  }, []);

  if ( loading ) {
    return <Loading />
  } else if ( session.user && session.user.onboarded ) {
    return <Home />;
  } else {
    return <Onboarding />;
  }
}

export default Logged;
