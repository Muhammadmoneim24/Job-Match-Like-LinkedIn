import Nav from "./Navbar";
import Post from "./Post";
import Container from "@mui/material/Container";
import { usePost } from "../context/PostContext";
import { useEffect, useMemo, useState } from "react";
import AddPostBtn from "./AddPostBtn";
import { json } from "react-router-dom";
import { useControlSidebarContext } from "../context/ControlSidebarContext";
import Sidebar from "./Sidebar";
export default function Profile() {
  const { open, toggleDrawer } = useControlSidebarContext();

  const { posts } = usePost();
  console.log(posts);
  const user = JSON.parse(localStorage.getItem("user"));
  const postsList = useMemo(() => {
    return posts
      .filter((post) => post.author.id === user.id)
      .map((post) => <Post key={post.id} post={post} />);
  }, [posts]);

  return (
    <div>
      <Nav open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />

      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        {postsList}
      </Container>
      <AddPostBtn />
    </div>
  );
}
