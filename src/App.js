import Home from "./Pages/Home.jsx";
import { VehicleListPage } from "./Pages/VehicleListPage";
import About from "./Pages/About.jsx";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { VehicleStore } from "./Pages/VehicleListPageStore/VehicleStore";
import { ListStore } from "./Pages/VehicleListPageStore/VehicleListStore";
import { FormStore } from "./Pages/VehicleListPageStore/VehicleFormStore";
import { BrandListPage } from "./Pages/BrandListPage.jsx";
import { BrandStore } from "./Pages/VehicleListPageStore/BrandListStore.jsx";
function App() {
  return (
    <Provider
      VehicleStore={new VehicleStore()}
      ListStore={new ListStore()}
      FormStore={new FormStore()}
      BrandStore={new BrandStore()}
    >
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/store" exact component={VehicleListPage} />
            <Route path="/brand" exact component={BrandListPage} />
            <Route path="/about" exact component={About} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
