import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { fetchCountrys } from "./features/countrys/countrysSlice";
import store from "./store";

store.dispatch(fetchCountrys());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
