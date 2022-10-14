import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import Firebase from "./firebase";

console.log(Firebase);

export const auth = getAuth(Firebase);

export const currentUser = () => {
  return onAuthStateChanged(auth, (user) => {});
};

export const signInWithGoogle = () =>
  signInWithPopup(auth, new GoogleAuthProvider());

export const logOut = () => signOut(auth);
