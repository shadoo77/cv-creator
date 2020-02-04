import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// Multi theme material ui
import { ThemeProvider } from "@material-ui/styles";
import { MainTheme } from "./components/shared/Theme";
import CssBaseline from "@material-ui/core/CssBaseline";

const MyApp = (
  <>
    <CssBaseline />
    <ThemeProvider theme={MainTheme}>
      <App />
    </ThemeProvider>
  </>
);

ReactDOM.render(MyApp, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
