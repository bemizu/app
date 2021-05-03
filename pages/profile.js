import { Widget } from "@uploadcare/react-widget";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  ButtonGroup,
  Link as ChakraLink,
  Heading,
  SimpleGrid,
  Button,
  Grid,
  Divider,
  Container,
  FormControl,
  FormLabel,
  HStack,
  FormHelperText,
  Input,
  Textarea,
  Select,
  Checkbox,
  useRadioGroup,
  useRadio,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { BiPlus, BiPhoneCall, BiMailSend } from "react-icons/bi";
import Loading from "../components/Home/Loading";
import Layout from "../components/layout";
import VerticalAlign from "../components/verticalAlign";
import styled from "@emotion/styled";
import theme from "../public/theme";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Session from "../contexts/session";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Navigator from "../components/navigator";
import PageContainer from "../components/pageContainer";
import { GetUser } from "../utils/getUser";
import { BiTrash } from "react-icons/bi";
import Image from "next/image";
import AddLocation from "../components/add-location";
import AddTeamMember from "../components/add-team";
import EditTeam from "../components/edit-team";
import EditLocation from "../components/edit-location";
import UploadClient from "@uploadcare/upload-client";

const Styles = styled.div``;
const client = new UploadClient({ publicKey: "8514f02a633e4dc5af92" });

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function Page() {
  const widgetApi = useRef();
  const router = useRouter();
  const session = Session((state) => state);
  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const [profileOrganization, setProfileOrganization] = useState({
    locations: [],
    jobs: [],
    team_members: [],
  });

  useEffect(() => {
    if (!session.user) {
      GetUser(user, session, setProfileUser, setProfileOrganization);
    } else {
      setProfileUser(session.user);
      setProfileOrganization(session.organization);
    }
  }, []);

  async function saveOrg(e) {
    e.preventDefault();

    let orgToUpdate = JSON.parse(JSON.stringify(profileOrganization));
    delete orgToUpdate.jobs;
    delete orgToUpdate.locations;
    delete orgToUpdate.team_members;

    const { data, error } = await session.supabase
      .from("organizations")
      .update(orgToUpdate)
      .match({ uuid: session.user.id });

    if (!error) {
      session.refreshOrg(session);
      toast.success("Update successful.");
    } else {
      console.log(error);
    }
  }

  async function removeLocation(e) {
    const { data, error } = await session.supabase
      .from("locations")
      .delete()
      .match({ id: e.currentTarget.dataset.id });

    if (!error) {
      session.refreshOrg(session);
    } else {
      console.log(error);
    }
  }

  async function removeTeam(id) {
    const { data, error } = await session.supabase
      .from("team_members")
      .delete()
      .match({ id });

    if (!error) {
      toast.success("Team member removed.");
      session.refreshOrg(session);
      // useForceUpdate()
    } else {
      console.log(error);
    }
  }

  function setImage({ cdnUrl }) {
    let org = profileOrganization;
    org.logo = cdnUrl;
    setProfileOrganization(org);

    // save org
  }

  function removeProfileImage() {
    // delete image uploadcare
    let org = profileOrganization;
    org.logo = "";
    setProfileOrganization(org);
    // save org
  }

  function profileImage() {
    if (profileOrganization.logo) {
      return <Image src={profileOrganization.logo} width="140" height="140" />;
    }
  }

  function removeImage() {
    if (profileOrganization.logo) {
      return (
        <Box>
          <ChakraLink fontSize="sm" color={theme.blue} onClick={deleteImage}>
            Remove
          </ChakraLink>
        </Box>
      );
    }
  }

  function deleteImage() {
    // https://ucarecdn.com/cf0aca01-6686-42b9-a8a7-86bb10ded568/

    let data = {
      storageId: profileOrganization.logo.split(".com/")[1].split("/")[0],
    };

    axios
      .put("/api/delete_image", {
        data,
      })
      .then((resp, b, c, d) => {
        debugger;
        removeProfileImage();
      })
      .catch((resp, b, c, d) => {
        debugger;
      });
  }

  function setBusinessSize(val) {
    let org = profileOrganization;
    org.businessSize = val;
    setProfileOrganization(org);
  }

  function update(e) {
    let org = profileOrganization;
    org[e.currentTarget.dataset.path] = e.currentTarget.value;
    setProfileOrganization(org);

    // switch ( e.currentTarget.dataset.path ) {
    //   case "name":

    //     break;

    //   default:
    //     break;
    // }
  }

  if (!profileOrganization.id) {
    return <Loading />;
  }

  return (
    <Layout title="Profile">
      <PageContainer path={router.pathname}>
        <Box rounded="lg" shadow="lg" p={[4, 4, 6]} bg="white" mb={5}>
          <Heading>
            Profile
            <Box
              display="inline-block"
              display="none"
              ml={3}
              height="100%"
              cursor="pointer"
              color={theme.darkBlue}
              _hover={{ color: theme.blue }}
              transition="0.2s ease"
              position="relative"
              top={2}
            >
              <VerticalAlign>
                <a href="/profile" target="_blank">
                  <AiOutlineEye />
                </a>
              </VerticalAlign>
            </Box>
          </Heading>

          <Divider mb={[5]} />

          <form onSubmit={saveOrg}>
            <Box mb={3}>
              <FormLabel>Logo</FormLabel>
              <Box
                position="relative"
                overflow="hidden"
                rounded="sm"
                bg="gray.400"
                color="gray.600"
                fontSize="22px"
                height="140px"
                width="140px"
                _hover={{ bg: "gray.300", color: "gray.400" }}
                transition="0.2s ease"
                cursor="pointer"
                textAlign="center"
                mb={2}
                onClick={() => widgetApi.current.openDialog()}
              >
                {profileImage()}
                <VerticalAlign>
                  <BiPlus
                    style={{
                      display: "inline-block",
                      position: "relative",
                      bottom: 3,
                      left: 2,
                    }}
                  />
                </VerticalAlign>
              </Box>

              <Box>{removeImage()}</Box>

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

              <Input
                bg="white"
                rounded="sm"
                type="hidden"
                defaultValue={profileOrganization.logo}
                onChange={update}
              />
            </Box>


            <Box>
              <FormControl isRequired mb={3}>
                <FormLabel>Username</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={profileOrganization.username}
                  data-path="username"
                  onChange={update}
                />
                
                <FormHelperText>
                  Lowercase letters and "-" only. For setting the url of your business page. 
                </FormHelperText>
              </FormControl>
            </Box>

            <Box>
              <FormControl isRequired mb={3}>
                <FormLabel>Name</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={profileOrganization.name}
                  data-path="name"
                  onChange={update}
                />
              </FormControl>
            </Box>

            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>

              <Textarea
                rows={10}
                bg="white"
                rounded="sm"
                placeholder="Add your mission statement"
                defaultValue={profileOrganization.overview}
                data-path="overview"
                onChange={update}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Website</FormLabel>

              <Input
                type="url"
                bg="white"
                rounded="sm"
                placeholder="https://example.com"
                defaultValue={profileOrganization.website}
                data-path="website"
                onChange={update}
              />
            </FormControl>

            <FormControl mb={3} display="none">
              <FormLabel>Culture</FormLabel>

              <Textarea
                bg="white"
                rounded="sm"
                placeholder="What makes you great"
                defaultValue={profileOrganization.culture}
                data-path="culture"
                onChange={update}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Industry</FormLabel>
              <Select
                placeholder="Select option"
                rounded="sm"
                data-path="industry"
                bg="white"
                defaultValue={profileOrganization.industry}
                onChange={update}
              >
                <option value="creative">Creative</option>
                <option value="events">Events</option>
                <option value="fitness">Fitness</option>
                <option value="hospitality">Hospitality</option>
                {/* <option value="real-estate">Real Estate</option> */}
                <option value="dining">Restaurant/Dining</option>
                <option value="transportation">Transportation</option>
                <option value="warehousing">Warehousing</option>
              </Select>
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Business Size</FormLabel>
              <BusinessSize
                org={profileOrganization}
                setBusinessSize={setBusinessSize}
              />
            </FormControl>

            <Button rounded="sm" colorScheme="orange" type="submit">
              Save
            </Button>
          </form>
        </Box>

        <Box rounded="lg" shadow="lg" p={[4, 4, 6]} bg="white" mb={5}>
          <Heading>Team Members</Heading>

          <Divider mb={[4]} />

          <Box>
            <SimpleGrid columns={[1]}  >
              {profileOrganization.team_members.map((el, idx) => {
                let image = el.image ? (
                  <Image src={el.image} layout="fill" objectFit="cover" />
                ) : (
                  ""
                );
                return (
                  <Box key={"mem" + el.id} >

                  <Grid templateColumns="80px calc(100% - 80px)" mb={2}>
                    <Box>
                    <Box
                      height="92px"
                      width="80px"
                      
                      position="relative"
                      bg={"gray.200"}
                      rounded="md"
                      overflow="hidden"
                      mb={1}
                    >
                      {image}
                    </Box>
                    </Box>

                    <Box pl={3} color={ theme.darkBlue }>

                    <Box>
                    <Box fontWeight="600" >
                      {el.name}
                    </Box>

                    <Box fontWeight="300" fontSize="lg" lineHeight="18px" mb={2}>
                      {el.title}
                    </Box>
                    </Box>


                    <ButtonGroup isAttached variant="solid" rounded="sm" >
                      <IconButton href={"phone:" + el.phone }  icon={<BiPhoneCall />} />
                      <IconButton variant="solid" href={"mailto:" + el.email }  icon={ <BiMailSend />} />
                      <IconButton variant="solid"   icon={ <EditTeam
                          el={el}
                          setProfileOrganization={setProfileOrganization}
                          /> } />
                      

<IconButton   variant="solid"   icon={ <AlertDialogExample id={el.id} callback={removeTeam} /> } />



                    </ButtonGroup>

                      

                    

                      
                      </Box>

                      
                     
                
                   

                   
                  </Grid>

                  <Divider mb={3} />
                  </Box>
                );
              })}
            </SimpleGrid>

            <AddTeamMember setProfileOrganization={setProfileOrganization} />
          </Box>
        </Box>

        
        <Box rounded="lg" shadow="lg" p={[4, 4, 6]} bg="white" mb={5}>

        <Heading>
          Locations
        </Heading>

        <Divider mb={2} />


        <Box>
          {profileOrganization.locations.map((el, idx) => {
            return (
              <Box key={"loc" + el.id}>
                <Box my={1}>
                  <Grid templateColumns="calc(100% - 80px) 60px" gap="20px">
                    <Box>
                      <VerticalAlign>
                        <Heading size="sm" fontWeight="500">
                          {el.title}
                        </Heading>
                      </VerticalAlign>
                    </Box>

                    <Box>
                      <SimpleGrid
                        columns={2}
                        fontSize="20px"
                        textAlign="center"
                        gap="2px"
                      >
                        <Box>
                          <EditLocation
                            el={el}
                            setProfileOrganization={setProfileOrganization}
                          />
                        </Box>

                        <Box>
                          <Box
                            data-id={el.id}
                            display="inline-block"
                            color="red.500"
                            cursor="pointer"
                            _hover={{ opacity: 0.7 }}
                            transition="0.2s ease"
                            onClick={removeLocation}
                          >
                            <BiTrash style={{ display: "inline-block" }} />
                          </Box>
                        </Box>
                      </SimpleGrid>
                    </Box>
                  </Grid>
                </Box>

                <Divider my={2} />
              </Box>
            );
          })}

          <Box mb={4} mt={4} display="none">
            <Checkbox>Remote available?</Checkbox>
          </Box>

          <AddLocation setProfileOrganization={setProfileOrganization} />
        </Box>

        </Box>
        



        <Box rounded="lg" bg="white" p={[4, 6]} mb={ 5 } shadow="lg">
          <Heading >
            Gallery
          </Heading>
          <Divider mb={2} />

        </Box>


      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        mb={4}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="sm"
        boxShadow="md"
        bg="white"
        _checked={{
          bg: theme.blue,
          color: "white",
          borderColor: "blue.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={3}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function BusinessSize(props) {
  const options = ["1-10", "11-20", "21-50", "51-100", "100+"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: props.org.businessSize,
    onChange: props.setBusinessSize,
  });

  console.log(props.org.businessSize);
  const group = getRootProps();

  return (
    <HStack {...group} spacing={2} wrap={"wrap"}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

function AlertDialogExample(props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  function actuallyRemove() {
    // remove

    props.callback(props.id);

    onClose();
  }

  return (
    <>
    
        <BiTrash style={{ display: "inline-block" }}  onClick={() => setIsOpen(true)} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Team Member
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                colorScheme="blue"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button colorScheme="green" onClick={actuallyRemove} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
