
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

const Header =  () => {
    return  <Grid gridTemplateColumns="100px calc(100% - 100px)" bg={ theme.blue } height={["60px", "60px",  "70px"]} position="fixed" width="100vw" zIndex="600" top={"0"} px={ 5 }>

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
            <Link href="/login">
            <Button rounded="full" colorScheme="green" float="right">
          Login

      </Button>
      </Link>
      </VerticalAlign>

      </Box>

    </Grid>

}

export default Header;