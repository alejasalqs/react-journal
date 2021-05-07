import { createStore, combineReducers } from "redux";
import { authReducer } from "../reducers/authReducer";

// el objetivo es agregar los reducers en esta funcion como si fuera un obj
const reducers = combineReducers({
  auth: authReducer,
});

// Este createStore solo recibe un reducer, no se pueden mas
// por lo que se usa combineReducers
export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// Este store se debe importar en el punto mas alto de la app
// en esta caso es el journalapp

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// es para usar los redux devtools en chrome
