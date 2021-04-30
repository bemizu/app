
import { Widget } from "@uploadcare/react-widget";
import Session from "../contexts/session";
import VerticalAlign from "./verticalAlign"
import { BiPlus } from "react-icons/bi";
import Image from "next/image"
import toast from 'react-hot-toast';
import {
  BiEdit,
} from "react-icons/bi"
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
import { useState, useRef } from "react";

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}



function AddLocation(props) {
  const session = Session((state) => state);
  const [member, setMember] = useState( props.el );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const widgetApi = useRef();
  const forceUpdate = useForceUpdate();




  function update(e) {
    let mem = member;
    mem[e.currentTarget.dataset.path] = e.currentTarget.value;
    setMember(mem);
  }



  function profileImage() {
    if (member.image) {
      return <Image src={member.image} objectFit="cover" layout="fill" />;
    }
  }


  async function formSubmit(e) {
    e.preventDefault();

    let mem = member;
    

    const { data, error } = await session.supabase
      .from("team_members")
      .update([mem])
      .match({ id: parseInt(mem.id) });

    if (!error) {
      let val = session.refreshOrg( session );

      if ( val ) {
        onClose();
      } else {
        toast.error('There was an error.');
      }
     
    } else {
      console.log(error);
    }
  }

  function setImage({ cdnUrl }) {
    let mem = member;
    mem.image = cdnUrl;
    setMember(mem);

    forceUpdate()
    // save org
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
            <ModalHeader>Edit Team Member</ModalHeader>
            <ModalCloseButton />
            <ModalBody>


            <Box
                position="relative"
                overflow="hidden"
                rounded="sm"
                bg="gray.400"
                color="gray.600"
                fontSize="22px"
                height="140px"
                width="115px"
                _hover={{ bg: "gray.300", color: "gray.400" }}
                transition="0.2s ease"
                cursor="pointer"
                textAlign="center"
                onClick={() => widgetApi.current.openDialog()}
                mb={5}
              >
                {profileImage()}
                <VerticalAlign>
                  <BiPlus
                    style={{
                      display: "inline-block",
                      position: "relative",
                      bottom: 3,
                      left: 2,
                      zIndex: 0
                    }}
                  />
                </VerticalAlign>
              </Box>


              <Box position="relative">
                <Box opacity="0" position="absolute" zIndex={-1}>
                  <Widget
                    imagesOnly={true}
                    ref={widgetApi}
                    publicKey="8514f02a633e4dc5af92"
                    onChange={setImage}
                  />
                </Box>
              </Box>

          


              <FormControl isRequired mb={3}>
                <FormLabel>Name</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={  member.name }
                  data-path="name"
                  onChange={update}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Title</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  data-path="title"
                  defaultValue={  member.title }
                  onChange={update}
                />
              </FormControl>


              <FormControl isRequired mb={3}>
                <FormLabel>Email</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  type="email"
                  data-path="email"
                  defaultValue={  member.email }
                  onChange={update}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Phone</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  type="phone"
                  data-path="phone"
                  defaultValue={  member.phone }
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
