import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function CreateBookModal({ openModal, setOpenModal, setBooks }) {
  const handleClose = () => {
    setOpenModal(false);
    setBookData({ title: "" });
  };

  const [bookData, setBookData] = useState({
    title: "",
  });

  const handleChange = (key, value) => {
    setBookData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    delete user.password;
    const updatedBook = {
      title: bookData.title,
      author: user,
      id: uuidv4(),
      sections: {
        id: "root",
        name: bookData.title,
        children: [],
      },
    };

    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}books`, updatedBook)
      .then((res) => {
        setBooks((prevBooks) => [...prevBooks, res.data]);
        console.log(res);
        setBookData({ title: "" });
        handleClose();
      });
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a New Book
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TextField
                label="Title"
                variant="standard"
                value={bookData.title}
                onChange={(e) => {
                  handleChange("title", e.target.value);
                }}
              />
              <Button variant="contained" sx={{ marginTop: 2 }} type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
