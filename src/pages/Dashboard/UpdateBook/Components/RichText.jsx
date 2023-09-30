import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { BlockPicker } from "react-color";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import PropTypes from "prop-types";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Box, Button } from "@mui/material";
import axios from "axios";

const ColorPic = ({ expanded, onExpandEvent, onChange, currentState }) => {
  const [color, setColor] = useState(currentState.color);

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
    onChange("color", selectedColor.hex);
  };

  const renderModal = () => {
    return (
      <div onClick={stopPropagation}>
        <BlockPicker color={color} onChangeComplete={handleColorChange} />
      </div>
    );
  };

  return (
    <div
      aria-haspopup="true"
      aria-expanded={expanded}
      aria-label="rdw-color-picker"
    >
      <div onClick={onExpandEvent}>
        <img
          // src={icon}
          alt=""
        />
      </div>
      {expanded ? renderModal() : undefined}
    </div>
  );
};

ColorPic.propTypes = {
  expanded: PropTypes.bool,
  onExpandEvent: PropTypes.func,
  onChange: PropTypes.func,
  currentState: PropTypes.object,
};

const RichText = ({
  setBook,
  book,
  editorStateInitial,
  setEditorStateInitial,
  activeSectionId,
  richTextContent,
}) => {
  const [editorState, setEditorState] = useState(editorStateInitial);

  useEffect(() => {
    if (richTextContent) {
      const contentState = ContentState.createFromBlockArray(
        convertFromHTML(richTextContent.replace(/`/g, ""))
      );
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [richTextContent, activeSectionId]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    setEditorStateInitial(newEditorState);
  };
  function updateSectionContent(node, targetId, desc) {
    if (node.id === targetId) {
      node["desc"] = desc;
      return true;
    }

    if (node.children) {
      for (const child of node.children) {
        if (updateSectionContent(child, targetId, desc)) {
          return true;
        }
      }
    }

    return false;
  }

  const handleSave = () => {
    let updatedBook = JSON.parse(JSON.stringify(book));
    updateSectionContent(
      updatedBook.sections,
      activeSectionId,
      `\`${draftToHtml(convertToRaw(editorState.getCurrentContent()))}\``
    );
    axios
      .put(`${process.env.REACT_APP_BASE_URL}books/${book.id}`, updatedBook)
      .then((res) => {
        setBook(res.data);
      });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          colorPicker: {
            component: ColorPic,
          },
        }}
        onEditorStateChange={onEditorStateChange}
        editorState={editorState}
      />
    </>
  );
};

export default RichText;
