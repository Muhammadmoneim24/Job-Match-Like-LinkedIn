import React, { useState } from "react";
import { usePost } from "../context/PostContext";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Modal from "@mui/material/Modal";
import axios from "axios";

const actions = [{ icon: <AlertDialog />, name: "add post" }];

export default function AddPostBtn() {
  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: "20px",
        right: "20px",
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

function AlertDialog() {
  const { handelRenderPost } = usePost();
  const [newPostForm, setNewPostForm] = useState({
    title: "",
    body: "",
    image: "",
    tags: [],
  });

  function handleNewPostInputs(e, name) {
    if (name === "image") {
      setNewPostForm({ ...newPostForm, [name]: e.target.files[0] });
    } else {
      setNewPostForm({ ...newPostForm, [name]: e.target.value });
    }
  }

  async function handelNewPostBtn(e) {
    e.preventDefault();
    console.log(newPostForm, 444);
    const formData = new FormData();
    formData.append("title", newPostForm.title);
    formData.append("body", newPostForm.body);
    formData.append("image", newPostForm.image);
    formData.append(`tags[${0}]`, newPostForm.tags);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "`https://databaseproj.runasp.net/api/Posts/AddPost",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Success:", response);
      handelRenderPost(); // Trigger re-render of posts
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ border: "none" }}
        className="add-post-btn"
      >
        +
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                id="standard-basic"
                label="title"
                variant="standard"
                sx={{ width: "100%" }}
                onChange={(e) => handleNewPostInputs(e, "title")}
                value={newPostForm.title}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="standard-basic"
                label="body"
                variant="standard"
                sx={{ width: "100%" }}
                onChange={(e) => handleNewPostInputs(e, "body")}
                value={newPostForm.body}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="standard-basic"
                label="tag"
                variant="standard"
                sx={{ width: "100%" }}
                onChange={(e) =>
                  setNewPostForm({ ...newPostForm, tags: e.target.value })
                }
                value={newPostForm.tags}
              />
            </Grid>
            <Grid xs={12}>
              <input
                type="file"
                style={{
                  width: "100%",
                  padding: "10px 0",
                  borderBottom: "1px solid #999",
                  fontSize: "18px",
                }}
                onChange={(e) => handleNewPostInputs(e, "image")}
              />
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{
                width: "100%",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <Button variant="contained" onClick={(e) => handelNewPostBtn(e)}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
