import {
  Box,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Button,
  Grid,
  Divider,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea, 
  Checkbox,
} from "@chakra-ui/react";
import Loading from "../components/Home/Loading";
import Layout from "../components/layout";
import VerticalAlign from "../components/verticalAlign";
import styled from "@emotion/styled";
import theme from "../public/theme";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Session from "../contexts/session";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigator from "../components/navigator";
import PageContainer from "../components/pageContainer";
import {GetUser} from "../utils/getUser";
import {
  
  BiTrash,
} from "react-icons/bi";

import AddLocation from "../components/add-location";
import EditLocation from "../components/edit-location";

const Styles = styled.div``;

function Page() {
  const router = useRouter();
  const session = Session((state) => state);
  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({ locations: []});

  console.log( profileOrganization );
  useEffect( () => {
    if ( !session.user ) {
      GetUser( user, session, setProfileUser, setProfileOrganization )
    } else {
      setProfileUser( session.user )
      setProfileOrganization( session.organization )
    }
  } , [  ]);

  async function saveOrg ( e ) {
    e.preventDefault();

    const { data, error } = await session.supabase
    .from('organizations')
    .update( profileOrganization )
    .match({ uuid: session.user.id })

    if ( !error ) {
      session.setOrganization( data[0] );
    } else {
      console.log( error );
    }

  }

  async function removeLocation ( e ) {
    const { data, error } = await session.supabase
    .from('locations')
    .delete()
    .match({ id: e.currentTarget.dataset.id })

    if (!error) {

      const org = await session.supabase
        .from("organizations")
        .select(
          ` 
              id,      
              name,
              website,
              overview,
              culture,
              logo,
              locations (
                id,
                title,
                line1,
                line2,
                city,
                state,
                zip
              )
            `
        )
        .eq("id", session.organization.id);

        session.setOrganization(org.data[0]);
        setProfileOrganization(org.data[0]);

    } else {
      console.log( error )
    }

    


  }

  function update ( e ) {
    let org = profileOrganization;
    org[ e.currentTarget.dataset.path ] = e.currentTarget.value;
    setProfileOrganization( org );

    // switch ( e.currentTarget.dataset.path ) {
    //   case "name":
       
    //     break;


    
    //   default:
    //     break;
    // }
  }  

  return (
    <Layout title="Profile">
      <PageContainer path={router.pathname}>
        <Heading mb={4}>
          Profile
        </Heading>

        <form onSubmit={ saveOrg }>

        <FormControl isRequired mb={4}>
          <FormLabel>
            Business Name
          </FormLabel>

          <Input bg="white" rounded="sm" defaultValue={ profileOrganization.name } data-path="name" onChange={ update } />
        </FormControl>

        <FormControl  mb={4}>
          <FormLabel>
            Logo
          </FormLabel>

          <Input bg="white" rounded="sm" defaultValue={ profileOrganization.logo } data-path="logo" onChange={ update } />
        </FormControl>

        <FormControl  mb={4}>
          <FormLabel>
            Overview
          </FormLabel>

          <Textarea bg="white" rounded="sm" placeholder="Add your mission statement" defaultValue={ profileOrganization.overview } data-path="overview" onChange={ update } />
        </FormControl>

        <FormControl  mb={4}>
          <FormLabel>
            Culture
          </FormLabel>

          <Textarea bg="white" rounded="sm" placeholder="What makes you great" defaultValue={ profileOrganization.culture } data-path="culture" onChange={ update } />
        </FormControl>

        <FormControl  mb={4}>
          <FormLabel>
            Website
          </FormLabel>

          <Input type="url" bg="white" rounded="sm" placeholder="https://example.com" defaultValue={ profileOrganization.website } data-path="website" onChange={ update } />
        </FormControl>

       

        <Button rounded="sm" colorScheme="orange" type="submit">
          Save
        </Button>

        </form>

        <Divider my={[6, 6, 10]} />
      
        <Box rounded="lg" bg="white" p={[4, 6]}>

        <Heading size="lg" mb={2}>
          Locations

        </Heading>


        <Divider my={2} />
        {
          profileOrganization.locations.map( (el, idx) => {

            return (
              <Box key={"loc" + el.id}>
              <Box my={1}>
                <Grid templateColumns="calc(100% - 80px) 60px" gap="20px">
                  <Box>
                    <VerticalAlign>
                <Heading size="sm" fontWeight="500">
                { el.title }
                </Heading>
                </VerticalAlign>
                </Box>

                <Box>
                  <SimpleGrid columns={2} fontSize="20px" textAlign="center" gap="2px">
                    <Box >
                      <EditLocation el={ el } setProfileOrganization={ setProfileOrganization } />

                    </Box>

                    <Box >
                      <Box data-id={ el.id } display="inline-block" color="red.500" cursor="pointer" _hover={{opacity: 0.7}} transition="0.2s ease" onClick={ removeLocation } >
                      <BiTrash style={{display: "inline-block"}}  />
                      </Box>
                    </Box>
                  </SimpleGrid>
                </Box>
                </Grid>
                </Box>

                <Divider my={2} />


                </Box>
            )
          })
        }


        <Box mb={4} mt={4}>
        <Checkbox>
          Remote available?
        </Checkbox>
        </Box>

        <AddLocation setProfileOrganization={ setProfileOrganization } />


        </Box>

        
      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});
