import Image from "next/image";

import {
    Grid,
    Box,
} from "@chakra-ui/react";


function Socials() {
    return (
        <Box textAlign={["center", "center"]}>
        <Grid gridTemplateColumns={"repeat(3, 1fr)"} gap={4} minWidth="200px" display="inline-grid">

            <Box rounded="md" height="30px" overflow="hidden" >
                <a href="https://instagram.com/bemizu" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/facebook.svg"
                        width={30}
                        height={30}
                    />
                </a>

            </Box>


            <Box rounded="md" height="30px" overflow="hidden">
                <a href="https://twitter.com/bemizu" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/twitter.svg"
                        width={30}
                        height={30}
                    />
                </a>

            </Box>

            <Box rounded="md" height="30px" overflow="hidden">

                <a href="https://www.linkedin.com/in/bemizu/" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/linkedin.svg"
                        width={30}
                        height={30}
                    />
                </a>

            </Box>








        </Grid>
        </Box>
    )
}

export default Socials;