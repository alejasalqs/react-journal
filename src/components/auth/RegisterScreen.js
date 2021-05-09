import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/userForm";
import validator from "validator"; //npm i validator
import { useDispatch, useSelector } from "react-redux";
import { removeErrorAction, setErrorAction } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  // Este hook viene de react-redux y ayuda a obtener una parte del state
  // Regresa todo el arbol de state que se ve en el devTools
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "Alejandro Salguero",
    email: "alejo@hotmail.com",
    password: "123456",
    password2: "123456",
  });

  const { name, email, password, password2 } = formValues;

  const isFormValid = () => {
    if (name.trim().length === 0) {
      console.log("Name is required");
      dispatch(setErrorAction("Name is required."));
      return false;
    }

    if (!validator.isEmail(email)) {
      console.log("Email is not valid");
      dispatch(setErrorAction("Email is not valid."));
      return false;
    }

    if (password !== password2 || password.length < 5) {
      console.log("Password did not match or is less than 6 characters");
      dispatch(
        setErrorAction("Password did not match or is less than 6 characters.")
      );
      return false;
    }

    dispatch(removeErrorAction());
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log(name, email, password, password2);
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };
  return (
    <>
      <h3 className="auth__tittle">Register</h3>
      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={password}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          onChange={handleInputChange}
          value={password2}
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register Account
        </button>

        <br />
        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
