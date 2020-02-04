import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
// Context
import { RootContext } from "../../context/";
// Services
import isEmpty from "../../services/isEmpty";
// Action
// Import actions
import { loginUser } from "../../context/actions/user";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  FormHelperText,
  Button,
  TextField,
  Grid,
  Card,
  CardHeader,
  IconButton,
  Icon,
  CardContent,
  List,
  ListItemIcon,
  ListItem,
  CardActions,
  LinearProgress,
  Divider,
  Link
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  gridContainer: {
    fontFamily: '"Helvetica", "Arial", sans-serif',
    margin: 0
  },
  cardContainer: {
    width: "100%",
    textAlign: "center",
    padding: "20px 0px",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "400px"
    }
  },
  cardContent: {
    marginBottom: 0,
    paddingTop: 10,
    paddingBottom: 0
  },
  notActivated: {
    borderRadius: "3px",
    border: "solid 1px #8e3030",
    backgroundColor: "#f2dada",
    color: "#8e3030",
    padding: "20px 10px",
    textAlign: "left"
  },
  iconButton: {
    backgroundColor: "#2a90fc",
    color: "#fff",
    cursor: "default",
    "&:hover": {
      backgroundColor: "#2a90fc"
    },
    "&:active": {
      outline: "0 !important",
      border: "0 !important"
    },
    "&:focus": {
      outline: "0 !important",
      border: "0 !important"
    }
  },
  inputField: {
    marginTop: "15px",
    marginBottom: "15px"
  },
  listContainer: {
    fontSize: "14px",
    paddingTop: 0
  },
  listItem: {
    paddingTop: "0px"
  },
  linearProgress: {
    margin: "15px"
  }
}));

const CollisionLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to={props.to} {...props} />
));

const initialState = {
  email: "anonymose434@gmail.com",
  password: "sssssss",
  errors: {},
  loading: false
};

function LogIn(props) {
  const { state, dispatch } = useContext(RootContext);
  const classes = useStyles();
  const [currState, setCurrState] = useState(initialState);

  useEffect(() => {
    if (state.account.isAuthenticated) {
      props.history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.account && state.account.isAuthenticated) {
      props.history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.account]);

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

  const { email, password, errors, loading } = currState;

  const handleChange = e => {
    setCurrState({
      ...currState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = currState;
    const account = { email, password };
    setCurrState({ ...currState, loading: true });
    try {
      await loginUser(dispatch, account);
    } catch (err) {
      setCurrState({
        ...currState,
        errors: err.response.data,
        loading: false
      });
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.gridContainer}
    >
      <Grid container item xs={12} sm={8} justify="center" alignItems="center">
        <Card className={classes.cardContainer}>
          <IconButton
            className={classes.iconButton}
            style={{ cursor: "default" }}
          >
            <Icon>lock_open</Icon>
          </IconButton>
          <CardHeader title="User Login" />
          {/* If the account is not activated here is the feedback */}
          {errors.notActivated ? (
            <FormHelperText className={classes.notActivated}>
              {errors.notActivated}
            </FormHelperText>
          ) : null}

          <CardContent className={classes.cardContent}>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                placeholder="anonymose434@kleurrijker.nl"
                error={errors.email ? true : false}
                helperText={errors.email}
                value={email}
                name="email"
                required
                id="email-login"
                label="Email"
                onChange={handleChange}
                margin="dense"
                className={classes.inputField}
                fullWidth
              />
              <TextField
                variant="outlined"
                placeholder="Author1"
                error={errors.password ? true : false}
                helperText={errors.password}
                value={password}
                name="password"
                required
                type="password"
                id="password-login"
                label="Password"
                onChange={handleChange}
                margin="dense"
                className={classes.inputField}
                fullWidth
              />
              {loading ? (
                <LinearProgress className={classes.linearProgress} />
              ) : (
                <Divider className={classes.linearProgress} />
              )}
              <Button
                variant="contained"
                type="submit"
                color="primary"
                size="large"
                onClick={handleSubmit}
                fullWidth={true}
                disabled={loading}
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardActions>
            <List color="primary" className={classes.listContainer}>
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <Icon color="primary" style={{ fontSize: 16 }}>
                    send
                  </Icon>
                </ListItemIcon>
                <Link to={`/register`} component={CollisionLink}>
                  Register
                </Link>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <Icon color="primary" style={{ fontSize: 16 }}>
                    send
                  </Icon>
                </ListItemIcon>
                <Link to={`/forgetPassword`} component={CollisionLink}>
                  Forget password
                </Link>
              </ListItem>
            </List>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default React.memo(LogIn);
