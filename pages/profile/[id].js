import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box, Heading, Container, Text } from "@chakra-ui/react";
import Layout from "../../components/layout";
import Loading from "../../components/Home/Loading";
import Section from "../../components/section";
import Session from "../../contexts/session";
import { GetUser } from "../../utils/getUser";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


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
      GetUser(user, session, setProfileUser, setProfileOrganization);
    } else {
      setProfileUser(session.user);
      setProfileOrganization(session.organization);
    }
  }, [ session.organization ]);


  let fullName = profileOrganization.fullName ? (
    <Heading size="sm" mb={4} color="gray.700">
      {profileOrganization.fullName}
    </Heading>
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
        <Container maxWidth="1200px">
          <Box
            rounded="full"
            overflow="hidden"
            borderWidth={2}
            height="100px"
            width="100px"
          >
            <img src={profileOrganization.profileImg} style={{ height: 100, width: 100 }} />{" "}
          </Box>

          <Heading>{user.username}</Heading>

          { fullName }

          { bio }

          { skills }

          { certifications }

          { availability }

          { references }
        </Container>
      </Section>
    </Layout>
  );
}

export default Page;
