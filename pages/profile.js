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
  import styled from "@emotion/styled";
  import theme from "../public/theme";
  import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
  import Session from "../contexts/session";
  import { useRouter, withRouter } from "next/router";
  import { useEffect, useState } from "react";
  import Navigator from "../components/navigator";
  
  const Styles = styled.div``;
  
  function Page () {
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
      <Layout title="Profile">
        <Box  >
          <Container maxWidth="1200px">
              <Grid gridTemplateColumns={["100%", "100%", "100px calc(100% - 120px)"]} gap={[0, 0, "20px"]} >
                  <Box my={[0, 0, 10]} >
                      <Navigator path={ router.pathname } />
                  </Box>
  
                  <Box bg={ theme.white } py={[0, 0, 10]} px={[0, 5, 10]} minHeight={[400, 500, "500px"]} >
                      
                  </Box>
  
  
              </Grid>
            
          </Container>
          </Box>
      </Layout>
    );
  }
  
  export default withAuthenticationRequired( withRouter(Page), {
    onRedirecting: () => <Loading />,
  });
  