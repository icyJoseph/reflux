import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "reflux";

import App from "./ui/App";
import "./index.css";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
