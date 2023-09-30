import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setUserData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}register`, userData)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/dashboard");
        console.log(res);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "350px",
          marginX: "auto",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 1, textAlign: "center" }}>
          Signup
        </Typography>
        <TextField
          label="Name"
          variant="standard"
          value={userData.name}
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
        />
        <TextField
          label="Email"
          variant="standard"
          value={userData.email}
          onChange={(e) => {
            handleChange("email", e.target.value);
          }}
        />
        <TextField
          label="Password"
          variant="standard"
          value={userData.password}
          onChange={(e) => {
            handleChange("password", e.target.value);
          }}
        />
        <Button variant="contained" sx={{ marginTop: 2 }} type="submit">
          Submit
        </Button>
        <Typography variant="p" sx={{ marginTop: 1, textAlign: "center" }}>
          Already have an? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </form>
  );
};

export default Signup;
