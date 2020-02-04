import React, { useState, useRef } from "react";
// Components
import PersonalInfo from "./Personalia";
import ExperiencesAndEducation from "./EduAndExp";
import TemplateChoose from "./ChooseTemplate";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return [
    "Personal informations",
    "Experiences and Educations",
    "Select your template"
  ];
}

export default () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const handleNext = () => {
    if (activeStep === 0) {
      ref1.current && ref1.current.addBioInfo();
    } else if (activeStep === 1) {
      ref2.current && ref2.current.AddExperiences();
    } else if (activeStep === 2) {
      ref3.current && ref3.current.downloadTemplate();
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return <PersonalInfo ref={ref1} />;
      case 1:
        return <ExperiencesAndEducation ref={ref2} />;
      case 2:
        return <TemplateChoose ref={ref3} />;
      default:
        return "Unknown stepIndex";
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions} component="div">
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
