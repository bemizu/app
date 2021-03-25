import {
  Box,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Button,
  Grid,
  Divider,
  Container,
} from "@chakra-ui/react";
import Loading from "../components/Home/Loading";
import Layout from "../components/layout";
import PageContainer from "../components/pageContainer";
import styled from "@emotion/styled";
import theme from "../public/theme";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Session from "../contexts/session";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigator from "../components/navigator";
import {GetUser} from "../utils/getUser";


const Styles = styled.div``;

function Page() {
  const router = useRouter();
  const session = Session((state) => state);
  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({});

  useEffect( () => {
    if ( !session.user ) {
      GetUser( user, session, setProfileUser, setProfileOrganization )
    } else {
      setProfileUser( session.user )
      setProfileOrganization( session.organization )
    }
  } , [  ]);

  return (
    <Layout title="Schedule">
      <PageContainer path={router.pathname}>
      <Heading>
          Schedule
        </Heading>


        { profileUser.email }
      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});
