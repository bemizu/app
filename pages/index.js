import Loading from "../components/Home/Loading";
import Logged from "../components/Home/Logged";
import LoggedOut from "../components/Home/LoggedOut";
import Session from "../contexts/session";
import { useAuth0 } from "@auth0/auth0-react";
import { useSession } from 'next-auth/client';

function Home() {
  const session = Session( state => state)
  const { isLoading, isAuthenticated } = useAuth0();
  // const [ session, loading ] = useSession();

  if ( session.loading || isLoading ) {
    return <Loading />;
  } else if ( isAuthenticated ) {
    return <Logged />;
  } else {
    return <LoggedOut />;
  }
}

export default Home;


