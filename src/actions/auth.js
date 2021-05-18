// LAs acciones son simples funciones
import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { finishLoadingAction, startLoadingAction } from "./ui";
import Swal from "sweetalert2";
import { notesLogOut } from "./notes";

export const startLoginEmailPassword = (email, password) => {
  // estructura basica de una accion asincrona
  return async (dispatch) => {
    dispatch(startLoadingAction());
    // Este dispatch se obtiene por parametro gracias a thunk
    // se pueden hacer n dispatch
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((e) => {
        console.log(e);
        dispatch(finishLoadingAction());
        Swal.fire("Error Message", e.message, "error");
      });

    if (userCredential) {
      const { user } = userCredential;
      dispatch(login(user.email, password));
    }

    dispatch(finishLoadingAction());
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return async (dispatch) => {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((e) => {
        console.log(e);
        Swal.fire("Error Message", e.message, "error");
      });

    const { user } = userCredential;

    await user.updateProfile({
      displayName: name,
    });

    dispatch(login(email, password));
  };
};

export const startGoogleLogin = () => {
  // estructura basica de una accion asincrona
  return async (dispatch) => {
    // Este dispatch se obtiene por parametro gracias a thunk
    // se pueden hacer n dispatch
    const userCredential = await firebase
      .auth()
      .signInWithPopup(googleAuthProvider);

    // se desestrutura la respuesta
    const { user } = userCredential;

    // dispatch del login
    dispatch(login(user.uid, user.displayName));
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(notesLogOut());
  };
};

export const logout = () => ({
  type: types.logout,
});
