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
import ThemeBox from "../theme-box";
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


import {
  Chart,
  LineElement,
  LinearScale, 
  LineController,
  CategoryScale,
  PointElement
} from "chart.js";

Chart.register( PointElement, LineElement, LinearScale, LineController, CategoryScale );

const Styles = styled.div`
  #myChart {
    height: 350px;
  }
`;

function Page() {
  const router = useRouter();
  const session = Session(state => state);
  const { user } = useAuth0();

  useEffect(() => {
    if (!session.user) {
      GetUser(user, session);
    } 
  }, []);



  if ( !session.organization ) {
    return <Loading />;
  }

  return (
    <Layout title={"Home"}>
      <Styles>
      <PageContainer path={router.pathname}>
        <ThemeBox>
          <Heading>
          Dashboard
          </Heading>

          <Divider />

          <SimpleGrid columns={[1, 3]} spacing={ 5 } py={ 4 }>
            <Box>
              <Heading fontSize="80px" textAlign="center">
                { session.organization.views }
              </Heading>
              <Heading textAlign="center" size="md">Profile Views</Heading>

            </Box>


            <Box>
              <Heading fontSize="80px" textAlign="center">
                0
              </Heading>
              <Heading textAlign="center" size="md">Job Post Views</Heading>

            </Box>

            <Box>
              <Heading fontSize="80px" textAlign="center">
                0
              </Heading>
              <Heading textAlign="center" size="md">Bemizu Score</Heading>

            </Box>

            <Box>
              
            </Box>

            <Box>
              
            </Box>

          </SimpleGrid>


          <Divider mb={5} />

          <Box  bg="gray.100" py={5} rounded="lg" position="relative">

            <Box height="350px" position="relative">
          </Box>


          </Box>

          </ThemeBox>

        <SimpleGrid columns={[1, 1, 2]} spacing={ 5 } mb={10}>
        <ThemeBox>
          <Heading size="lg" mb={4}>
            Post a job
          </Heading>

          <Box height={["200px", "300px", "200px"]} position="relative" mb={5} px={ 5 } >
              <Image src="/post-job-dashboard.svg"  layout="fill" objectFit="contain" />
            </Box>



          <ButtonGroup >
          
          <Link href="/add-job">
          <Button rounded="sm" colorScheme="orange">
                Post Job
              </Button>
              </Link>
              </ButtonGroup>
          
        </ThemeBox>

        <ThemeBox>

        <Heading size="lg" mb={4}>
            Find qualified candidates
          </Heading>

          <Box height={["200px", "300px", "200px"]} position="relative" mb={5} px={ 5 } >
              <Image src="/qualified-candidates.svg"  layout="fill" objectFit="contain" />
            </Box>

          
          <Link href="/add-job">
          <Button rounded="sm" colorScheme="teal" >
                Find Candidates
              </Button>
              </Link>
          
        </ThemeBox>
        </SimpleGrid>


      </PageContainer>

      </Styles>
    </Layout>
  );
}

export default withAuthenticationRequired(Page, {
  onRedirecting: () => <Loading />,
});
