import Link from "next/link";
import Image from "next/image";
import { Box, Heading, Button,  Container } from "@chakra-ui/react";
import Layout from "../components/layout";
import Section from "../components/section";
import styled from "@emotion/styled";
import theme from "../public/theme";
import Flickity from "react-flickity-component";
import VerticalAlign from "../components/verticalAlign";
import { providers, signIn } from 'next-auth/client'
import { useAuth0 } from "@auth0/auth0-react";

const Styles = styled.div`
    .flickity-viewport {
        overflow: hidden;
        outline: none;
    }

    .carousel {
        outline: none;

        .flickity-button {
            display: none;
        }

        .flickity-page-dots {
            position: absolute;
            width: 100%;
            height: 50px;
            bottom: -10px;
            text-align: center;

            .dot {
                display: inline-block;
                margin: 0px 10px;
                width: 11px;
                height: 11px;
                border-radius: 50%;
                background: #C4C4C4;

                &.is-selected {
                    background: ${ theme.blue };
                }
            }
        }
    }

    

    
`;

function Page( { providers }) {
  let { loginWithRedirect } = useAuth0()


  let sliders = [
    {
      text: "Offer your talents and look for opportunities set around your schedule",
      image: "/join-us/slide-1.svg",
    },

    {
        text: "Keep track of all of your jobs and personal events in one versatile calendar",
        image: "/join-us/slide-2.svg",
      },

      {
        text: "Get synced up with your team to provide the best value (inside or outside of work)",
        image: "/join-us/slide-3.svg",
      },
  ];

  const flickityOptions = {
    initialIndex: 0,
  };

  return (
    <Layout title="Join Us | Bemizu">
        <Box position="relative" overflow="hidden">

        <Box
            position="absolute"
            height={"110%"}
            width={["300%", "300%", "250%"]}
            left={["-100%", "-100%",  "-75%"]}
            zIndex="0"
            overflow="hidden"
          >
            <Box overflow="hidden">
              <VerticalAlign>
                <img
                  src="/pattern-vector.svg"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    bottom: 50,
                    objectFit: "cover",
                    opacity: 0.3,
                  }}
                />
                {/* <Image src="/pattern-vector.svg" layout="fill" /> */}
              </VerticalAlign>
            </Box>
          </Box>

      <Styles>
        <Section bg={ theme.white }>
          <Container maxWidth={theme.width} pt={[8, 5, 0]}>
              <Box  width={["100%", 400]} margin={["0px auto", ]} position="relative" overflow="hidden" pb={50} >

              
            <Flickity
              className={"carousel"} // default ''
              elementType={"div"} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
            >
              {sliders.map((el) => {
                return <Box width="100%" p={[0, 6]} mx={5} key={"flickity-" + el.image}>

                    <Box height={[280, 300, ]} position="relative" mb={4}>
                        <Image src={ el.image } layout="fill" objectFit="contain" />
                    </Box>

                    <Box textAlign="center">
                    { el.text }
                    </Box>
                </Box>;
              })}
            </Flickity>
            </Box>

            

            <Box textAlign="center" px={[0, 6]} width={["100%", 400]} m="15px auto">
              
                <Button colorScheme="orange" width="100%" rounded="sm" onClick={ loginWithRedirect }>
                    Log in
                </Button>
                

            </Box>
          </Container>
        </Section>
      </Styles>
      </Box>
    </Layout>
  );
}


Page.getInitialProps = async () => {
  return {
    providers: await providers()
  }
}

export default Page;