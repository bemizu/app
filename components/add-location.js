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

function AddLocation(props) {
  const session = Session((state) => state);
  const [location, setLocation] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  function update(e) {
    let loc = location;
    loc[e.currentTarget.dataset.path] = e.currentTarget.value;
    setLocation(loc);
  }

  async function formSubmit(e) {
    e.preventDefault();

    let loc = location;
    loc.oid = session.organization.id;

    const { data, error } = await session.supabase
      .from("locations")
      .insert([loc]);

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
            <ModalHeader>Add Location</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired mb={3}>
                <FormLabel>Title</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={location.title}
                  data-path="title"
                  onChange={update}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Address Line 1</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={location.line1}
                  data-path="line1"
                  onChange={update}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Address Line 2</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={location.line2}
                  data-path="line2"
                  onChange={update}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>City</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={location.city}
                  data-path="city"
                  onChange={update}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>State</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={location.state}
                  data-path="state"
                  onChange={update}
                />
              </FormControl>

              <FormControl mb={3} isRequired>
                <FormLabel>Zip</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={location.zip}
                  data-path="zip"
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

export default AddLocation;
