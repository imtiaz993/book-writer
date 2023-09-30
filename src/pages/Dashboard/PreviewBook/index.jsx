import axios from "axios";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PreviewBook = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [book, setBook] = useState();

  const renderBookContent = (nodes) => {
    return (
      <Box key={nodes.id} sx={{ padding: 1 }}>
        {nodes?.desc ? (
          <div
            dangerouslySetInnerHTML={{
              __html: nodes.desc.replace(/`/g, ""),
            }}
          ></div>
        ) : null}
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderBookContent(node))
          : null}
      </Box>
    );
  };
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}books/${id}`).then((res) => {
      setBook(res.data);
    });
  }, [id]);

  return book && renderBookContent(book.sections);
};

export default PreviewBook;
