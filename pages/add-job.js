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

const Styles = styled.div``;

function Page() {
  const router = useRouter();
  const session = Session((state) => state);
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

    const { data, error } = await session.supabase
      .from("jobs")
      .insert([newJob]);

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
            zip,
            oid
          ),
          jobs (
            id, 
            title, 
            oid,
            lid,
            description, 
            salaryMin, 
            salaryMax, 
            salaryType
          )
              
            `
        )
        .eq("id", session.organization.id);



        
      if (!org.error) {
        
        session.setOrganization(org.data[0]);
        // setProfileOrganization(org.data[0]);
        router.push("/jobs");
      } else {
        console.log(error);
      }
    } else {
      console.log(error);
    }
  }

  return (
    <Layout title="Add Job">
      <PageContainer path={router.pathname}>
        <Heading>Add Job</Heading>

        <form onSubmit={formSubmit}>
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

          <FormControl isRequired mb={3}>
            <FormLabel>Description</FormLabel>

            <Textarea
              bg="white"
              rounded="sm"
              defaultValue={job.description}
              data-path="description"
              onChange={update}
            />
          </FormControl>

          <FormControl isRequired mb={3}>
            <FormLabel>Salary Min</FormLabel>

            <NumberInput
              defaultValue={job.min}
              data-path="min"
              bg="white"
              rounded="sm"
              min={1}
              onChange={updateMin}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl isRequired mb={3}>
            <FormLabel>Salary Max</FormLabel>

            <NumberInput
              defaultValue={job.max}
              data-path="max"
              bg="white"
              rounded="sm"
              min={1.01}
              onChange={updateMax}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl isRequired mb={3}>
            <FormLabel>Salary Type</FormLabel>

            <Select
              bg="white"
              rounded="sm"
              placeholder={"Select..."}
              onChange={update}
              data-path="salaryType"
            >
              <option value="hourly">Per hour</option>
              <option value="monthly">Per month</option>
              <option value="yearly">Per year</option>
            </Select>
          </FormControl>

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
              <option value="remote">Remote</option>
            </Select>
          </FormControl>

          <ButtonGroup>
            <Button type="submit" colorScheme="blue" rounded="sm">
              Save
            </Button>
          </ButtonGroup>
        </form>
      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});
