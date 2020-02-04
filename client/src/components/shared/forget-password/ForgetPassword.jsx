import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  FormHelperText,
  Button,
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
  LinearProgress,
  Divider,
  Link
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
  notFound: {
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

const CollisionLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to={props.to} {...props} />
));

export default props => {
  const classes = useStyles();
  const [currState, setCurrState] = useState({
    email: "",
    messageFromServer: "",
    errors: {},
    loading: false
  });

  const handleChange = e => {
    setCurrState({ ...currState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCurrState({ ...currState, loading: true });
    try {
      const results = await axios.post(`api/account/forget-password`, {
        email: currState.email
      });
      setCurrState({
        ...currState,
        email: "",
        messageFromServer: results.data.success,
        loading: false,
        errors: {}
      });
    } catch (err) {
      setCurrState({
        ...currState,
        errors: err.response.data,
        loading: false
      });
    }
  };

  const { email, messageFromServer, errors, loading } = currState;

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
          <IconButton
            className={classes.iconButton}
            style={{ cursor: "default" }}
          >
            <Icon>lock_open</Icon>
          </IconButton>
          <CardHeader title="Forget password" />
          {/* If the account is not activated here is the feedback */}
          {errors.notFound ? (
            <FormHelperText className={classes.notFound}>
              {errors.notFound}
            </FormHelperText>
          ) : messageFromServer ? (
            <FormHelperText className={classes.sentSuccessful}>
              {messageFromServer}
            </FormHelperText>
          ) : null}

          <CardContent className={classes.cardContent}>
            <Typography component="p" align="left">
              Type your email, and you will receive the instructions how you can
              reset your password.
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                placeholder="author@kleurrijker.nl"
                error={errors.email || errors.notFound ? true : false}
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

              {loading ? (
                <LinearProgress className={classes.linearProgress} />
              ) : (
                <Divider className={classes.linearProgress} />
              )}
              <CardActions>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  size="large"
                  onClick={handleSubmit}
                  fullWidth={true}
                  disabled={loading}
                >
                  Send instructions
                </Button>
              </CardActions>
            </form>
          </CardContent>
          <CardActions>
            <List color="primary" className={classes.listContainer}>
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <Icon color="primary">keyboard_backspace</Icon>
                </ListItemIcon>
                <Link to="/login" component={CollisionLink}>
                  Back to login page
                </Link>
              </ListItem>
            </List>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={1} sm={2} />
    </Grid>
  );
};
