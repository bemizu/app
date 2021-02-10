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
} from "@chakra-ui/react";

function EditProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

          <ModalBody>asdf</ModalBody>

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
