import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar } from "@mui/material";
import { blue, purple } from "@mui/material/colors";
import ExpandLess from "@mui/icons-material/ExpandLess";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import TuneIcon from "@mui/icons-material/Tune";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useNavigate } from "react-router-dom";
export default function Sidebar({ open, toggleDrawer }) {
  const navigate = useNavigate();
  function handelRouteNav(e, page) {
    console.log(page);
    if (page === "message") {
      navigate("/message");
    } else if (page === "profile") {
      navigate("/profile");
    } else if (page === "Log out") {
      navigate("/");
      localStorage.clear();
    } else if (page === "Settings") {
      navigate("/settings");
    }
  }
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  console.log(user);
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div
        onClick={(e) => handelRouteNav(e, "profile")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          paddingLeft: "10px",
          background: blue[900],
          height: "68px",
          marginBottom: "5px",
          cursor: "pointer",
        }}
      >
        <Avatar alt={user.name} src={user.profile_image} />
        <h4 style={{ color: "#fff" }}>{user.name}</h4>
      </div>
      <FilterList />
      <ListItem disablePadding>
        <ListItemButton onClick={(e) => handelRouteNav(e, "message")}>
          <ListItemIcon>
            <EmailOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Message" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <List>
        {["Settings", "Log out"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={(e) => handelRouteNav(e, text)}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <SettingsOutlinedIcon />
                ) : (
                  <LogoutOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

function FilterList() {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={(e) => handleClick(e)}>
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Filter" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ paddingLeft: "20px" }}>
          {["Front end", "Back end", "Data base", "Ui Ux", "ai"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Collapse>
    </>
  );
}
