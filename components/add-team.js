
import { Widget } from "@uploadcare/react-widget";
import Session from "../contexts/session";
import VerticalAlign from "../components/verticalAlign"
import { BiPlus } from "react-icons/bi";
import Image from "next/image"
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
  const [member, setMember] = useState({});
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
      debugger
      return <Image src={member.image} objectFit="cover" layout="fill" />;
    }
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

  function setImage({ cdnUrl }) {
    let mem = member;
    mem.image = cdnUrl;
    setMember(mem);

    forceUpdate()
    // save org
  }


  return (
    <Box>
      <Button size="sm" rounded="sm" colorScheme="yellow" onClick={onOpen}>
        Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent rounded="sm" mx={4}>
          <form onSubmit={formSubmit}>
            <ModalHeader>Add Team Member</ModalHeader>
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
                  data-path="name"
                  value={ member.name }
                  onChange={update}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Title</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  data-path="title"
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
