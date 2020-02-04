/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
// Material UI
import {
  Typography,
  FormHelperText,
  TextField,
  Grid,
  Card,
  CardHeader,
  IconButton,
  Icon,
  CardContent,
  CardActions,
  List,
  ListItemIcon,
  ListItem,
  Fab,
  LinearProgress,
  Divider
} from "@material-ui/core/";

const useStyles = makeStyles(() => ({
  gridContainer: {
    marginTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  cardContainer: {
    width: "400px",
    textAlign: "center",
    padding: "20px 5px"
  },
  cardContent: {
    marginBottom: 0,
    paddingTop: 10,
    paddingBottom: 0
  },
  invalidOrExpaires: {
    borderRadius: "3px",
    border: "solid 1px #8e3030",
    backgroundColor: "#f2dada",
    color: "#8e3030",
    padding: "20px 10px",
    textAlign: "left"
  },
  sentSuccessful: {
    borderRadius: "3px",
    border: "solid 1px #004d40",
    backgroundColor: "#e0f2f1",
    color: "#004d40",
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

export default props => {
  console.log(props);
  const classes = useStyles();
  const [currState, setCurrState] = useState({
    id: "",
    name: "",
    newPassword: "",
    confirmNewPassword: "",
    messageFromServer: "",
    errors: {},
    loading: false
  });

  const tesst = async () => {
    try {
      const results = await axios.get(`api/account/reset-password`, {
        params: {
          resetPasswordToken: props.match.params.pass_token
        }
      });

      setCurrState({
        ...currState,
        id: results.data.userID,
        name: results.data.name
      });
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setCurrState({ ...currState, errors: err.response.data });
      }
    }
  };

  useEffect(() => {
    //tesst();
  }, []);

  const handleChange = e => {
    setCurrState({ ...currState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { id, newPassword, confirmNewPassword } = currState;
    setCurrState({ ...currState, loading: true });
    const newPass = { id, newPassword, confirmNewPassword };
    try {
      const results = await axios.post(`api/account/reset-password`, newPass);
      setCurrState({
        ...currState,
        newPassword: "",
        confirmNewPassword: "",
        messageFromServer: results.data.success,
        loading: false,
        errors: {}
      });
      setTimeout(() => {
        props.history.push("/login");
      }, 3000);
    } catch (err) {
      setCurrState({
        ...currState,
        errors: err.response.data,
        loading: false
      });
    }
  };

  const handleCancel = () => {
    props.history.push("/login");
  };

  const {
    name,
    newPassword,
    confirmNewPassword,
    messageFromServer,
    errors,
    loading
  } = currState;

  const resetPasswordForm = (
    <React.Fragment>
      <IconButton className={classes.iconButton} style={{ cursor: "default" }}>
        <Icon>lock_open</Icon>
      </IconButton>
      <CardHeader title="Change your password" />
      {/* If the account is not activated here is the feedback */}
      {errors.notFound ? (
        <FormHelperText className={classes.invalidOrExpaires}>
          {errors.notFound}
        </FormHelperText>
      ) : messageFromServer ? (
        <FormHelperText className={classes.sentSuccessful}>
          {messageFromServer}
        </FormHelperText>
      ) : null}

      <CardContent className={classes.cardContent}>
        <Typography component="p" align="left">
          Hello again <strong>{name},</strong>
          <br />
          When you change your password, you are automatically logged out of all
          your sessions. You can log in again with your new password.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="password"
            variant="outlined"
            error={errors.newPassword ? true : false}
            helperText={errors.newPassword}
            value={newPassword}
            name="newPassword"
            required
            label="Your new password"
            onChange={handleChange}
            margin="dense"
            className={classes.inputField}
            fullWidth
          />
          <TextField
            type="password"
            variant="outlined"
            error={errors.confirmNewPassword ? true : false}
            helperText={errors.confirmNewPassword}
            value={confirmNewPassword}
            name="confirmNewPassword"
            required
            label="Confirm your new password"
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
          <CardActions>
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
                  Save
                </Fab>
              </Grid>
              <Grid container justify="center" alignItems="center" item xs={6}>
                <Fab
                  variant="extended"
                  color="secondary"
                  size="large"
                  onClick={handleCancel}
                >
                  Cancel
                </Fab>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </CardContent>
      <CardActions>
        <List color="primary" className={classes.listContainer}>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <Icon color="primary">keyboard_backspace</Icon>
            </ListItemIcon>
            <Link to="/login">Back to login page</Link>
          </ListItem>
        </List>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.gridContainer}
    >
      <Grid item xs={1} sm={2} />
      <Grid container item xs={10} sm={8} justify="center" alignItems="center">
        <Card className={classes.cardContainer}>
          {errors.invalid ? (
            <FormHelperText className={classes.invalidOrExpaires}>
              {errors.invalid}
            </FormHelperText>
          ) : (
            resetPasswordForm
          )}
        </Card>
      </Grid>
      <Grid item xs={1} sm={2} />
    </Grid>
  );
};
