import React, { useState, useEffect, useRef, useContext } from "react";
import { RootContext } from "../../../context";
import { fetchTemplates } from "../../../context/actions/templates";
// With fetching data
//import WithFetching from "../../shared/WithFetching";
import WithFetchWrapper from "../../shared/WithFetchWrapper";
// Material UI
import { Button, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// Dialog
import ImgDialog from "./Dialog";

const useStyles = makeStyles(theme => ({
  container: {
    //backgroundColor: "green",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    padding: 0,
    margin: 0
  },
  sliders: {
    //backgroundColor: "yellow",
    width: "80%",
    height: 320,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    padding: 0,
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      height: 220
    }
  },
  sliderItem: {
    position: "relative",
    backgroundColor: "orange",
    minWidth: "calc(25% - 14px)",
    display: "flex",
    margin: "7px",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    transition: "0.5s",
    border: "1px solid #000",
    [theme.breakpoints.down("sm")]: {
      height: 200
    },
    "&:hover": {
      height: 310,
      minWidth: "calc(26% - 18px)",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        height: 210
      }
    },
    "&:hover $chooceBtn": {
      display: "block"
    }
  },
  chooceBtn: {
    position: "absolute",
    display: "none",
    bottom: 5,
    transition: "all 0.3s ease"
  },
  iconButton: {
    zIndex: 1000,
    margin: "0 7px",
    cursor: "pointer",
    color: "#d6d6d6",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#000"
    }
  }
}));

// Carousel Component
export default function Carousel(props) {
  //const { items } = props.data;
  // console.log("Carousel props items >>>>>>>>> ", props);
  const { state, dispatch } = useContext(RootContext);
  const classes = useStyles();
  const sliders = state.templates.data;
  const [dialog, setDialog] = useState({ open: false, imageSrc: "" });
  const [count, setCount] = useState({
    firstItem: 0,
    lastItem: 3
  });
  const [horPosition, setHorPosition] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(0);
  const [chooseButton, setChooseButton] = React.useState(false);
  const sliderRef = useRef();

  const activeChooseButton = () => {
    setChooseButton(true);
  };

  const deactiveChooseButton = () => {
    setChooseButton(false);
  };

  //console.log("Carousel props state >>>>>>>>> ", state);

  // Resize handler
  useEffect(() => {
    const resizeHandler = () => {
      const width = sliderRef.current ? sliderRef.current.offsetWidth : 0;
      setCurrentWidth(width);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler, false);
    return () => window.removeEventListener("resize", resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderRef.current]);

  // Fetch data
  useEffect(() => {
    fetchTemplates(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = imgSrc => {
    setDialog({ ...dialog, open: true, imageSrc: imgSrc });
  };

  const handleClose = () => {
    setDialog({ ...dialog, open: false, imageSrc: "" });
  };

  const navigateToLeft = () => {
    if (count.firstItem > 0) {
      setCount({
        ...count,
        firstItem: count.firstItem - 1,
        lastItem: count.lastItem - 1
      });
      let itemWidth;
      if (sliderRef.current) {
        itemWidth = currentWidth / 4;
      }
      setHorPosition(horPosition + itemWidth);
    }
  };

  const navigateToRight = () => {
    if (count.lastItem < sliders.length - 1) {
      setCount({
        ...count,
        firstItem: count.firstItem + 1,
        lastItem: count.lastItem + 1
      });
      let itemWidth;
      if (sliderRef.current) {
        itemWidth = currentWidth / 4;
      }
      setHorPosition(horPosition - itemWidth);
    }
  };

  const sliderTranslate = () => {
    return { transform: `translateX(${horPosition}px)` };
  };

  return (
    <WithFetchWrapper state={state.templates}>
      <div className={classes.container}>
        <ArrowBackIosIcon
          className={classes.iconButton}
          onClick={navigateToLeft}
        />
        <div className={classes.sliders} ref={sliderRef}>
          {sliders.map((item, index) => {
            const temp = require(`../../../assets/cv-templates/${item.imgSrc}`);
            return (
              <div
                className={classes.sliderItem}
                key={index}
                style={sliderTranslate()}
                onClick={() => handleClickOpen(temp)}
                onMouseMove={activeChooseButton}
                onMouseLeave={deactiveChooseButton}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={temp}
                  alt={index}
                />
                <Fade in={chooseButton}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.chooceBtn}
                    onClick={e => {
                      e.stopPropagation();
                      props.history.push("/steppers");
                    }}
                  >
                    Chooce
                  </Button>
                </Fade>
              </div>
            );
          })}
        </div>
        <ArrowForwardIosIcon
          className={classes.iconButton}
          onClick={navigateToRight}
        />
      </div>
      <ImgDialog
        imageSrc={dialog.imageSrc}
        open={dialog.open}
        onClose={handleClose}
      />
    </WithFetchWrapper>
  );
}

//export default WithFetching(Carousel);
