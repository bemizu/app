import { Box, Heading, Container, Button } from "@chakra-ui/react";
import Layout from "../layout";
import Section from "../section";
import styled from "@emotion/styled";
import theme from "../../public/theme";
import Session from "../../contexts/session";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react/cjs/react.development";
import { useAuth0 } from "@auth0/auth0-react";

const Styles = styled.div``;

function Onboarding () {
  const session = Session( state => state);
  const { user } = useAuth0();
  
 

  async function onboard () {
    const { data, error } = await session.supabase
    .from('users')
    .update({ onboarded: true })
    .match({ email: user.email })
    
    window.location.reload();
  }
 
  
  return (
    <Layout title="Onboarding">
      <Styles>
        <Section>
          <Container maxWidth={ theme.width }>
            <Heading>Onboarding</Heading>

            <Button onClick={ onboard }>
              Onboard

            </Button>
          </Container>
        </Section>
      </Styles>
    </Layout>
  );
}

export default Onboarding;
