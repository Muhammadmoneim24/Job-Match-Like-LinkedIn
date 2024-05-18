import Nav from "./Navbar";
import Post from "./Post";
import Container from "@mui/material/Container";
import { usePost } from "../context/PostContext";
import { useEffect, useMemo, useState } from "react";
import AddPostBtn from "./AddPostBtn";
import Sidebar from "./Sidebar";
import { useControlSidebarContext } from "../context/ControlSidebarContext";

export default function Home() {
  const { open, toggleDrawer } = useControlSidebarContext();

  const { posts } = usePost();
  const postsList = useMemo(() => {
    return posts.map((post) => {
      return <Post key={post.id} post={post} />;
    });
  }, [posts]);
  console.log(posts);
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
