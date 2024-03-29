import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "flatifycss/scss/flatify-rtl.scss";
import "./index.scss";
import "highlight.js/styles/qtcreator_dark.css";
import { ThemeProvider } from "@contexts/theme";

import Vajehh from "./App";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as Element);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Vajehh />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
