import {
  Box,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Button,
  Grid,
  Divider,
  Container,
  IconButton,
  FormLabel,
} from "@chakra-ui/react";
import Link from "next/link"
import ThemeBox from "../components/theme-box";
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


  const [profileOrganization, setProfileOrganization] = useState( session.organization || {
    locations: [],
    jobs: [],
    team_members: [],
  });

  useEffect(() => {
    if (!session.user) {
      GetUser(user, session, setProfileUser, setProfileOrganization);
    } else {
      setProfileUser(session.user);
      setProfileOrganization(session.organization);
    }
  }, [ session.organization ]);

  async function removeJob(e) {
    const { data, error } = await session.supabase
      .from("jobs")
      .delete()
      .match({ id: e.currentTarget.dataset.id });

    if (!error) {
      session.refreshOrg( session );
    } else {
      console.log(error);
    }
  }

  return (
    <Layout title="Jobs">
      <PageContainer path={router.pathname}>
        <ThemeBox>
        <Heading>Jobs</Heading>

        <Divider mb={2} />
        {profileOrganization.jobs.map((el, idx) => {
          return (
            <Box key={"loc" + el.id}>
              <Box mb={2}>
                <Grid templateColumns="calc(100% - 80px) 60px" gap="20px">
                  <Box>
                      <Box fontWeight="500">
                        {el.title}
                      </Box>


<Box fontSize="lg" fontWeight="300" lineHeight="18px" mb={2}>
  Lorem ipsum ...

</Box>

                      <ButtonGroup variant="solid" isAttached mb={1}
                    >
                      <IconButton>
                        <EditJob
                          el={el}
                          setProfileOrganization={setProfileOrganization}
                        />
                      </IconButton>

                      <IconButton  onClick={removeJob} data-id={el.id} icon={<BiTrash style={{ display: "inline-block" }} />} />
                       
                    </ButtonGroup>
                  </Box>

                  <Box>
                    
                  </Box>
                </Grid>
              </Box>

              <Divider my={2} />
            </Box>
          );
        })}

        <Box mt={4}>
          <Link href="/add-job">
        <Button rounded="sm" colorScheme="green">
          Add Job
        </Button>
        </Link>
        </Box>
        </ThemeBox>
      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});
