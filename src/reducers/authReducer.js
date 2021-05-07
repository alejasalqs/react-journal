import { types } from "../types/types";

// siempre es importante tener el state definido
export const authReducer = (state = {}, action) => {
  // siempre se maneja con un switch
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case types.logout:
      return {};

    default:
      return state;
  }
};
