import Loading from "../components/Home/Loading";
import Logged from "../components/Home/Logged";
import LoggedOut from "../components/Home/LoggedOut";
import Session from "../contexts/session";

function Home ({ loading }) {
  const session = Session( state => state);

  if (loading) {
    return <Loading />
  } else if ( session.user ) {
    return (
     <Logged session={ session }/>
    )
  } else {
    return (
      <LoggedOut /> 
    )
  }
}

export default Home;