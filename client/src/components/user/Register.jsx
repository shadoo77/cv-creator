import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link as RouterLink } from "react-router-dom";
import isEmpty from "../../services/isEmpty";
import { RootContext } from "../../context/";
// Import actions
import { registerUser } from "../../context/actions/user";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Grid,
  Fab,
  Divider,
  LinearProgress,
  IconButton
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import { SnackbarProvider, withSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  registerForm: {
    maxWidth: "500px"
  },
  registerGrid: {
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  textField: {
    marginTop: "35px"
  },
  radioGroup: {
    paddingLeft: "3em"
  },
  divider: {
    margin: "20px 0px"
  },
  radioItem: {
    padding: "0px 20px"
  },
  closeIcon: {
    color: "#fff",
    padding: theme.spacing(0.5)
  }
}));

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  loading: false,
  errors: {}
};

function RegisterForm(props) {
  const { state, dispatch } = useContext(RootContext);
  const classes = useStyles();
  const [currState, setCurrState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
    errors: {}
  });

  useEffect(() => {
    if (state.account.isAuthenticated) {
      props.history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.errors && !isEmpty(state.errors)) {
      setCurrState({
        ...currState,
        loading: false,
        errors: state.errors
      });
    } else {
      setCurrState(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.errors]);

  const handleChange = e => {
    setCurrState({ ...currState, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    props.history.push("/");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCurrState({ ...currState, loading: true });
    const newItem = {
      firstName: currState.firstName,
      lastName: currState.lastName,
      email: currState.email,
      password: currState.password,
      confirmPassword: currState.confirmPassword
    };
    try {
      await registerUser(dispatch, newItem, props.history, handleClickVariant);
    } catch (err) {
      setCurrState({
        ...currState,
        loading: false
      });
    }
  };

  // add multiple actions to one snackbar
  const snackAction = key => (
    <React.Fragment>
      <IconButton
        key="close"
        aria-label="Close"
        //className={props.classes.closeIcon}
        onClick={() => {
          props.closeSnackbar(key);
        }}
      >
        <CloseIcon />
      </IconButton>
    </React.Fragment>
  );

  /////// Snackbar functions /////////
  const handleClickVariant = variant => {
    // variant could be success, error, warning or info
    props.enqueueSnackbar("New account created !", {
      variant,
      action: snackAction,
      autoHideDuration: 2500
    });
  };

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    loading,
    errors
  } = currState;

  return (
    <Grid
      container
      spacing={4}
      justify="center"
      alignItems="center"
      className={classes.registerGrid}
    >
      <Grid item sm={2} />
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        sm={8}
      >
        <Grid>
          <Typography variant="h4">Create your account</Typography>
        </Grid>
        <Grid>
          <form
            onSubmit={handleSubmit}
            className={classes.registerForm}
            noValidate
          >
            <TextField
              variant="outlined"
              error={errors.firstName ? true : false}
              helperText={errors.firstName}
              value={firstName}
              name="firstName"
              required
              label="First name"
              onChange={handleChange}
              margin="dense"
              className={classes.textField}
              fullWidth
            />
            <TextField
              variant="outlined"
              error={errors.lastName ? true : false}
              helperText={errors.lastName}
              value={lastName}
              name="lastName"
              required
              label="Last name"
              onChange={handleChange}
              margin="dense"
              className={classes.textField}
              fullWidth
            />
            <TextField
              variant="outlined"
              error={errors.email ? true : false}
              helperText={errors.email}
              value={email}
              name="email"
              required
              label="Email"
              onChange={handleChange}
              margin="dense"
              className={classes.textField}
              fullWidth
            />
            <TextField
              variant="outlined"
              error={errors.password ? true : false}
              helperText={errors.password}
              value={password}
              name="password"
              required
              type="password"
              label="Password"
              onChange={handleChange}
              margin="dense"
              className={classes.textField}
              fullWidth
            />
            <TextField
              variant="outlined"
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword}
              value={confirmPassword}
              name="confirmPassword"
              required
              type="password"
              label="Password confirm"
              onChange={handleChange}
              margin="dense"
              className={classes.textField}
              fullWidth
            />
            {!loading ? (
              <Divider className={classes.divider} />
            ) : (
              <LinearProgress className={classes.divider} />
            )}
            <Grid container direction="row">
              <Grid container justify="center" alignItems="center" item xs={6}>
                <Fab
                  type="submit"
                  variant="extended"
                  color="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Opslaan
                </Fab>
              </Grid>
              <Grid container justify="center" alignItems="center" item xs={6}>
                <Fab
                  variant="extended"
                  color="secondary"
                  size="large"
                  onClick={handleCancel}
                >
                  Annuleren
                </Fab>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Divider className={classes.divider} />
        <Grid>
          <Typography variant="h6">
            Have an account? <RouterLink to="/login">Login</RouterLink>
          </Typography>
        </Grid>
      </Grid>
      <Grid item sm={2} />
    </Grid>
  );
}

const registerWithRouter = withRouter(RegisterForm);

const RegPage = withSnackbar(registerWithRouter);

function RegisterWithSnack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <RegPage />
    </SnackbarProvider>
  );
}

export default RegisterWithSnack;
