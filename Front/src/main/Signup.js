import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
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

export default function Signup() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    username: "",
    password: "",
    image: null,
  });
  function handleSignupInputs(e, name) {
    if (name === "image") {
      setSignupForm({ ...signupForm, [name]: e.target.files[0] });
    } else {
      setSignupForm({ ...signupForm, [name]: e.target.value });
    }
  }
  async function handelSignupBtn(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", signupForm.name);
    formData.append("username", signupForm.username);
    formData.append("password", signupForm.password);
    formData.append("image", signupForm.image);
    try {
      const response = await axios.post(
        "https://databaseproj.runasp.net/api/Auth/Register",
        formData
      );
      console.log("Success:", response);
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div>
      <Button onClick={handleOpen} color="secondary">
        sign up
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
                label="Name"
                variant="standard"
                sx={{ width: "100%" }}
                value={signupForm.name}
                onChange={(e) => {
                  handleSignupInputs(e, "name");
                }}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                sx={{ width: "100%" }}
                value={signupForm.username}
                onChange={(e) => {
                  handleSignupInputs(e, "username");
                }}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="standard-basic"
                label="Password"
                type="Password"
                variant="standard"
                sx={{ width: "100%" }}
                value={signupForm.password}
                onChange={(e) => {
                  handleSignupInputs(e, "password");
                }}
              />
            </Grid>
            <Grid xs={12}>
              <input
                type="file"
                accept="image/*"
                style={{
                  width: "100%",

                  padding: "10px 0",
                  borderBottom: "1px solid #999",
                  fontSize: "18px",
                }}
                onChange={(e) => {
                  handleSignupInputs(e, "image");
                }}
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
                color="secondary"
                onClick={(e) => handelSignupBtn(e)}
              >
                sign up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
