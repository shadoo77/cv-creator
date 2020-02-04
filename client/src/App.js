import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RootContextProvider } from "./context/";
import "./App.css";
import MainApp from "./components/MainApp";

function App() {
  return (
    <Router>
      <div className="App">
        <RootContextProvider>
          <MainApp />
        </RootContextProvider>
      </div>
    </Router>
  );
}

export default App;
