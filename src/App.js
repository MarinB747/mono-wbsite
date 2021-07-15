import { Home } from "./Pages/Home.jsx";
import { VehiclePage } from "./Pages/VehiclePage";
import About from "./Pages/About.jsx";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { BrandPage } from "./Pages/BrandPage.jsx";
import { pageStore } from "./Store/PageStore";

function App() {
  return (
    <Provider
      PageStore={pageStore}
      VehicleStore={pageStore.VehicleStore}
      BrandStore={pageStore.BrandStore}
      RouterStore={pageStore.RouterStore}
    >
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/store" exact component={VehiclePage} />
            <Route path="/brand" exact component={BrandPage} />
            <Route path="/about" exact component={About} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
