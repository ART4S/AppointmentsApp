import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import Server from "api/server";

import "./index.scss";

new Server();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
