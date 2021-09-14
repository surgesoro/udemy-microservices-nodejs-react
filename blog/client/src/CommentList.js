import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:8081/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []); // the [] empty array tells out function to only fetch posts once, during initial component load

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
