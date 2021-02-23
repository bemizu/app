import Layout from "../components/layout";
import Section from "../components/section";
import Lorem from "../components/lorem";

import { Heading, Container, Box } from "@chakra-ui/react";

import theme from "../public/theme";

function Contact() {
  return (
    <Layout title="Contact">
      <Section>
        <Container maxWidth={theme.width}>
          <Heading mb={10}>Contact</Heading>

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


export default Contact;