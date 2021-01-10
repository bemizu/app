import Layout from "../components/layout";


import Image from "next/image"

import {
  Box, 
} from "@chakra-ui/react";

import theme from "../public/theme";


export default function Home() {
  return (

    <Layout title="Home">

      

      <Box position="relative" height={["calc(100vh - 70px)", "calc(100vh - 70px)", "calc(100vh - 80px)"]} >
      <Image
        src="/index.jpg"
        layout="fill"
        objectFit="cover"
        alt="Home"
      />
      </Box>

      </Layout>
  )
}
