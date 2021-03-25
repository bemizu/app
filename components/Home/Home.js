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
import Image from "next/image";
import EditProfile from "../Profile/edit";
import VerticalAlign from "../verticalAlign";
import PageContainer from "../pageContainer";
import Loading from "./Loading";
import Link from "next/link";
import Layout from "../layout";
import Section from "../section";
import styled from "@emotion/styled";
import theme from "../../public/theme";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Session from "../../contexts/session";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigator from "../navigator";
import {GetUser} from "../../utils/getUser";

const Styles = styled.div``;

function Page() {
  const router = useRouter();
  const session = Session(state => state);
  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({});

  useEffect( () => {
    if ( !session.user ) {
      GetUser( user )
    } else {
      setProfileUser( session.user )
      setProfileOrganization( session.organization )
    }
  } , [ session.user ]);

  return (
    <Layout title={"Home"}>
      <PageContainer path={router.pathname}>
        <Heading>
          Home
        </Heading>

        { profileUser.email }
      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(Page, {
  onRedirecting: () => <Loading />,
});
