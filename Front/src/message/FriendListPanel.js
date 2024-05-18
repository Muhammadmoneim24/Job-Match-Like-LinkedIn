import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { blue, purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
export default function FriendListPanel() {
  const [user, setUser] = React.useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  console.log(user);
  const friends = [
    {
      name: "User 1",
      profile_image: "image1.jpg",
    },
    {
      name: "User 2",
      profile_image: "image2.jpg",
    },
    {
      name: "User 3",
      profile_image: "image3.jpg",
    },
    {
      name: "User 4",
      profile_image: "image4.jpg",
    },
    {
      name: "User 5",
      profile_image: "image5.jpg",
    },
    {
      name: "User 1",
      profile_image: "image1.jpg",
    },
    {
      name: "User 2",
      profile_image: "image2.jpg",
    },
    {
      name: "User 3",
      profile_image: "image3.jpg",
    },
    {
      name: "User 4",
      profile_image: "image4.jpg",
    },
    {
      name: "User 5",
      profile_image: "image5.jpg",
    },
    {
      name: "User 1",
      profile_image: "image1.jpg",
    },
    {
      name: "User 2",
      profile_image: "image2.jpg",
    },
    {
      name: "User 3",
      profile_image: "image3.jpg",
    },
    {
      name: "User 4",
      profile_image: "image4.jpg",
    },
    {
      name: "User 5",
      profile_image: "image5.jpg",
    },
  ];
  const [activeFriend, setActiveFriend] = useState(null);
  const friendsList = friends.map((friend, index) => {
    return (
      <Stack
        onClick={() => setActiveFriend(index)}
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          cursor: "pointer",
          padding: "10px",
          backgroundColor: activeFriend === index ? blue[500] : "transparent",
        }}
      >
        <Avatar alt={friend.name} src={friend.profile_image} />
        <h4
          style={{
            color: activeFriend === index ? "#fff" : blue[900],
          }}
        >
          {friend.name}
        </h4>
      </Stack>
    );
  });

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          height: "calc(100vh - 62px)",
          overflow: "hidden",
          borderRadius: "0",
        }}
      >
        <header
          style={{ background: purple[900], padding: "10px", height: "68px" }}
        >
          <Stack direction="row" spacing={2}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Avatar
                sx={{ color: "#fff" }}
                alt={user.name || "User"}
                src={user.profile_image || ""}
              />
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontSize: "15px", fontWeight: "bold" }}
              >
                {user.name}
              </Typography>
            </div>

            <Stack direction="row" spacing={1}>
              <FormControl variant="standard">
                <InputLabel
                  htmlFor="input-with-icon-adornment"
                  sx={{ color: "white" }}
                >
                  Find a User
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle
                        sx={{
                          color: "white",
                        }}
                      />
                    </InputAdornment>
                  }
                  sx={{
                    color: "white",
                    "&:hover": {
                      borderBottomColor: blue[500],
                    },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: blue[500],
                    },
                  }}
                />
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: blue[900],
                  "&:hover": {
                    backgroundColor: blue[500],
                  },
                }}
              >
                {/* Set button background color */}
                Search
              </Button>
            </Stack>
          </Stack>
        </header>
        <CardContent
          sx={{
            height: "calc(100vh - 130px)",
            overflow: "auto",
            padding: "0px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {friendsList}
        </CardContent>
      </Card>
    </>
  );
}
