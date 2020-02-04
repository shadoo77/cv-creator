import React, { useState, forwardRef, useImperativeHandle } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Grid,
  TextField
} from "@material-ui/core/";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const useStyles = makeStyles(theme => ({
  profilePhoto: {
    width: 155,
    height: 155,
    backgroundColor: "#F5F5F5",
    border: "dotted 0.1rem #888",
    borderRadius: 8,
    cursor: "pointer",
    color: "#888",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  // backButton: {
  //   marginRight: theme.spacing(1)
  // },
}));

const initState = {
  profilePhoto: "",
  firstName: "",
  lastName: "",
  phoneNr: "",
  mobileNr: "",
  streetName: "",
  houseNr: "",
  postCode: "",
  city: "",
  dateOfBirth: new Date("2010-12-31"),
  birthPlace: "",
  driveLicense: "",
  gender: "",
  nationality: "",
  maritalStatus: "",
  linkedIn: "",
  website: ""
};

export default forwardRef((props, ref) => {
  const classes = useStyles();
  const [currState, setCurrState] = useState(initState);

  const handleInputChange = event => {
    setCurrState({ ...currState, [event.target.name]: event.target.value });
  };

  const handleNumberChange = event => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "" || event.target.value.match(regex)) {
      setCurrState({
        ...currState,
        [event.target.name]: event.target.value.replace(/\D/, "")
      });
    }
  };

  const handleDateChange = date => {
    setCurrState({ ...currState, dateOfBirth: date });
  };

  useImperativeHandle(ref, () => ({
    addBioInfo: () => {
      console.log("testFunc caled!");
    }
  }));

  const {
    profilePhoto,
    firstName,
    lastName,
    phoneNr,
    mobileNr,
    streetName,
    houseNr,
    postCode,
    city,
    dateOfBirth,
    birthPlace,
    driveLicense,
    gender,
    nationality,
    maritalStatus,
    linkedIn,
    website
  } = currState;

  return (
    <Grid
      item
      container
      justify="center"
      style={{ margin: "auto" }}
      xs={12}
      sm={9}
      spacing={1}
    >
      <Box display="flex" width={1} mb={2} mx={1}>
        <Box>
          <div className={classes.profilePhoto}>
            {profilePhoto ? (
              <img src={profilePhoto} alt="profile" />
            ) : (
              <AddAPhotoIcon fontSize="large" />
            )}
          </div>
        </Box>
        <Box
          flexGrow={1}
          display="flex"
          ml={2}
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box width={1}>
            <TextField
              label="First name"
              name="firstName"
              value={firstName}
              // error
              // helperText="Some important text"
              variant="outlined"
              margin="dense"
              fullWidth
              onChange={handleInputChange}
            />
          </Box>
          <Box width={1}>
            <TextField
              label="Last name"
              name="lastName"
              value={lastName}
              //defaultValue="Default Value"
              // error
              // helperText="Some important text"
              variant="outlined"
              margin="dense"
              fullWidth
              onChange={handleInputChange}
            />
          </Box>
          <Box width={1}>
            <TextField
              label="E-mail address"
              defaultValue="Anything@hotmail.com"
              disabled
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
      {/***** *** *****/}
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            type="number"
            label="Phone number"
            name="phoneNr"
            value={phoneNr}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleNumberChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            type="number"
            label="Mobile"
            name="mobileNr"
            value={mobileNr}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleNumberChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="Address - street name"
            name="streetName"
            value={streetName}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="House nr"
            name="houseNr"
            value={houseNr}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="Postcode"
            name="postCode"
            value={postCode}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="City"
            name="city"
            value={city}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              margin="dense"
              inputVariant="outlined"
              disableFuture
              openTo="year"
              format="dd/MM/yyyy"
              label="Date of birth"
              //helperText="With min and max"
              placeholder="Choose your birth date"
              views={["year", "month", "date"]}
              maxDate={new Date("2010-12-31")}
              minDate={new Date("1920-12-31")}
              value={dateOfBirth}
              onChange={handleDateChange}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="Place of birth"
            name="birthPlace"
            value={birthPlace}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="Driving license"
            name="driveLicense"
            value={driveLicense}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="Gender"
            name="gender"
            value={gender}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="Your nationality"
            name="nationality"
            value={nationality}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="Marital status"
            name="maritalStatus"
            value={maritalStatus}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="LinkedIn"
            name="linkedIn"
            value={linkedIn}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <TextField
            label="Website"
            name="website"
            value={website}
            // error
            // helperText="Some important text"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
      </Grid>

      {/***** *** *****/}
    </Grid>
  );
});
