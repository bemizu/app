import { useRef } from "react";

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ButtonGroup,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";

import { Widget } from "@uploadcare/react-widget";
import { useState } from "react";

function EditProfile () {
  const widgetApi = useRef();
  const [user, setUser] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function setImage ( e ) {
    e.originalUrl;
    
  } 

  return (
    <Box>
      <Button size="sm" rounded="full" colorScheme="blue" onClick={onOpen}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={2} maxWidth="1000px">
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl mb={2}>
              <FormLabel>Username</FormLabel>

              <Input />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Full name</FormLabel>

              <Input />
            </FormControl>

            <Box mb={4}>
              <Button
                onClick={ () => widgetApi.current.openDialog() }
                rounded="full"
                colorScheme="orange"
                size="md"
              >
                Upload Image
              </Button>

              <Box display="none">
                <Widget
                  ref={widgetApi}
                  publicKey="8514f02a633e4dc5af92"
                  effects="all"
                  tabs="all"
                  previewStep={true}
                  imagesOnly={true}
                />
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} rounded="full">
              Close
            </Button>
            <Button colorScheme="green" rounded="full">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default EditProfile;
