import { authSlice, updateAuth } from "./authSlice";
import { auth } from "../../../db/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

export const registerUser = (userData) => async (dispatch, _) => {
  //   console.log("userData >>>>>", userData);
  //   console.log("dispatch >>>>>", await dispatch);
  const { userName, email, password, avatarURL } = userData;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: avatarURL,
    });

    const { uid, displayName, photoURL } = auth.currentUser;

    dispatch(
      updateAuth({ id: uid, userName: displayName, email, avatarURL: photoURL })
    );

    // console.log("auth :>> ", auth.currentUser);
  } catch (error) {
    console.log("error :>> ", error.message);
  }
};
