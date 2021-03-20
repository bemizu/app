import Onboarding from "./Onboarding";
import Loading from "./Loading";
import Home from "./Home";
import Session from "../../contexts/session";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Logged() {
  const [ loading, setLoading ] = useState( true );
  const session = Session((state) => state);
  const { user } = useAuth0();

  // get user from Supabase

  useEffect(async () => {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_PUBLIC_ANON
    );

    const { data, error } = await supabase
      .from("users")
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
      const { data, error } = await supabase
        .from("users")
        .insert([{ email: user.email, auth0: user.sub }]);
    }

    console.log(data);
    console.log(user);
    setLoading( false );

    // const { data, error } = await supabase
    //   .from("SurveyResponsesEmployees")
    //   .insert([
    //     {
    //       name,
    //       email: props.email,
    //       skills,
    //       years,
    //       education,
    //     },
    //   ]);
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
