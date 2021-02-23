import Loading from "../components/Home/Loading";
import Logged from "../components/Home/Logged";
import LoggedOut from "../components/Home/LoggedOut";
import Session from "../contexts/session";
import { useAuth0 } from "@auth0/auth0-react";

function Home({ loading }) {
  const session = Session((state) => state);
  const { isAuthenticated } = useAuth0();

  if (loading) {
    return <Loading />;
  } else if ( isAuthenticated ) {
    return <Logged />;
  } else {
    return <LoggedOut />;
  }
}

export default Home;
