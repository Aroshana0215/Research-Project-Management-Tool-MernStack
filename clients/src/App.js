import React from "react";
import "./App.scss";

import Navbar from "./components/Headers/HomeNavBar/navBar";

import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </div>
  );
};

export default App;
