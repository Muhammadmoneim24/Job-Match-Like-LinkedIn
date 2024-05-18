import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Authentication() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Authentication Required
      </h2>
      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
        You must be logged in to access this page.
      </p>
      <p style={{ fontSize: "16px", marginBottom: "30px" }}>
        Please log in to continue.
      </p>
      <Button component={Link} to="/" variant="contained" color="primary">
        Log In
      </Button>
    </div>
  );
}
