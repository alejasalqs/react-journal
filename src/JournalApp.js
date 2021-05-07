import React from "react";
import { AppRouter } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
// npm install react-redux redux
export const JournalApp = () => {
  // El provider es un hire order componet el cual va a tener la informacion del store
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
