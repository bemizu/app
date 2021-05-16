import {
  Box,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Button,
  Grid,
  Divider,
  Container,
} from "@chakra-ui/react";
import Loading from "../components/Home/Loading";
import Layout from "../components/layout";
import ThemeBox from "../components/theme-box";
import PageContainer from "../components/pageContainer";
import styled from "@emotion/styled";
import theme from "../public/theme";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Session from "../contexts/session";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigator from "../components/navigator";
import { GetUser } from "../utils/getUser";

// import { CometChatUI } from "../utils/CometChatWorkspace/src";

const Styles = styled.div``;

function Page() {
  const router = useRouter();
  const session = Session(state => state);
  const { user } = useAuth0();

  useEffect(() => {
    if (!session.user) {
      GetUser(user, session);
    } 
  }, []);

  function loginCometUser() {
    const { CometChat } = require("@cometchat-pro/chat");

    const appID = "3153787f279591c";
    const region = "us";
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now call login function.
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );

    const authKey = "6b6bb3fcbecab56d80f96189ff2a77c8d20b6dcc";
    const uid = session.user.id;

    if (session.user.comet) {
      CometChat.login(uid, authKey).then(
        (user) => {
          console.log("Login Successful:", { user });
        },
        (error) => {
          console.log("Login failed with exception:", { error });
        }
      );
    } else {
      var user = new CometChat.User(session.user.id);
      user.setName(session.user.fullName);

      CometChat.createUser(user, authKey).then(
        (user) => {
          console.log("user created", user);
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  }




  if ( !session.organization ) {
    return <Loading />;
  }

  return (
    <Layout title="Messages">
      <PageContainer path={router.pathname}>
        <ThemeBox>
        <Heading>Messages</Heading>
        <Divider mb={3} />
        </ThemeBox>

        {/* <CometChatUI /> */}

      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});
