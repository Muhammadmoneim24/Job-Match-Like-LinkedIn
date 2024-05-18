import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { blue, purple, red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";

const userChat = {
  userData: {
    name: "Bob",
    image: "Bob.jpg",
  },
  chat: [
    {
      text: "Hey Bob!",
      writer: "Me",
    },
    {
      text: "Hi there!",
      writer: "Bob",
    },
    {
      text: "How's your day going?",
      writer: "Me",
    },
    {
      text: "It's been pretty good, thanks for asking! How about yours?",
      writer: "Bob",
    },
    {
      text: "Not bad, just keeping busy. Any exciting plans for the weekend?",
      writer: "Me",
    },
    {
      text: "I'm thinking about going for a hike. What about you?",
      writer: "Bob",
    },
    {
      text: "Probably just relaxing at home. Sounds nice though!",
      writer: "Me",
    },
    {
      text: "Yeah, it should be a good time. Well, I'll let you get back to your day. Talk to you later!",
      writer: "Bob",
    },
    {
      text: "Sure thing, catch you later!",
      writer: "Me",
    },
    {
      text: "Hey Bob!",
      writer: "Me",
    },
    {
      text: "Hi there!",
      writer: "Bob",
    },
    {
      text: "How's your day going?",
      writer: "Me",
    },
    {
      text: "It's been pretty good, thanks for asking! How about yours?",
      writer: "Bob",
    },
    {
      text: "Not bad, just keeping busy. Any exciting plans for the weekend?",
      writer: "Me",
    },
    {
      text: "I'm thinking about going for a hike. What about you?",
      writer: "Bob",
    },
    {
      text: "Probably just relaxing at home. Sounds nice though!",
      writer: "Me",
    },
    {
      text: "Yeah, it should be a good time. Well, I'll let you get back to your day. Talk to you later!",
      writer: "Bob",
    },
    {
      text: "Sure thing, catch you later!",
      writer: "Me",
    },
  ],
};

console.log(userChat);
const userChatList = userChat.chat.map((message) => {
  return (
    <div
      style={{
        direction: message.writer === "Me" ? "rtl" : "ltr",
      }}
    >
      <p
        style={{
          backgroundColor: message.writer === "Me" ? blue[900] : purple[900],

          color: "#fff",
          maxWidth: "50%",
          width: "fit-content",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {message.text}
      </p>
    </div>
  );
});
export default function ChatInterface() {
  return (
    <Card
      sx={{
        width: 900,
        height: "calc(100vh - 62px)",
        overflow: "none",
        borderRadius: "0",
      }}
    >
      <header
        style={{ background: purple[900], padding: "10px", height: "68px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Avatar
            sx={{ color: "#fff" }}
            alt={userChat.userData.name}
            src={userChat.userData.image}
          />
          <Typography
            variant="h6"
            sx={{ color: "#fff", fontSize: "15px", fontWeight: "bold" }}
          >
            {userChat.userData.name}
          </Typography>
        </div>
      </header>

      <CardContent
        sx={{
          height: "calc(100vh - 172px)",
          overflow: "auto",
          padding: "5px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {userChatList}
      </CardContent>
      <CardActions sx={{ height: "42px", padding: "0", paddingLeft: "5px" }}>
        <TextField
          id="standard-basic"
          label="send Message"
          variant="standard"
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          sx={{
            borderRadius: "0",
            background: purple[900],
            "&:hover": {
              background: purple[500],
              color: "#fff",
            },
          }}
        >
          send
        </Button>
      </CardActions>
    </Card>
  );
}
