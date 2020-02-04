import React, { createContext, useReducer } from "react";
import rootReducers from "./reducers/root";

const RootContext = createContext();

const initialUserState = {
  hasFailed: false,
  isLoading: false,
  isAuthenticated: false,
  data: {},
  errorMessage: ""
};

const initialTemplatesState = {
  hasFailed: false,
  isLoading: false,
  data: [],
  errorMessage: ""
};

const initState = {
  account: initialUserState,
  templates: initialTemplatesState,
  errors: {}
};

const RootContextProvider = props => {
  const [state, dispatch] = useReducer(rootReducers, initState);
  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RootContext.Provider>
  );
};

export { RootContext, RootContextProvider };
