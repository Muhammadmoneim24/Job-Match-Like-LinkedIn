import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { blue, purple } from "@mui/material/colors";
import Nav from "../home/Navbar";
import Post from "../home/Post"; // Import your Post component
import { useLocation } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useControlSidebarContext } from "../context/ControlSidebarContext";
import Sidebar from "../home/Sidebar";
export default function Comments() {
  const { open, toggleDrawer } = useControlSidebarContext();
  const location = useLocation();
  const [postId, setPostId] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [newComment, setNewComment] = useState({
    body: "",
  });
  const [rerenderPost, setrerenderPost] = useState(false);
  useEffect(() => {
    if (location.state && location.state.id) {
      setPostId(location.state.id);
    }
  }, [location.state]);

  async function fetchPostData() {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://tarmeezacademy.com/api/v1/posts/${postId}`
      );
      console.log(response.data.data);
      setPost(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (postId) {
      fetchPostData();
    }
  }, [postId, rerenderPost]);

  async function handelNewComment() {
    try {
      const response = await axios.post(
        `https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Success:", response);
      setrerenderPost(!rerenderPost);
      setNewComment({});
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div>
      <Nav open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />

      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {post && <Post post={post} />}
            <Divider />
            {/* Comment Form */}
            <div style={{ display: "flex", margin: "10px" }}>
              <TextField
                id="standard-basic"
                label="add comment"
                variant="standard"
                sx={{ flexGrow: 1 }}
                onChange={(e) =>
                  setNewComment({ ...newComment, body: e.target.value })
                }
                value={newComment.body}
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
                onClick={handelNewComment}
              >
                send
              </Button>
            </div>

            {/* Comments Section */}
            {post &&
              post.comments.map((comment, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    marginBottom: "10px",
                    padding: "10px",
                  }}
                >
                  <Stack direction="row" spacing={1} style={{}}>
                    <Avatar
                      alt={comment.author.name}
                      src={comment.author.profile_image}
                    />
                    <p
                      style={{
                        alignSelf: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {comment.author.name}
                    </p>
                  </Stack>
                  <p style={{ paddingLeft: "15px", fontSize: "20px" }}>
                    {comment.body}
                  </p>
                  <Divider sx={{ background: blue[500] }} />
                </div>
              ))}
          </>
        )}
      </Container>
    </div>
  );
}
