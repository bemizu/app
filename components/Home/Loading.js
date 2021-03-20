import {
    Box,
    Spinner, 
} from "@chakra-ui/react";
// import Layout from "../layout";

function Loading() {
  return (
      <Box textAlign="center" py="calc(50vh - 20px)">
        <Spinner size="md" />
      </Box>
  );
}

export default Loading;
