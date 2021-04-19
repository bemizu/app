import {
  Input,
  Box,
  Heading,
  Container,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { useRouter } from 'next/router'

import Layout from "../layout";
import Section from "../section";
import styled from "@emotion/styled";
import theme from "../../public/theme";
import Session from "../../contexts/session";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {GetUser} from "../../utils/getUser";

const Styles = styled.div``;

function Onboarding() {
  const router = useRouter()


  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({});


  const [ businessName, setBusinessName ] = useState("");

  const session = Session((state) => state);
  const { user } = useAuth0();



  function update (e) {
    switch (e.currentTarget.dataset.path) {
      case "name":
        setBusinessName( e.currentTarget.value );
        break;
    
      default:
        break;
    }
  }

  async function onboard( e ) {
    e.preventDefault();

    const { data, error } = await session.supabase
      .from("business_users")
      .update({ onboarded: true })
      .match({ email: user.email });

    const { orgData, orgError } = await session.supabase
      .from("organizations")
      .insert([{ name: businessName, uuid: session.user.id }]);

    
      debugger

    router.push("/")
  }

  return (
    <Layout title="Onboarding">
      <Styles>
        <Section>
          <Container maxWidth={800}>
            <Heading mb={4}>Onboarding</Heading>

            <Box rounded="lg" bg={ theme.white } p={[4, 6]}>
              <form onSubmit={ onboard }>
              <FormControl isRequired>
                <FormLabel>Business name</FormLabel>
                <Input type="text" data-path="name" onChange={ update } />
              </FormControl>


             <Button mt={4} type="submit" colorScheme="blue" rounded="full">Save</Button>
            </form>
            </Box>

            
          </Container>
        </Section>
      </Styles>
    </Layout>
  );
}

export default Onboarding;
