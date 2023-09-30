import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import CreateBookModal from "./Components/CreateBookModal";
import BookCard from "./Components/BookCard";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}books`).then((res) => {
      setBooks(res.data);
    });
  }, []);
  return (
    <>
      <CreateBookModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setBooks={setBooks}
      />
      <Box sx={{ padding: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
            sx={{ marginTop: 1 }}
            variant="contained"
          >
            Create Book
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {books.length > 0 && books.map((book) => <BookCard book={book} />)}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
