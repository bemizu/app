
import toast from "react-hot-toast";

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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Select,
} from "@chakra-ui/react";


import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme


import Loading from "../components/Home/Loading";
import Layout from "../components/layout";
import PageContainer from "../components/pageContainer";
import styled from "@emotion/styled";
import theme from "../public/theme";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Session from "../contexts/session";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigator from "../components/navigator";
import { GetUser } from "../utils/getUser";

const Styles = styled.div`
  .ql-toolbar {
    border-top-right-radius: 0.125rem;
    border-top-left-radius: 0.125rem;
  }
`;

function Page() {
  const router = useRouter();
  const session = Session((state) => state);

  const [description, setDescription] = useState('');
  const { quill, quillRef } = useQuill();


  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({});

  useEffect(() => {

      
    if (!session.user) {
      GetUser(user, session, setProfileUser, setProfileOrganization);
    } else {
      setProfileUser(session.user);
      setProfileOrganization(session.organization);
    }
  }, []);

  const [job, setJob] = useState({});

  function update(e) {
    let newJob = job;
    newJob[e.currentTarget.dataset.path] = e.currentTarget.value;
    setJob(newJob);
  }

  function updateMin(min) {
    let newJob = job;
    newJob.salaryMin = min;
    setJob(newJob);
  }

  function updateMax(max) {
    let newJob = job;
    newJob.salaryMax = max;
    setJob(newJob);
  }

  function locations() {
    if (session.organization) {
      return session.organization.locations.map((el) => {
        return <option value={el.id}>{el.title}</option>;
      });
    } else {
      return [];
    }
  }

  async function formSubmit(e) {
    e.preventDefault();

    let newJob = job;
    newJob.oid = session.organization.id;
    newJob.description = JSON.stringify(quill.getContents() );

    const { data, error } = await session.supabase
      .from("jobs")
      .insert([newJob]);

    if (!error) {
      session.refreshOrg(session);
      toast.success("Job added successfully.");
      router.push("/jobs");
      
    } else {
      console.log(error);
    }
  }

  

  return (
    <Layout title="Add Job">
      <PageContainer path={router.pathname}>
        <Styles>
        <Box p={[4, 4, 6]} shadow="lg" rounded="lg" bg="white">
        <Heading>Add Job</Heading>
        <Divider mb={4}/>


{/* 
        <Heading size="md" mb={3}>
          Business Name
        </Heading>


        <Box mb={3} >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Box>

        <Box fontWeight="bold" mb={1}>
        Culture 
        </Box>

        <Box mb={5}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Box>

      
        */}

        <form onSubmit={formSubmit}>

        <FormControl isRequired mb={3}>
            <FormLabel>Description</FormLabel>

            <Box
              bg="white"
              rounded="sm"
              defaultValue={job.description}
              // data-path="description"
              // onChange={update}
              ref={quillRef}
            />




          </FormControl>




          <FormControl isRequired mb={3}>
            <FormLabel>Title</FormLabel>

            <Input
              bg="white"
              rounded="sm"
              defaultValue={job.title}
              data-path="title"
              onChange={update}
            />
          </FormControl>

          
          <SimpleGrid columns={[1, 1, 2]} spacing={ 3 } mb={ 3 }>
          <FormControl  >
            <FormLabel>Salary Min</FormLabel>

            <NumberInput
              defaultValue={job.min}
              data-path="min"
              bg="white"
              rounded="sm"
              min={1}
              onChange={updateMin}
            >
              <NumberInputField rounded="sm" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl  >
            <FormLabel>Salary Max</FormLabel>

            <NumberInput
              defaultValue={job.max}
              data-path="max"
              bg="white"
              rounded="sm"
              min={1.01}
              onChange={updateMax}
            >
              <NumberInputField rounded="sm" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>



          <FormControl >
            <FormLabel>Salary Type</FormLabel>

            <Select
              bg="white"
              rounded="sm"
              placeholder={"Select..."}
              onChange={update}
              data-path="salaryType"
            >
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </Select>
          </FormControl>

          </SimpleGrid>

          <FormControl isRequired mb={3}>
            <FormLabel>Location</FormLabel>

            <Select
              bg="white"
              rounded="sm"
              placeholder={"Select..."}
              onChange={update}
              data-path="lid"
            >
              {locations()}
            </Select>
          </FormControl>

          <ButtonGroup mt={4}>
            <Button type="submit" colorScheme="blue" rounded="sm">
              Save
            </Button>
          </ButtonGroup>
        </form>
        </Box>
        </Styles>
      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});
