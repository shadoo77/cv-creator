import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  paperStyle: {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0),
      padding: theme.spacing(0)
    }
  }
}));

export default function(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper square={true} className={classes.paperStyle}>
        {props.children}
      </Paper>
    </div>
  );
}
