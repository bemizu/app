import { Box, Container, Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Navigator from "./navigator";
import theme from "../public/theme"

const Styles = styled.div``;

function PageContainer( props ) {
  return (
    <Styles>
       <Container maxWidth="1200px" margin="0 auto" pl={[0, 0, 4]} pr={[0, 0, 4]}>
              <Grid gridTemplateColumns={["100%", "100%", "100px calc(100% - 110px)"]} gap={[0, 0, "10px"]} >
                  <Box my={[0, 0, 10]} position="relative">
                      <Navigator path={ props.path } />
                  </Box>
  
                  <Box  py={[0, 0, 8]}   minHeight={[400, 500, "500px"]} >
                      { props.children }
                  </Box>
  
  
              </Grid>
            
          </Container>
    </Styles>
  );
}

export default PageContainer;
