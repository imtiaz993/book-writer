import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Modal, Button } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ClearIcon from "@mui/icons-material/Clear";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

export default function ManageCollaborators({
  openModal,
  setOpenModal,
  book,
  setBook,
}) {
  const [user, setUser] = useState([]);
  const [newCollaborator, setNewCollaborator] = useState([]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedBook = {
      ...book,
      collaborators: [...book.collaborators, ...newCollaborator],
    };
    newCollaborator.map((item) =>
      setUser(user.filter((userAdded) => userAdded.id !== item.id))
    );

    axios
      .put(`${process.env.REACT_APP_BASE_URL}books/${book.id}`, updatedBook)
      .then((res) => {
        setBook(res.data);
      });
    setNewCollaborator([]);
  };

  const handleRemoveCollaborator = (collaborator) => {
    let updatedBook = {
      ...book,
      collaborators: book.collaborators.filter(
        (item) => item.id !== collaborator.id
      ),
    };
    setUser([...user, collaborator]);

    axios
      .put(`${process.env.REACT_APP_BASE_URL}books/${book.id}`, updatedBook)
      .then((res) => {
        setBook(res.data);
      });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}users`).then((res) => {
      res.data.map((user) => {
        if (
          book?.author.id !== user.id &&
          !book?.collaborators?.find((col) => col.id === user.id)
        ) {
          delete user.password;
          setUser((prevUser) => [...prevUser, user]);
        }
        return null;
      });
    });
  }, []);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            Manage Collaborators
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
              }}
            >
              <FormControl sx={{ width: 250 }}>
                <InputLabel id="demo-multiple-checkbox-label">User</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={newCollaborator}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setNewCollaborator(e.target.value);
                  }}
                  input={<OutlinedInput label="User" />}
                  renderValue={(selected) =>
                    selected.map((item) => item.name).join(", ")
                  }
                  MenuProps={MenuProps}
                >
                  {user.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={newCollaborator.indexOf(name) > -1} />
                      <ListItemText primary={name.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                type="submit"
                disbled={newCollaborator.length === 0}
              >
                Add
              </Button>
            </Box>
          </form>
          {book?.collaborators && book.collaborators.length > 0 && (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Typography variant="p">Name</Typography>
                <Typography variant="p">Email</Typography>
                <Box></Box>
              </Box>
              {book.collaborators.map((collaborator) => (
                <Box
                  key={collaborator.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    alignItems: "center",
                    gap: 2,
                    marginTop: 1,
                  }}
                >
                  <Typography variant="p">{collaborator.name}</Typography>
                  <Typography variant="p">{collaborator.email}</Typography>
                  <Box
                    onClick={() => {
                      handleRemoveCollaborator(collaborator);
                    }}
                  >
                    <ClearIcon />
                  </Box>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
