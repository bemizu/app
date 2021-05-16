import { useRouter, withRouter } from "next/router";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Box, Heading, Container, Text, Grid, Divider,  } from "@chakra-ui/react";
import Layout from "../../components/layout";
import Loading from "../../components/Home/Loading";
import Section from "../../components/section";
import Session from "../../contexts/session";
import { GetUser } from "../../utils/getUser";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import theme from "../../public/theme";
function Page() {
  const session = Session((state) => state);
  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({
    locations: [],
    jobs: [],
    team_members: [],
  });

  useEffect(() => {
    if (!session.user) {
      // await
      GetUser(user, session, setProfileUser, setProfileOrganization);

      setTimeout(iterateViewCount , 2000)
    } else {
      setProfileUser(session.user);
      setProfileOrganization(session.organization);
      setTimeout(iterateViewCount.bind(this) , 2000)
    }
  }, [session.organization]);


  async function iterateViewCount () {
    let orgToUpdate = JSON.parse(JSON.stringify(profileOrganization));
    orgToUpdate.views = profileOrganization.views + 1;
    delete orgToUpdate.jobs;
    delete orgToUpdate.locations;
    delete orgToUpdate.team_members;

    
    const { data, error } = await session.supabase
      .from("organizations")
      .update(orgToUpdate)
      .match({ uuid: session.user.id });

    if (!error) {
      session.refreshOrg(session);
    } else {
      console.log(error);
    }
  }

  let name = profileOrganization.name ? (
    <Box>
    <Heading  color="gray.700">
      {profileOrganization.name}
    </Heading>

    <Divider mb={4}  />
    </Box>
  ) : (
    ""
  );

  let bio = profileOrganization.bio ? (
    <Box mb={4}>
      <Heading size="sm" mb={1} color="gray.600">
        Bio
      </Heading>
      <Text mb={2} color="gray.500">
        {profileOrganization.bio}
      </Text>
    </Box>
  ) : (
    ""
  );

  let skills = profileOrganization.skills ? (
    <Box mb={4}>
      <Heading size="sm" mb={1} color="gray.600">
        Skills
      </Heading>

      <Text mb={2} color="gray.500">
        {profileOrganization.skills}
      </Text>
    </Box>
  ) : (
    ""
  );

  let certifications = profileOrganization.certifications ? (
    <Box mb={4}>
      <Heading size="sm" mb={1} color="gray.600">
        Certifications
      </Heading>

      <Text mb={2} color="gray.500">
        {profileOrganization.certifications}
      </Text>
    </Box>
  ) : (
    ""
  );

  let availability = profileOrganization.availability ? (
    <Box mb={4}>
      <Heading size="sm" mb={1} color="gray.600">
        Availability
      </Heading>

      <Text mb={2} color="gray.500">
        {profileOrganization.availability}
      </Text>
    </Box>
  ) : (
    ""
  );

  let references = profileOrganization.references ? (
    <Box mb={4}>
      <Heading size="sm" mb={1} color="gray.600">
        References
      </Heading>

      <Text mb={2} color="gray.500">
        {profileOrganization.references}
      </Text>
    </Box>
  ) : (
    ""
  );

  if (!profileOrganization.id) {
    return <Loading />;
  }
  return (
    <Layout title="Page">
      <Section>
        <Container
          maxWidth="1200px"
          bg={theme.white}
          rounded="lg"
          p={[3, 3, 5]}
        >
          <Grid
            templateColumns={[
              "100% 100%",
              "100% 100%",
              "100px calc(100% - 100px)",
            ]}
          >
            <Box>
              <Box
                rounded="full"
                overflow="hidden"
                borderWidth={2}
                height="100px"
                width="100px"
              >
                <img
                  src={profileOrganization.logo}
                  style={{ height: 100, width: 100 }}
                />{" "}
              </Box>
            </Box>

            <Box pl={[0, 0, 8]}>
              <Heading>{name}</Heading>
            </Box>
          </Grid>
        </Container>
      </Section>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});
