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
import VerticalAlign from "../components/verticalAlign";
import { BiTrash } from "react-icons/bi";
import Loading from "../components/Home/Loading";
import Layout from "../components/layout";
import PageContainer from "../components/pageContainer";
import AddJob from "../components/add-job";
import EditJob from "../components/edit-job";
import styled from "@emotion/styled";
import theme from "../public/theme";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Session from "../contexts/session";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigator from "../components/navigator";
import { GetUser } from "../utils/getUser";

const Styles = styled.div``;

function Page() {
  const router = useRouter();
  const session = Session((state) => state);
  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({ locations: []});

  useEffect(() => {
    if (!session.user) {
      GetUser(user, session, setProfileUser, setProfileOrganization);
    } else {
      setProfileUser(session.user);
      setProfileOrganization(session.organization);
    }
  }, []);

  async function removeJob(e) {
    const { data, error } = await session.supabase
      .from("locations")
      .delete()
      .match({ id: e.currentTarget.dataset.id });

    if (!error) {
      const org = await session.supabase
        .from("organizations")
        .select(
          ` 
              id,      
              name,
              website,
              overview,
              culture,
              logo,
              locations (
                id,
                title,
                line1,
                line2,
                city,
                state,
                zip
              )
            `
        )
        .eq("id", session.organization.id);

      session.setOrganization(org.data[0]);
      setProfileOrganization(org.data[0]);
    } else {
      console.log(error);
    }
  }

  return (
    <Layout title="Jobs">
      <PageContainer path={router.pathname}>
        <Heading>Jobs</Heading>

        <Divider my={2} />
        {profileOrganization.locations.map((el, idx) => {
          return (
            <Box key={"loc" + el.id}>
              <Box my={1}>
                <Grid templateColumns="calc(100% - 80px) 60px" gap="20px">
                  <Box>
                    <VerticalAlign>
                      <Heading size="sm" fontWeight="500">
                        {el.title}
                      </Heading>
                    </VerticalAlign>
                  </Box>

                  <Box>
                    <SimpleGrid
                      columns={2}
                      fontSize="20px"
                      textAlign="center"
                      gap="2px"
                    >
                      <Box>
                        <EditJob
                          el={el}
                          setProfileOrganization={setProfileOrganization}
                        />
                      </Box>

                      <Box>
                        <Box
                          data-id={el.id}
                          display="inline-block"
                          color="red.500"
                          cursor="pointer"
                          _hover={{ opacity: 0.7 }}
                          transition="0.2s ease"
                          onClick={removeJob}
                        >
                          <BiTrash style={{ display: "inline-block" }} />
                        </Box>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </Grid>
              </Box>

              <Divider my={2} />
            </Box>
          );
        })}

        <AddJob />
      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});
