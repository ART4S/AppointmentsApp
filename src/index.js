import React from "react";
import ReactDOM from "react-dom";

import Server from "api/server";
import App from "./App";

import "./index.scss";

Server();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
