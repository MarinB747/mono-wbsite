import React, { Component } from "react";
import "./Pages.css";
import { List } from "./VehicleListPageStore/VehicleListStore";
import { inject, observer } from "mobx-react";
import { Form } from "./VehicleListPageStore/VehicleFormStore";
@inject("VehicleStore")
@inject("ListStore")
@observer
class VehicleListPage extends Component {
  render() {
    return (
      <div className="vehicle__table">
        <List />
        <Form />
      </div>
    );
  }
}

export { VehicleListPage };
