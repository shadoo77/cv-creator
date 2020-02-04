import React from "react";
import { Link as RouterLink } from "react-router-dom";
// Material UI
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Import logo
import siteLogo from "../../assets/logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  logo: {
    maxHeight: 120,
    width: "100%"
  },
  buttonStyle: { textTransform: "none" }
}));

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        alignItems="center"
        width={1}
        justifyContent="space-between"
        px={2}
      >
        <Box>
          <RouterLink to="/">
            <img src={siteLogo} alt="logo" className={classes.logo} />
          </RouterLink>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box mx={2}>
            <Button
              color="primary"
              size="medium"
              to="/login"
              component={LinkBehavior}
              className={classes.buttonStyle}
            >
              Login
            </Button>
          </Box>
          <Box mx={2}>
            <Button
              variant="contained"
              color="primary"
              to="/register"
              component={LinkBehavior}
              size="large"
              className={classes.buttonStyle}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
