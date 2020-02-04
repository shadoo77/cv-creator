import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { userService } from "../../services/user";
// Component
import Carousel from "../shared/carousel";
// Material UI
import { Grid, Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  wallContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse"
    }
  },
  wallImage: { width: "100%", height: "auto" },
  detailCard: { padding: theme.spacing(9, 9, 3, 2) },
  btnStyle: {
    padding: theme.spacing(2, 4),
    fontWeight: 900,
    textTransform: "none"
  },
  advsArea: { padding: theme.spacing(4, 2) },
  slideshowArea: { backgroundColor: "#f4f8f9" }
}));

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

export default props => {
  const classes = useStyles();

  useEffect(() => {
    const user = userService.getCurrentUser();
    if (user) {
      props.history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wall = require(`../../assets/wall/Hero-HomePage_2x.webp`);
  const advs1 = require(`../../assets/wall/featured-1.webp`);
  const advs2 = require(`../../assets/wall/featured-2.webp`);
  const advs3 = require(`../../assets/wall/featured-3.webp`);
  const advs4 = require(`../../assets/wall/featured-4.webp`);
  const advs5 = require(`../../assets/wall/featured-5.webp`);
  const advs6 = require(`../../assets/wall/featured-6.webp`);

  return (
    <>
      <Box p={5}>
        <Grid
          container
          spacing={1}
          //direction="row-reverse"
          justify="space-between"
          alignItems="stretch"
          className={classes.wallContainer}
        >
          <Grid item xs={12} sm={6}>
            <div className={classes.detailCard}>
              <Typography variant="h3">
                <Box fontWeight="fontWeightBold" m={1}>
                  Create a job-ready resume in minutes.
                </Box>
              </Typography>
              <Typography variant="body1" component="div">
                <Box m={1} color="gray" fontSize={{ xs: "h6.fontSize" }}>
                  The #1 resume & CV builder, trusted by 3 million people to
                  land their dream job.
                </Box>
              </Typography>
              <Box color="gray" my={2} mx={1}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  to="/register"
                  component={LinkBehavior}
                  className={classes.btnStyle}
                >
                  Get started now
                </Button>
              </Box>
              <Typography variant="subtitle2">
                <Box color="gray" m={1}>
                  Sign-up FREE. No Credit Card Required.
                </Box>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src={wall} alt="wallImage" className={classes.wallImage} />
          </Grid>
        </Grid>

        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.advsArea}
        >
          <Box p={1}>
            <img src={advs1} alt="advs1" />
          </Box>
          <Box p={1}>
            <img src={advs2} alt="advs2" />
          </Box>
          <Box p={1}>
            <img src={advs3} alt="advs3" />
          </Box>
          <Box p={1}>
            <img src={advs4} alt="advs4" />
          </Box>
          <Box p={1}>
            <img src={advs5} alt="advs5" />
          </Box>
          <Box p={1}>
            <img src={advs6} alt="advs6" />
          </Box>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexWrap="wrap"
        className={classes.slideshowArea}
        px={{ xs: 1, sm: 2 }}
        py={4}
      >
        <Box width={1}>
          <Typography variant="h3">
            <Box fontWeight="fontWeightBold" m={1}>
              The right resume templates for the job
            </Box>
          </Typography>
          <Typography variant="body1" component="div">
            <Box m={1} color="gray" fontSize={{ xs: "h6.fontSize" }}>
              Recent graduates, CEOs, freelancers, and every job in between.
            </Box>
          </Typography>
        </Box>
        <Carousel {...props} />
      </Box>
    </>
  );
};
