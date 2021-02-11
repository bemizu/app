import { useRouter } from "next/router";

import { Box, Heading, Container, Text } from "@chakra-ui/react";
import Layout from "../../components/layout";
import Section from "../../components/section";
import Session from "../../contexts/session";

function Page() {
  const session = Session((state) => state);
  const user = session.user || {};
  const profile = user.profile || {};

  let fullName = profile.fullName ? <Heading size="sm" mb={2} color="gray.700">{ profile.fullName }</Heading> : "";
  let bio = profile.bio ? <Text mb={2} color="gray.500">{ profile.bio }</Text> : "";

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
          
        </Container>
      </Section>
    </Layout>
  );
}

export default Page;
