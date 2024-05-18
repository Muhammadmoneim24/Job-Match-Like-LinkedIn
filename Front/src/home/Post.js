import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { blue, purple } from "@mui/material/colors";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link, json } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { usePost } from "../context/PostContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    zIndex: "10000",
  };
  function getRandomDarkColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    do {
      color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (isLightColor(color)); // Check if the color is light

    return color;
  }

  function isLightColor(color) {
    // Convert hex color to RGB
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);

    // Calculate luminance (perceived brightness)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if the color is light, false otherwise
    return luminance > 0.5;
  }

  const hashtags = ["front end", "ui ux", "front end", "ui ux"];
  const user = JSON.parse(localStorage.getItem("user"));
  const hashtagsList = useMemo(() => {
    return hashtags.map((hashtag, index) => {
      return (
        <p
          key={index}
          style={{
            background: getRandomDarkColor(),
            color: "#fff",
            padding: "10px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
          }}
        >
          {hashtag}
        </p>
      );
    });
  }, []);
  const [postList, setPostList] = useState(false);
  function handleOpenPostList(e) {
    e.stopPropagation();

    setPostList(postList === false ? true : false);
  }
  function handleEditClosePostList() {
    setPostList(false);
  }
  // edit post controll //
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditClickOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const { handelRenderPost } = usePost();
  const [editPostForm, seteditPostForm] = useState({
    title: post.title,
    body: post.body,
  });

  function handleEditPostInputs(e, name) {
    seteditPostForm({ ...editPostForm, [name]: e.target.value });
  }

  async function handelEditPostBtn(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(`https://databaseproj.runasp.net/api/Posts/GetPost/${post.id}`);

    try {
      const response = await axios.put(
        `https://databaseproj.runasp.net/api/Posts/EditPost/${post.id}`,
        editPostForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Success:", response);
      handelRenderPost();
      handleEditClose();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  //***** */ edit post controll***** //

  // delete post control //
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpen = () => setOpenDelete(true);
  const handleClose = () => setOpenDelete(false);
  async function handleDeletePostBtn() {
    const token = localStorage.getItem("token");
    console.log(`https://databaseproj.runasp.net/api/Posts/GetPost/${post.id}`);

    try {
      const response = await axios.delete(
        `https://databaseproj.runasp.net/api/Posts/DeletePost/${post.id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Success:", response);
      handelRenderPost();
      handleEditClose();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // ****delete post control**** //

  return (
    <Card
      className="post"
      style={{ marginTop: "30px" }}
      onClick={handleEditClosePostList}
    >
      <CardHeader
        sx={{ background: purple[900], height: "40px", position: "relative" }}
        avatar={
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Avatar
              sx={{ width: 24, height: 24 }}
             // alt={post.author.name}
             // src={post.author.profile_image}
            />{" "}
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontSize: "15px", fontWeight: "bold" }}
            >
             {post?.author?.name}
            </Typography>
          </div>
        }
        action={
          <div>
            {post?.author?.id === user?.id ? (
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
                aria-label="settings"
                onClick={(e) => handleOpenPostList(e)}
              >
                <MoreVertIcon sx={{ color: "#fff" }} />
              </IconButton>
            ) : (
              ""
            )}

            <List
              style={{
                position: "absolute",
                top: "40px",
                right: "15px",
                background: purple[800],
                color: "#fff",
                visibility: postList === false ? "hidden" : "visible",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton onClick={handleEditClickOpen}>
                  <ListItemIcon>
                    <EditNoteIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </ListItemButton>
                <Modal
                  open={openEdit}
                  onClose={handleEditClose}
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
                          onChange={(e) => handleEditPostInputs(e, "title")}
                          value={editPostForm.title}
                        />
                      </Grid>
                      <Grid xs={12}>
                        <TextField
                          id="standard-basic"
                          label="body"
                          variant="standard"
                          sx={{ width: "100%" }}
                          onChange={(e) => handleEditPostInputs(e, "body")}
                          value={editPostForm.body}
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
                        <Button
                          variant="contained"
                          onClick={(e) => handelEditPostBtn(e)}
                        >
                          edit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleOpen}>
                  <ListItemIcon>
                    <DeleteForeverOutlinedIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </ListItemButton>
                <Modal
                  open={openDelete}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Are you sure you want to delete this post?
                    </Typography>
                    <div style={{ float: "right" }}>
                      <Button onClick={handleClose} sx={{ mr: 2, mt: 2 }}>
                        Close
                      </Button>

                      <Button
                        onClick={handleDeletePostBtn}
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </ListItem>
            </List>
          </div>
        }
      />
      <Divider sx={{ marginBottom: "15px", backgroundColor: "#777" }} />

      {post.image !== "" && (
        <CardMedia
          component="img"
          image={post.image}
          sx={{ width: "95%", margin: "auto" }}
        />
      )}

      <CardContent>
        <p style={{ color: "#888", fontSize: "14px" }}>{post.created_at}</p>
        <Typography variant="h5" color="text.primary">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <Divider />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
          padding: "0 15px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/Comments", { state: { id: post.id } });
          }}
        >
          <InsertCommentOutlinedIcon
            sx={{ color: blue[500], marginTop: "6px" }}
          />
          <p style={{ color: blue[400] }}>({post.comments_count})comments</p>
        </div>

        <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
          {hashtagsList}
        </div>
      </div>
    </Card>
  );
}
