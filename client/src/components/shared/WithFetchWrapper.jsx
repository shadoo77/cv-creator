import React from "react";
import isEmpty from "../../services/isEmpty";
// Material UI
import { Paper, Typography, CircularProgress, Box } from "@material-ui/core/";

// Spinner
const Spinner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={3}>
      <CircularProgress />
    </Box>
  );
};

// Failed message
const Failed = ({ errorMessage }) => {
  return (
    <Paper>
      <Box display="flex" justifyContent="center" alignItems="center" m={3}>
        <Typography variant="h5" component="h3">
          {errorMessage}
        </Typography>
      </Box>
    </Paper>
  );
};

export default props => {
  const { isLoading, hasFailed, errorMessage, data } = props.state;

  return (
    <>
      {isLoading && !hasFailed ? (
        <Spinner />
      ) : !isLoading && hasFailed ? (
        <Failed errorMessage={errorMessage} />
      ) : !hasFailed && !isLoading && isEmpty(data) ? (
        <Failed errorMessage="No template found!" />
      ) : (
        props.children
      )}
    </>
  );
};
