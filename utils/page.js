import { Box, Heading, Container } from "@chakra-ui/react";
import Layout from "../components/layout";
import Section from "../components/section";
import styled from "@emotion/styled";
import theme from "../public/theme";

const Styles = styled.div``;

function Page() {
  return (
    <Layout title="Page">
      <Styles>
        <Section>
          <Container maxWidth={ theme.width }>
            <Heading>Page</Heading>
          </Container>
        </Section>
      </Styles>
    </Layout>
  );
}

export default Page;
