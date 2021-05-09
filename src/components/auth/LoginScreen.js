import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/userForm";
import validator from "validator"; //npm i validator

export const LoginScreen = () => {
  // hook de react-redux, lo que hace es darnos acceso al dispatch de acciones
  // nos permite hacer dispatch de accion en cualquier parte
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: "alejo@gmail.com",
    password: "123",
  });

  const { email, password } = formValues;

  const isFormValid = () => {
    if (password.trim().length === 0) {
      console.log("Password is required");
      //dispatch(setErrorAction("Name is required."));
      return false;
    }

    if (!validator.isEmail(email)) {
      console.log("Email is not valid");
      //dispatch(setErrorAction("Email is not valid."));
      return false;
    }

    //dispatch(removeErrorAction());
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // mandamos dispatch del login del authReducer
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };
  return (
    <>
      <h3 className="auth__tittle">Login</h3>
      <form onSubmit={handleLogin}>
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="Password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block" type="submit">
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
        </div>
        <div className="google-btn" onClick={handleGoogleLogin}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google button"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
        <br />
        <Link to="/auth/register" className="link">
          Create account
        </Link>
      </form>
    </>
  );
};
