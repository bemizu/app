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
} from "@chakra-ui/react";
import { useState } from "react";

function AddJob (props) {
  const session = Session((state) => state);
  const [job, setJob] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  function update(e) {
    let newJob = job;
    newJob[e.currentTarget.dataset.path] = e.currentTarget.value;
    setJob(newJob);
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
