import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const posts = collection(db, "posts");
export const postRef = (postId) => doc(db, "posts", postId);
export const comments = (postId) => collection(doc(posts, postId), "comments");
