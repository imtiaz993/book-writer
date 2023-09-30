import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { EditorState } from "draft-js";
import { Box, Button, Typography } from "@mui/material";
import AddSectionModal from "./Components/AddSectionModal";
import SectionsTree from "./Components/SectionsTree";
import ManageCollaborators from "./Components/ManageCollaborators";
import RichText from "./Components/RichText";

const UpdateBook = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const user = JSON.parse(localStorage.getItem("user"));

  const [book, setBook] = useState();

  const [editorStateInitial, setEditorStateInitial] = useState(
    EditorState.createEmpty()
  );
  const [richTextContent, setRichTextContent] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openCollaborators, setOpenCollborators] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("");
  const [parentSectionId, setParentSectionId] = useState("");
  const [currentSectionId, setCurrentSectionId] = useState("");

  function updateSectionName(node, targetId, newName) {
    if (node.id === targetId) {
      node.name = newName;
      return true;
    }

    if (node.children) {
      for (const child of node.children) {
        if (updateSectionName(child, targetId, newName)) {
          return true;
        }
      }
    }

    return false;
  }

  function updateSectionChild(node, targetId, newName) {
    if (node.id === targetId) {
      if (node.children && node.children.length > 0) {
        node.children = [
          ...node.children,
          {
            id: uuidv4(),
            name: newName,
          },
        ];
      } else {
        node.children = [
          {
            id: uuidv4(),
            name: newName,
          },
        ];
      }

      return true;
    }

    if (node.children) {
      for (const child of node.children) {
        if (updateSectionChild(child, targetId, newName)) {
          return true;
        }
      }
    }

    return false;
  }

  const handleAddSection = (sectionTitle) => {
    let updatedBook = JSON.parse(JSON.stringify(book));
    if (book.sections) {
      if (currentSectionId) {
        updateSectionName(updatedBook.sections, currentSectionId, sectionTitle);
      } else if (parentSectionId) {
        updateSectionChild(updatedBook.sections, parentSectionId, sectionTitle);
      }
    }
    axios
      .put(`${process.env.REACT_APP_BASE_URL}books/${id}`, updatedBook)
      .then((res) => {
        setBook(res.data);
        setSectionTitle("");
      });
    setOpenModal(false);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}books/${id}`).then((res) => {
      setBook(res.data);
    });
  }, [id]);

  return (
    <>
      {book ? (
        <>
          <AddSectionModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            handleAddSection={handleAddSection}
            sectionTitle={sectionTitle}
            setSectionTitle={setSectionTitle}
          />
          <ManageCollaborators
            openModal={openCollaborators}
            setOpenModal={setOpenCollborators}
            setBook={setBook}
            book={book}
          />

          <Box sx={{ padding: 1 }}>
            {user?.id === book.author.id && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenCollborators(true);
                  }}
                >
                  Manage Collaborator
                </Button>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 1,
              }}
            >
              <Box
                sx={{
                  border: "1px solid black",
                  width: "300px",
                  height: "78vh",
                  overflow: "auto",
                }}
              >
                {book.sections && (
                  <SectionsTree
                    book={book}
                    setSectionTitle={setSectionTitle}
                    setParentSectionId={setParentSectionId}
                    setCurrentSectionId={setCurrentSectionId}
                    setActiveSectionId={setActiveSectionId}
                    setRichTextContent={setRichTextContent}
                    setOpenModal={setOpenModal}
                    user={user}
                  />
                )}
              </Box>
              <Box
                sx={{
                  width: "calc(100% - 310px)",
                }}
              >
                {activeSectionId && activeSectionId !== "root" && (
                  <RichText
                    book={book}
                    setBook={setBook}
                    editorStateInitial={editorStateInitial}
                    setEditorStateInitial={setEditorStateInitial}
                    richTextContent={richTextContent}
                    activeSectionId={activeSectionId}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Typography variant="h5" sx={{ textAlign: "center", marginTop: 2 }}>
          Loading...
        </Typography>
      )}
    </>
  );
};

export default UpdateBook;
