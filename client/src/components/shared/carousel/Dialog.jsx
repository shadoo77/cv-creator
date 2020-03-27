import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

//const useStyles = makeStyles({});

export default props => {
  //const classes = useStyles();
  const { open, onClose, imageSrc } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullWidth
      aria-labelledby="simple-dialog-title"
      open={open}
      onClose={handleClose}
    >
      <img
        src={imageSrc}
        alt="nothing"
        style={{ width: "100%", heigth: "100%" }}
      />
    </Dialog>
  );
};
