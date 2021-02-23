import Layout from "../components/layout";
import Section from "../components/section";
import Lorem from "../components/lorem";

import { Heading, Container, Box, Button } from "@chakra-ui/react";

import theme from "../public/theme";

import { useAuth0 } from "@auth0/auth0-react";

function About () {



  return (
    <Layout title="About">
      <Section>
        <Container maxWidth={theme.width}>
          <Heading mb={10}>About</Heading>

          <Box mb={4}>
            <Lorem />
          </Box>

          <Box mb={4}>
            <Lorem />
          </Box>

          <Box>
            <Lorem />
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}

export default About;