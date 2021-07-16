import React from "react";
import "./Pages.css";
import { inject } from "mobx-react";
import "./Pages.css";
@inject("PageStore")
class Home extends React.PureComponent {
  componentDidMount = () => {
    this.props.PageStore.BrandStore.getBrandList();
    this.props.PageStore.VehicleStore.getBrandList();
  };
  render() {
    return (
      <div className="page">
        <h1 className="home__title">WELCOME</h1>
      </div>
    );
  }
}

export { Home };
