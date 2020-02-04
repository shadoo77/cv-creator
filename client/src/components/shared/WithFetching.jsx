import React, { useEffect, useContext } from "react";
import { RootContext } from "../../context/";
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
const Failed = ({ msg }) => {
  return (
    <Paper>
      <Box display="flex" justifyContent="center" alignItems="center" m={3}>
        <Typography variant="h5" component="h3">
          {msg}
        </Typography>
      </Box>
    </Paper>
  );
};

export default WrappedComponent =>
  React.memo(props => {
    const { isLoading, isFailed, errormessage, items } = props.data;
    const { dispatch } = useContext(RootContext);
    // Fetch function
    async function templatesFetching() {
      try {
        await props.func(dispatch);
      } catch (err) {
        console.log(err);
      }
    }

    useEffect(() => {
      templatesFetching();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        {isLoading && !isFailed ? (
          <Spinner />
        ) : !isLoading && isFailed ? (
          <Failed msg={errormessage} />
        ) : !isFailed && !isLoading && !items.length ? (
          <Failed msg="No templates found!" />
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  });
