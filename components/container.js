import {
    Box, 
} from "@chakra-ui/react";

const Container = ( props ) => (
    <Box maxWidth="1200px" px={ 5 } margin="0 auto">

        { props.children }
    </Box>
)

export default Container;