import React from "react";
import { observable, action, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import "../Pages.css";

class FormStore {
  constructor() {
    makeObservable(this);
  }
  @observable vehicleBrand = "BMW";
  @observable vehicleModel = "";
  @observable vehicleYear = "";
  @observable submitDisabled = true;

  @action setVehicleBrand(e) {
    this.vehicleBrand = e;
  }
  @action setVehicleModel(e) {
    this.vehicleModel = e;
  }
  @action setVehicleYear(e) {
    this.vehicleYear = e;
  }
  @action setSubmitDisabled(e) {
    this.submitDisabled = e;
  }
}
@inject("VehicleStore")
@inject("FormStore")
@observer
class Form extends React.Component {
  render() {
    return (
      <form
        className="vehicle__form--container"
        onSubmit={(e) => {
          this.props.VehicleStore.addVehicle({
            brand: this.props.FormStore.vehicleBrand,
            brand_slug: this.props.FormStore.vehicleBrand.toLowerCase(),
            model: this.props.FormStore.vehicleModel,
            year: this.props.FormStore.vehicleYear,
            id:
              Math.max.apply(
                null,
                this.props.VehicleStore.vehicle.map((obj) => obj.id)
              ) + 1
          });
          this.props.FormStore.setVehicleModel("");
          this.props.FormStore.setVehicleYear("");
          e.preventDefault();
        }}
      >
        <div>
          <select
            className="vehicle__dropdown"
            defaultValue={this.props.FormStore.vehicleBrand}
            onClick={(e) =>
              this.props.FormStore.setVehicleBrand(e.target.value)
            }
          >
            {this.props.VehicleStore.brand.map((brand) => (
              <option value={brand.name}>{brand.name}</option>
            ))}
          </select>
          <input
            className="vehicle__input"
            type="text"
            placeholder="Vehicle Model"
            value={this.props.FormStore.vehicleModel}
            onChange={(e) => {
              this.props.FormStore.setVehicleModel(e.target.value);
              if (
                this.props.FormStore.vehicleModel &&
                this.props.FormStore.vehicleYear !== ""
              ) {
                this.props.FormStore.setSubmitDisabled(false);
              } else {
                this.props.FormStore.setSubmitDisabled(true);
              }
            }}
          />
          <input
            className="vehicle__input"
            type="text"
            placeholder="Vehicle Year "
            value={this.props.FormStore.vehicleYear}
            onChange={(e) => {
              if (e.target.value.match("^[0-9]{1,4}$") != null) {
                this.props.FormStore.setVehicleYear(e.target.value);
              }
              if (
                this.props.FormStore.vehicleModel &&
                this.props.FormStore.vehicleYear !== ""
              ) {
                this.props.FormStore.setSubmitDisabled(false);
              } else {
                this.props.FormStore.setSubmitDisabled(true);
              }
            }}
          />
        </div>

        <button
          className="vehicle__btn--submit"
          type="submit"
          disabled={this.props.FormStore.submitDisabled}
        >
          Add Vehicle
        </button>
      </form>
    );
  }
}

export { Form, FormStore };
