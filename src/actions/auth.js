// LAs acciones son simples funciones
import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";

export const startLoginEmailPassword = (email, password) => {
  // estructura basica de una accion asincrona
  return (dispatch) => {
    // Este dispatch se obtiene por parametro gracias a thunk
    // se pueden hacer n dispatch
    setTimeout(() => {
      dispatch(login("12345", "Pedro"));
    }, 3500);
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
