import React from "react";

export default function Error404() {
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
        Error 404: Page Not Found
      </h2>
      <p style={{ fontSize: "16px", marginBottom: "30px" }}>
        Sorry, the page you are looking for could not be found.
      </p>
    </div>
  );
}
