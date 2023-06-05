import { changeUserLoginStatus, clearAuth, updateAuth } from "./authSlice";
import { auth } from "../../../db/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

export const checkUserAuth = () => async (dispatch, _) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          updateAuth({
            id: uid,
            userName: displayName,
            email: email,
            avatarURL: photoURL,
          })
        );
        dispatch(changeUserLoginStatus(true));
      }
    });
  } catch (error) {
    console.log("error.message", error.message);
  }
};

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
    console.log("registerUser error :>> ", error.message);
  }
};

export const loginUser = (userData) => async (dispatch, _) => {
  const { email, password } = userData;
  try {
    await signInWithEmailAndPassword(auth, email, password);

    const { uid, displayName, photoURL } = auth.currentUser;

    dispatch(
      updateAuth({
        id: uid,
        userName: displayName,
        email: email,
        avatarURL: photoURL,
      })
    );
  } catch (error) {
    console.log("loginUser error :>> ", error.message);
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
    await updateProfile(auth.currentUser, {
      photoURL: avatarURL,
    });

    const { uid, displayName, email, photoURL } = auth.currentUser;

    dispatch(
      updateAuth({ id: uid, userName: displayName, email, avatarURL: photoURL })
    );
  } catch (error) {
    console.log("error :>> ", error.message);
  }
};
