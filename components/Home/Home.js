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
  const [ first, setFirst ] = useState(true )
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({});

  useEffect(() => {
    setFirst( false );

    if (first ) {
      return;
      var ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          height: 350,
            responsive: true,

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    }
    if (!session.user) {
      GetUser(user, session, setProfileUser, setProfileOrganization);
    } else {
      setProfileUser(session.user);
      setProfileOrganization(session.organization);
    }
  }, []);

  return (
    <Layout title={"Home"}>
      <Styles>
      <PageContainer path={router.pathname}>
        <Box rounded="lg" p={[4, 6]} bg="white" shadow="md" mb={5}>
          <Heading>
          Dashboard
          </Heading>

          <Divider />

          <SimpleGrid columns={[1, 3]} spacing={ 5 } py={ 4 }>
            <Box>
              <Heading fontSize="80px" textAlign="center">
                0
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
          <canvas id="myChart" width="100%" height="350px"></canvas>
          </Box>


          </Box>

        </Box>

        <SimpleGrid columns={[1, 1, 2]} spacing={ 5 } mb={10}>
        <Box bg="white" rounded="lg" shadow="md" p={[4, 6]}>
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
          
        </Box>

        <Box bg="white" rounded="lg" shadow="md" p={[4, 6]}>

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
          
        </Box>
        </SimpleGrid>


        <Box bg="white" rounded="lg" shadow="md" p={[4, 6]}>
          <Heading>
            Map
          </Heading>

        </Box>
      </PageContainer>

      </Styles>
    </Layout>
  );
}

export default withAuthenticationRequired(Page, {
  onRedirecting: () => <Loading />,
});
