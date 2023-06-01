import { onSnapshot } from "firebase/firestore";
import * as dbCollection from "../../db/collections";
import { useState, useEffect } from "react";

export const useComments = (postId) => {
  const [commentsList, setCommentsList] = useState([]);

  const getComments = () => {
    onSnapshot(dbCollection.comments(postId), (data) => {
      const comments = data.docs
        .map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt);
      console.log("comments :>> ", comments);
      setCommentsList(comments);
      // return { comments, commentsLength: comments.length };
    });
  };

  useEffect(() => {
    getComments();
    console.log("useEffect commentsList :>> ", commentsList);

    return () => setCommentsList(null);
  }, []);

  return [commentsList];
};
