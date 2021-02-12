import { useRef } from "react";
import userbase from "userbase-js";

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
  Textarea,
} from "@chakra-ui/react";

import { Widget } from "@uploadcare/react-widget";
import { useState } from "react";
import Session from "../../contexts/session";

function EditProfile() {
  const session = Session((state) => state);
  const widgetApi = useRef();
  const [user, setUser] = useState(session.user);
  const [profile, setProfile] = useState(user.profile || {});
  const { isOpen, onOpen, onClose } = useDisclosure();

  function setImage(e) {
    debugger;
    let updatedProfile = profile;
    updatedProfile.profileImg = e.originalUrl;
    setProfile(updatedProfile);
  }

  function update(e) {
    let updatedUser = user;
    updatedUser[e.currentTarget.dataset.path] = e.currentTarget.value;
    setUser(updatedUser);
  }

  function updateProfile(e) {
    let updatedProfile = profile;
    updatedProfile[e.currentTarget.dataset.path] = e.currentTarget.value;
    setProfile(updatedProfile);
  }

  function updateSessionNewUser() {
    session.setUser(user);
    onClose();
  }

  function save() {
    userbase
      .updateUser({
        username: user.username,
        profile,
      })
      .then(updateSessionNewUser.bind(this))
      .catch((e) => console.error(e));
  }

  let profileImg = profile.profileImg ? (
    <Box
      rounded="full"
      overflow="hidden"
      borderWidth={2}
      height="100px"
      width="100px"
    >
      <img src={profile.profileImg} style={{ height: 100, width: 100 }} />{" "}
    </Box>
  ) : (
    <Box bg="blue.500" height="100px" width="100px">
      {" "}
    </Box>
  );

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

              <Input
                defaultValue={user.username}
                data-path="username"
                onChange={update}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Full name</FormLabel>

              <Input
                defaultValue={profile.fullName}
                data-path="fullName"
                onChange={updateProfile}
              />
            </FormControl>

            <Box mb={2}>{profileImg}</Box>

            <Box mb={4}>
              <Button
                onClick={() => widgetApi.current.openDialog()}
                rounded="full"
                colorScheme="orange"
                size="sm"
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
                  onChange={setImage}
                />
              </Box>
            </Box>

            <FormControl mb={2}>
              <FormLabel>Bio</FormLabel>

              <Textarea
                defaultValue={profile.bio}
                data-path="bio"
                onChange={ updateProfile }
              />
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Skills</FormLabel>

              <Textarea
                defaultValue={profile.skills}
                data-path="skills"
                onChange={ updateProfile }
              />
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Availability</FormLabel>

              <Textarea
                defaultValue={profile.availability}
                data-path="availability"
                onChange={ updateProfile }
              />
            </FormControl>

          
            <FormControl mb={2}>
              <FormLabel>Certifications</FormLabel>

              <Textarea
                defaultValue={profile.certifications}
                data-path="certifications"
                onChange={ updateProfile }
              />
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>References</FormLabel>

              <Textarea
                defaultValue={profile.references}
                data-path="references"
                onChange={ updateProfile }
              />
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Resume</FormLabel>

              <Textarea
                defaultValue={profile.resume}
                data-path="resume"
                onChange={ updateProfile }
              />
            </FormControl>

            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} rounded="full">
              Close
            </Button>
            <Button colorScheme="green" rounded="full" onClick={save}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default EditProfile;
