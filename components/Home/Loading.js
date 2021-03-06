import {
    Box,
    Spinner, 
} from "@chakra-ui/react";
import Layout from "../layout";

function Loading() {
  return (
    <Layout title="Loading...">
      <Box textAlign="center" py="25vh">
        <Spinner size="md" />
      </Box>
    </Layout>
  );
}

export default Loading;
