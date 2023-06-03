import { authSlice, clearAuth, updateAuth } from "./authSlice";
import { auth } from "../../../db/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

export const registerUser = (userData) => async (dispatch, _) => {
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
  } catch (error) {
    console.log("error :>> ", error.message);
  }
};

export const loginUser = (userData) => async (dispatch, _) => {
  const { email, password } = userData;
  try {
    await signInWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;

    dispatch(
      updateAuth({
        id: user.uid,
        userName: user.displayName,
        email: user.email,
        avatarURL: user.photoURL,
      })
    );
  } catch (error) {
    console.log("error :>> ", error.message);
  }
};

export const logOutUser = () => async (dispatch, _) => {
  try {
    await signOut(auth);
    dispatch(clearAuth());

    console.log("User successfully logout!");
  } catch (error) {
    console.log("error :>> ", error.message);
  }
};

export const updateUserAvatar = (avatarURL) => async (dispatch, _) => {
  try {
    // console.log("User change operation");
    // console.log("updateUserAvatar avatarURL :>> ", avatarURL);
    await updateProfile(auth.currentUser, {
      photoURL: avatarURL,
    });

    const { uid, displayName, email, photoURL } = auth.currentUser;

    // console.log("updateUserAvatar photoURL :>> ", photoURL);
    dispatch(
      updateAuth({ id: uid, userName: displayName, email, avatarURL: photoURL })
    );
  } catch (error) {
    console.log("error :>> ", error.message);
  }
};
