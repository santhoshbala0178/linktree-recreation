import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
  </Provider>,
  rootElement
);
