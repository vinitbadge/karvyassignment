import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddCountry } from "./features/countrys/AddCountry";
import React from "react";
import { CountryList } from "./features/countrys/CountryList";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/add-country">
            <AddCountry />
          </Route>
          <Route path="/">
            <CountryList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
