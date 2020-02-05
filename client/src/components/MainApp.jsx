import React, { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { Container, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
// Context
import { RootContext } from "../context/";
// Set auth token
import setAuthToken from "../services/setAuthToken";
// Config
import { userService } from "../services/user";
// Import actions
import { setCurrentUser, logoutUser } from "../context/actions/user";
// Components
import ContentContainer from "./shared/ContentContainer";
import Header from "./shared/Header";
import AppBar from "./shared/AppBar";
import PrivateRoute from "./shared/ProtectedRoute";
import Home from "./user/Home";
import Dashboard from "./user/Dashboard";
import Steppers from "./user/steppers";
import Register from "./user/Register";
import Login from "./user/Login";
import ForgetPassword from "./shared/forget-password/ForgetPassword";
import ResetPassword from "./shared/forget-password/ResetPassword";

const useStyles = makeStyles(theme => ({
  container: {
    padding: 0
  },
  sticky: {
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.appBar + 5
  }
}));

const authCheck = (props, DestinationComponent) => {
  const user = userService.getCurrentUser();
  if (user) {
    return <Redirect to="/dashboard" />;
  } else {
    return <DestinationComponent {...props} />;
  }
};

const WrongPage = () => (
  <h2 style={{ color: "red" }}>
    <center>Error 404: Wrong page!</center>
  </h2>
);

function MainApp(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(RootContext);

  useEffect(() => {
    if (localStorage.jwtToken && !state.account.isAuthenticated) {
      // Get token from localstorage is same like localstorage.getItem('jwtToken')
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user when he/she isAuthenticated
      dispatch(setCurrentUser(decoded));
      // Logout user automaticlly after an expire time
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logoutUser(dispatch, props.history);
        //window.location.href = "/login";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Header />
      <div className={classes.sticky}>
        <AppBar />
      </div>
      <ContentContainer>
        <Typography component="div">
          {/* style={{ height: "100vh" }} */}
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" exact component={Login} />
            <Route
              path="/register"
              exact
              render={props => authCheck(props, Register)}
            />
            <Route
              path="/forgetPassword"
              exact
              render={props => authCheck(props, ForgetPassword)}
            />
            <Route
              path="/resetPassword/:pass_token"
              exact
              render={props => authCheck(props, ResetPassword)}
            />
            <PrivateRoute
              path="/dashboard"
              isAuthenticated={state.account.isAuthenticated}
              exact
              component={Dashboard}
            />
            <PrivateRoute path="/steppers" exact component={Steppers} />
            <Route path="/404" exact component={WrongPage} />
            <Route component={WrongPage} />
          </Switch>
        </Typography>
      </ContentContainer>
    </Container>
  );
}

const MainAppWithRouter = withRouter(MainApp);
export default React.memo(MainAppWithRouter);
