import Onboarding from "./Onboarding";
import Home from "./Home";
import Session from "../../contexts/session"; 

function Logged () {
    const session = Session( state => state.session );

    // get user from Supabase

    if ( true ) {
        return <Onboarding />
    } else {
        return <Home />
    };


   
}

export default Logged;