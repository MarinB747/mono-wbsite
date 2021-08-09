import { Home } from "./Pages/Home.jsx";
import { VehiclePage } from "./Pages/VehiclePage";
import About from "./Pages/About.jsx";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { Router } from "react-router-mobx";
import { BrandPage } from "./Pages/BrandPage.jsx";
import { pageStore } from "./Store/PageStore";
import { VehicleEditPage } from "./Pages/VehicleEditPage";
import { BrandEditPage } from "./Pages/BrandEditPage";

import React from "react";

function App() {
  return (
    <Provider PageStore={pageStore}>
      <div className="app">
        <Router
          component={BrowserRouter}
          routerStore={pageStore.RouterStore}
          history={pageStore.RouterStore.history}
        >
          <>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/store" exact component={VehiclePage} />
              <Route path="/store-edit/:id" exact component={VehicleEditPage} />
              <Route path="/brand-edit/:id" exact component={BrandEditPage} />
              <Route path="/brand" exact component={BrandPage} />
              <Route path="/about" exact component={About} />
            </Switch>
          </>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
