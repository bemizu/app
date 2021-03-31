import Session from "../contexts/session";
import {
  BiEdit,
} from "react-icons/bi"
import {
  Box,
  Textarea, 
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  ButtonGroup, 
} from "@chakra-ui/react";
import { useState } from "react";

function AddJob (props) {
  const session = Session((state) => state);
  const [job, setJob] = useState( props.el );
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  function locations () {
    if ( session.organization ) {
      return <Select
      bg="white"
      rounded="sm"
      placeholder={"Select..."}
      onChange={update}
      data-path="lid"
      defaultValue={job.lid}
    >
      {
        session.organization.locations.map( el => {
          return (
            <option value={ el.id }>{ el.title }</option>
          )
        }) 
      }
      
      <option value="remote">Remote</option>
    </Select>
      
      
    } else {
      return <Select
      bg="white"
      rounded="sm"
      placeholder={"Select..."}
      onChange={update}
      data-path="lid"
      defaultValue={job.lid}
    >
      <option value="remote">Remote</option>
    </Select>
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
                oid, 
                title,
                line1,
                line2,
                city,
                state,
                zip
              ), 
              jobs (
                id, 
                title, 
                oid,
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
        props.setProfileOrganization( org.data[0] )
        onClose();
      } else {
        console.log(error);
        onClose();
      }
    } else {
      console.log(error);
    }
  }

  

  return (
    <Box>
      <Box
        display="inline-block"
        color="blue.500"
        cursor="pointer"
        _hover={{ opacity: 0.7 }}
        transition="0.2s ease"
        onClick={onOpen}
      >
        <BiEdit style={{ display: "inline-block" }} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent rounded="sm" mx={4}>
          <form onSubmit={formSubmit}>
            <ModalHeader>Edit Job</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                  defaultValue={job.salaryMin}
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
                  defaultValue={job.salaryMax}
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
                  defaultValue={job.salaryType}
                >
                 
                  <option value="hourly">Per hour</option>
                  <option value="monthly">Per month</option>
                  <option value="yearly">Per year</option>
                </Select>
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Location</FormLabel>

               
                  {
                    locations()
                  }

                
              </FormControl>
            
            <ButtonGroup>
              <Button type="submit" colorScheme="blue" rounded="sm">
                Save
              </Button>
              </ButtonGroup>
          </form>



            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose} rounded="sm">
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue" rounded="sm">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AddJob;
