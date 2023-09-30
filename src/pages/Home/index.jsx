import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Welcome to Cloud Book Writer
      </Typography>
      {accessToken ? (
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => {
            navigate("/allbooks");
          }}
        >
          Explore Books
        </Button>
      ) : (
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Please Login to create or collaborate on books
        </Typography>
      )}
    </Box>
  );
};

export default Home;
