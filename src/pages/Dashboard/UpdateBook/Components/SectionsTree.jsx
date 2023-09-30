import * as React from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";

export default function SectionsTree({
  book,
  setSectionTitle,
  setParentSectionId,
  setCurrentSectionId,
  setActiveSectionId,
  setRichTextContent,
  setOpenModal,
  user,
}) {
  const handleAddChild = (id) => {
    setParentSectionId(id);
    setOpenModal(true);
  };

  const handleUpdate = (id, title) => {
    setCurrentSectionId(id);
    setSectionTitle(title);
    setOpenModal(true);
  };
  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      expandIcon={<ExpandMoreIcon />}
      collapseIcon={<ChevronRightIcon />}
      onClick={() => {
        setActiveSectionId(nodes.id);
        setRichTextContent(nodes.desc);
      }}
      icon={
        <>
          {user?.id === book.author.id && (
            <>
              <Box
                onClick={() => {
                  handleAddChild(nodes.id);
                }}
              >
                <AddIcon />
              </Box>

              <Box
                onClick={() => {
                  handleUpdate(nodes.id, nodes.name);
                }}
              >
                <ModeEditIcon />
              </Box>
            </>
          )}
        </>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Box sx={{ minHeight: 110, flexGrow: 1, maxWidth: 300 }}>
      <TreeView aria-label="rich object" defaultExpanded={["root"]}>
        {renderTree(book.sections)}
      </TreeView>
    </Box>
  );
}
