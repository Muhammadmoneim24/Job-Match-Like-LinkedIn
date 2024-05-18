import React from "react";
import FriendListPanel from "./FriendListPanel";
import ChatInterface from "./ChatInterface";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
export default function ChatWindow() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "calc(100vh - 62px)",
        marginTop: "31px",
        overflow: "hidden",
      }}
    >
      <Stack direction="row" spacing={0}>
        <FriendListPanel />
        <ChatInterface />
      </Stack>
    </Container>
  );
}
