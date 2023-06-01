import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const posts = collection(db, "posts");
export const comments = (postId) => collection(doc(posts, postId), "comments");
