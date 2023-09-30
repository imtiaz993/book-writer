import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Card sx={{ width: 275, marginBottom: 2 }} key={book.id}>
      <CardContent>
        <Typography variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {book.author.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        {(user.id === book.author.id ||
          book.collaborators.find((item) => item.id === user.id)) && (
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              navigate(`/updatebook?id=${book.id}`);
            }}
          >
            Edit
          </Button>
        )}
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            navigate(`/previewbook?id=${book.id}`);
          }}
        >
          Preview
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
