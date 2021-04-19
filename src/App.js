import Home from "./Pages/Home.jsx";
import VehicleListPage from "./Pages/VehicleListPage";
import About from "./Pages/About.jsx";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/store" exact component={VehicleListPage} />
          <Route path="/about" exact component={About} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
