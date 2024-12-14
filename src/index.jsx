import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import GlobalStyle from "components/global/GlobalStyle";
import { Provider } from "react-redux";
import store from "./redux/store";

document.body.style.backgroundColor = "#f0f0f0";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </Provider>
);
