import { Box, Heading, Container } from "@chakra-ui/react";
import Layout from "../layout";
import Section from "../section";
import styled from "@emotion/styled";
import theme from "../../public/theme";

import { useEffect } from "react/cjs/react.development";


const Styles = styled.div``;

function Onboarding () {

  

 
  
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
