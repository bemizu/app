import { useRouter } from "next/router";

import { Box, Heading, Container, Text } from "@chakra-ui/react";
import Layout from "../../components/layout";
import Section from "../../components/section";
import Session from "../../contexts/session";

function Page() {
  const session = Session((state) => state);
  const user = session.user || {};
  const profile = user.profile || {};

  let fullName = profile.fullName ? (
    <Heading size="sm" mb={4} color="gray.700">
      {profile.fullName}
    </Heading>
  ) : (
    ""
  );

  let bio = profile.bio ? (
    <Box mb={4}>
      <Heading size="sm" mb={1} color="gray.600">
        Bio
      </Heading>
      <Text mb={2} color="gray.500">
        {profile.bio}
      </Text>
    </Box>
  ) : (
    ""
  );

  let skills = profile.skills ? (
    <Box mb={4}>
       <Heading size="sm" mb={1} color="gray.600">
        Skills
      </Heading>
    
      <Text mb={2} color="gray.500">
        {profile.skills}
      </Text>
    </Box>
  ) : (
    ""
  );

  let certifications = profile.certifications ? (
    <Box mb={4}>
       <Heading size="sm" mb={1} color="gray.600">
        Certifications
      </Heading>
    
      <Text mb={2} color="gray.500">
        {profile.certifications}
      </Text>
    </Box>
  ) : (
    ""
  );

  let availability = profile.availability ? (
    <Box mb={4}>
       <Heading size="sm" mb={1} color="gray.600">
        Availability
      </Heading>
    
      <Text mb={2} color="gray.500">
        {profile.availability}
      </Text>
    </Box>
  ) : (
    ""
  );

  let references = profile.references ? (
    <Box mb={4}>
       <Heading size="sm" mb={1} color="gray.600">
        References
      </Heading>
    
      <Text mb={2} color="gray.500">
        {profile.references}
      </Text>
    </Box>
  ) : (
    ""
  );

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
            <img src={profile.profileImg} style={{ height: 100, width: 100 }} />{" "}
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
