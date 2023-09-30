import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setUserData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}login`, userData)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        axios.get(`${process.env.REACT_APP_BASE_URL}users`).then((res) => {
          localStorage.setItem(
            "user",
            JSON.stringify(
              res.data.find((user) => user.email === userData.email)
            )
          );
          navigate("/allbooks");
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "350px",
          marginX: "auto",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 1, textAlign: "center" }}>
          Login
        </Typography>
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
          type="password"
          value={userData.password}
          onChange={(e) => {
            handleChange("password", e.target.value);
          }}
        />
        <Button variant="contained" sx={{ marginTop: 2 }} type="submit">
          Submit
        </Button>
        <Typography variant="p" sx={{ marginTop: 1, textAlign: "center" }}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </Typography>
      </Box>
    </form>
  );
};

export default Login;
