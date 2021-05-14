import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";

export const PrivateRoutes = ({
  isLoggedIn,
  component: Component, // Se renombre la variable component por Component
  ...rest // Los demas elementos
}) => {
  // guarda el ultimo path
  localStorage.setItem("pathname", rest.location.pathname);
  // Lo que hace aca es retornar una ruta, la cual tiene como componente el que se envia por parametros
  // El componente que se va a mostrar se le envia por parametros las props
  // Se verifica que el usuario este autenticado para decidir si se muestra o no
  return (
    <Route
      {...rest}
      component={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="auth/login" />
      }
    />
  );
};

PrivateRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
