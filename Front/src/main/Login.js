import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function Login() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  function handleLoginInputs(e, name) {
    setLoginForm({ ...loginForm, [name]: e.target.value });
  }
  async function handelLoginBtn(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://databaseproj.runasp.net/api/Auth/Login",
        loginForm
      );
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Success:", response);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Log in
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
                label="Email"
                variant="standard"
                sx={{ width: "100%" }}
                value={loginForm.username}
                onChange={(e) => handleLoginInputs(e, "username")}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                variant="standard"
                sx={{ width: "100%" }}
                value={loginForm.password}
                onChange={(e) => handleLoginInputs(e, "password")}
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
              <Button variant="contained" onClick={(e) => handelLoginBtn(e)}>
                Log in
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
