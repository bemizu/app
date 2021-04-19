import {
  Box,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Button,
  Grid,
  Divider,
  Container,
} from "@chakra-ui/react";
import Image from "next/image";
import EditProfile from "../Profile/edit";
import VerticalAlign from "../verticalAlign";
import PageContainer from "../pageContainer";
import Loading from "./Loading";
import Link from "next/link";
import Layout from "../layout";
import Section from "../section";
import styled from "@emotion/styled";
import theme from "../../public/theme";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Session from "../../contexts/session";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigator from "../navigator";
import {GetUser} from "../../utils/getUser";

const Styles = styled.div``;

function Page() {
  const router = useRouter();
  const session = Session(state => state);
  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({});

  useEffect( () => {
    if ( !session.user ) {
      GetUser( user )
    } else {
      setProfileUser( session.user )
      setProfileOrganization( session.organization )
    }
  } , [ session.user ]);

  return (
    <Layout title={"Home"}>
      <PageContainer path={router.pathname}>
        <Box rounded="lg" p={[4, 6]} bg="white" shadow="md" mb={5}>
          <Heading>
          Dashboard
          </Heading>

          <Divider />

          <SimpleGrid columns={[1, 1, 2]} pt={5} spacing={ 5}>
            <Box>
            <Box height={["200px", "300px", "200px"]} position="relative" mb={5} >
              <Image src="/home-dashboard.svg"  layout="fill" objectFit="contain" />
            </Box>

            <Box px={5}>
            Once you post a job, you can manage and see averything from here.
            </Box>

            </Box>

            <Box>
              <Box>
              Add To Do
              </Box>

              <Button rounded="sm" colorScheme="orange" width="full">
                Add To Do
              </Button>
            </Box>

          </SimpleGrid>
        </Box>

        <SimpleGrid columns={[1, 1, 2]} spacing={ 5 } mb={10}>
        <Box bg="white" rounded="lg" shadow="md" p={[4, 6]}>
          <Heading size="lg" mb={4}>
            Post a job
          </Heading>

          <Box height={["200px", "300px", "200px"]} position="relative" mb={5} px={ 5 } >
              <Image src="/post-job-dashboard.svg"  layout="fill" objectFit="contain" />
            </Box>

          
          <Link href="/add-job">
          <Button rounded="sm" colorScheme="orange" width="full">
                Post Job
              </Button>
              </Link>
          
        </Box>

        <Box bg="white" rounded="lg" shadow="md" p={[4, 6]}>

        <Heading size="lg" mb={4}>
            Find qualified candidates
          </Heading>

          <Box height={["200px", "300px", "200px"]} position="relative" mb={5} px={ 5 } >
              <Image src="/qualified-candidates.svg"  layout="fill" objectFit="contain" />
            </Box>

          
          <Link href="/add-job">
          <Button rounded="sm" colorScheme="orange" width="full">
                Find Candidates
              </Button>
              </Link>
          
        </Box>
        </SimpleGrid>


        <Box height="500px" bg="green.300" p={6 }>
          <Heading>
            Map
          </Heading>

        </Box>
      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(Page, {
  onRedirecting: () => <Loading />,
});
