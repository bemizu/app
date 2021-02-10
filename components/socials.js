import Image from "next/image";

import {
    Grid,
    Box,
} from "@chakra-ui/react";


function Socials() {
    return (
        <Box textAlign={["center", "center", "left"]}>
        <Grid gridTemplateColumns={"repeat(5, 1fr)"} gap={4} maxWidth="300px" display="inline-grid">

            <Box rounded="md" height="30px" overflow="hidden" >
                <a href="https://instagram.com/bemizu" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/instagram-icon.svg"
                        width={30}
                        height={30}
                    />
                </a>

            </Box>


            <Box rounded="md" height="30px" overflow="hidden">
                <a href="https://twitter.com/bemizu" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/twitter-icon.svg"
                        width={30}
                        height={30}
                    />
                </a>

            </Box>

            <Box rounded="md" height="30px" overflow="hidden">

                <a href="https://www.linkedin.com/in/bemizu/" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/linkedin-icon.svg"
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