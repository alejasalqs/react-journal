import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  // esta bandera es para esperar la respuesta de firebase
  // de que si estamos autorizados o no
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // Si no esta autenticado regresa null
      if (user?.uid) {
        // hacemos dispatch del login
        dispatch(login(user.uid, user.displayName));
        // Si nos autenticamos cambiamos el state
        setIsLoggedIn(true);
        // Se cargan las notas del usuario
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      // Ya tenemos la respuesta entonces lo ponemos false
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]); // Solo se ejecuta una vez
  // se agrega el dispatch para borrar el warning de la dependencia faltante

  // Esto se retorna mientras no tengamos la respuesta de firebase
  if (checking) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <>
        <Switch>
          <PublicRoutes
            isLoggedIn={isLoggedIn}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoutes
            isLoggedIn={isLoggedIn}
            exact
            path="/"
            component={JournalScreen}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </>
    </Router>
  );
};
