import React from "react";
import "./App.scss";

import Header from "./components/Headers/Header.js";

import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header/>
      </BrowserRouter>
    </div>
  );
};

export default App;
