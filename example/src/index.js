import React from "react";
import ReactDOM from "react-dom";

import { createMediator, MediatorProvider } from "../../lib";

import App from "./App";
import "./index.css";

const mediator = createMediator();

ReactDOM.render(
  <MediatorProvider mediator={mediator}>
    <App />
  </MediatorProvider>,
  document.getElementById("root")
);