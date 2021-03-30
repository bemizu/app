import Session from "../contexts/session";

import {
  Box,
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

function AddJob(props) {
  const session = Session((state) => state);
  const [job, setJob] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  function update(e) {
    let newJob = job;
    newJob[e.currentTarget.dataset.path] = e.currentTarget.value;
    setJob(newJob);
  }

  function updateMin(min) {
    let newJob = job;
    newJob.min = min;
    setJob(newJob);
  }

  function updateMax(max) {
    let newJob = job;
    newJob.max = max;
    setJob(newJob);
  }

  function locations () {
    if ( session.organization ) {
      session.organization.locations.map( el => {
        return (
          <option value={ el.id }>{ el.title }</option>
        )
      })
    } else {
      return []
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

      if (!org.error) {
        session.setOrganization(org.data[0]);
        props.setProfileOrganization(org.data[0]);
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
      <Button size="sm" rounded="sm" colorScheme="green" onClick={onOpen}>
        Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent rounded="sm" mx={4}>
          <form onSubmit={formSubmit}>
            <ModalHeader>Add Job</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                  step="0.5"
                  precision={1}
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
                  step="0.5"
                  precision={1}
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
                <FormLabel>Location</FormLabel>

                <Select
                  bg="white"
                  rounded="sm"
                  placeholder={"Select location"}
                  onChange={update}
                  data-path="location"
                  defaultValue={job.lid}
                >
                  {
                    locations()
                  }
                  <option value="remote">Remote</option>
                </Select>
              </FormControl>
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
