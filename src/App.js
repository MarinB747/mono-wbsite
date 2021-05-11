import Home from "./Pages/Home/Home.jsx";
import { VehiclePage } from "./Pages/Vehicle/VehiclePage";
import About from "./Pages/About/About.jsx";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { BrandPage } from "./Pages//Brand/BrandPage.jsx";
import { PageStore } from "./Store/PageStore";

function App() {
  return (
    <Provider PageStore={new PageStore()}>
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
