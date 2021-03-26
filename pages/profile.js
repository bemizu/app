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
} from "@chakra-ui/react";
import Loading from "../components/Home/Loading";
import Layout from "../components/layout";
import styled from "@emotion/styled";
import theme from "../public/theme";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Session from "../contexts/session";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigator from "../components/navigator";
import PageContainer from "../components/pageContainer";
import {GetUser} from "../utils/getUser";

const Styles = styled.div``;

function Page() {
  const router = useRouter();
  const session = Session((state) => state);
  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({});

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

        <Divider my={10} />
      
        <Box rounded="lg" bg="white" p={[4, 6]}>

        <Heading size="lg" mb={4}>
          Locations

        </Heading>

        <Button size="sm" rounded="sm" colorScheme="green">
          Add


        </Button>



        </Box>

        
      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});
