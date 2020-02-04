import React from "react";
import { Route, Redirect } from "react-router-dom";
// Context
//import { RootContext } from "../../context/";
// Config
import { userService } from "../../services/user";

export default ({ component: Component, ...rest }) => {
  //const { state } = useContext(RootContext);

  const isAuth = userService.getCurrentUser();

  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
