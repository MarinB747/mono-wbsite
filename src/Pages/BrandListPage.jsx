import React, { Component } from "react";
import "./Pages.css";
import { Brand } from "./VehicleListPageStore/BrandListStore";
import { inject, observer } from "mobx-react";
@inject("VehicleStore")
@inject("ListStore")
@observer
class BrandListPage extends Component {
  render() {
    return (
      <div className="brand__table">
        <Brand />
      </div>
    );
  }
}

export { BrandListPage };
