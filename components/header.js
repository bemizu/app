
import VerticalAlign from "../components/verticalAlign";
import Image from "next/image";

import Link from 'next/link'


import {
    Box, 
    Button, 
    Grid,
    IconButton,
} from "@chakra-ui/react"

import {
    BsChevronUp
} from "react-icons/bs";

import theme from "../public/theme";

export default () => {
    return  <Grid gridTemplateColumns="100px calc(100% - 100px)" bg={ theme.blue } height={["70px", "70px",  "80px"]} position="fixed" width="100vw" zIndex="600" top={["none", "none", "0"]} bottom={["0", "0", "none"]} px={ 5 }>

        <Box>
            <VerticalAlign>
                <Link href="/">
            <Image
        src="/bemizu.jpg"
        width={ 60 }
        height={ 60 }
        
        alt="Home"
      />
      </Link>

      
            </VerticalAlign>
            </Box>

            <Box >
                <VerticalAlign>

            <Button rounded="full" colorScheme="green" float="right">
          Login

      </Button>
      </VerticalAlign>

      </Box>

    </Grid>

}