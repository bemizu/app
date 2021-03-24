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
const Styles = styled.div``;

function Page() {
  const router = useRouter();
  const session = Session((state) => state);
  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({});

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
      const orgReq = await session.supabase
        .from("organizations")
        .select(
          `
          name
        `
        )
        .eq("uuid", data[0].id);

      session.setUser(data[0]);
      session.setOrganization(orgReq.data[0]);
      setProfileUser(data[0]);
      setProfileOrganization(orgReq.data[0]);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <Layout title={"Home"}>
      <Section>
        <Container maxWidth="1200px">
          <Box>{profileOrganization.name}</Box>
        </Container>
      </Section>
    </Layout>
  );
}

export default withAuthenticationRequired(Page, {
  onRedirecting: () => <Loading />,
});
