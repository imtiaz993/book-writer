import React from "react";
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

export default function AddSectionModal({
  openModal,
  setOpenModal,
  handleAddSection,
  sectionTitle,
  setSectionTitle,
}) {
  const handleClose = () => {
    setOpenModal(false);
    setSectionTitle("");
  };

  const handleChange = (value) => {
    setSectionTitle(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddSection(sectionTitle);
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            Update Section
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
                value={sectionTitle}
                onChange={(e) => {
                  handleChange(e.target.value);
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
