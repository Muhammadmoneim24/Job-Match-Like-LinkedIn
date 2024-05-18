import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Main from "./main/Main";
import Comments from "./comments/Comments";
import { PostProvider } from "./context/PostContext";
import Profile from "./home/Profile";
import Authentication from "./error pags/Authentication";
import Error404 from "./error pags/Error404";
import { ControlSidebarProvider } from "./context/ControlSidebarContext";
import Message from "./message/ChatWindow";
import Settings from "./settings/Settings";
import UsersChat from "./message/FriendListPanel";
import ChatWindow from "./message/ChatWindow";

function App() {
  return (
    <div className="App">
      <ControlSidebarProvider>
        <PostProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Home />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/message" element={<ChatWindow />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </PostProvider>
      </ControlSidebarProvider>
    </div>
  );
}

export default App;
