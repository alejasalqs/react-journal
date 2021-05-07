import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { authReducer } from "../reducers/authReducer";
import thunk from "redux-thunk"; // npm i redux-thunk middleware para acciones asincronas

// esto habilita las funciones de devtools y nos permite usar middleware
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// el objetivo es agregar los reducers en esta funcion como si fuera un obj
const reducers = combineReducers({
  auth: authReducer,
});

// Este createStore solo recibe un reducer, no se pueden mas
// por lo que se usa combineReducers
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
// Este store se debe importar en el punto mas alto de la app
// en esta caso es el journalapp

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// es para usar los redux devtools en chrome
