import { Box, Heading, Container } from "@chakra-ui/react";
import Layout from "../layout";
import Section from "../section";
import styled from "@emotion/styled";
import theme from "../../public/theme";

const Styles = styled.div``;

function Onboarding () {

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLIC_ANON
  );
  
  return (
    <Layout title="Onboarding">
      <Styles>
        <Section>
          <Container maxWidth={ theme.width }>
            <Heading>Onboarding</Heading>
          </Container>
        </Section>
      </Styles>
    </Layout>
  );
}

export default Onboarding;
