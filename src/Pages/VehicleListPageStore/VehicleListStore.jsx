import React from "react";
import { observable, action, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import { Edit, Delete } from "@material-ui/icons";
import "../Pages.css";

class ListStore {
  constructor() {
    makeObservable(this);
  }
  @observable rowsPerPage = 5;
  @observable currentPage = 1;
  @observable filterBrand = 0;
  @observable pageCount = [{ pages: 5 }, { pages: 10 }, { pages: 20 }];
  @observable vehicleBrand = "";
  @observable vehicleModel = "";
  @observable vehicleYear = "";
  @observable renameId = "";
  @observable showRenameForm = false;
  @observable startIndex = 0;
  @observable endIndex = 5;
  @observable submitDisabled = true;

  @action setRowsPerPage(e) {
    this.rowsPerPage = parseInt(e);
    console.log(this.rowsPerPage, this.startIndex, this.endIndex);
  }
  @action setPreviousPage() {
    this.currentPage = parseInt(this.currentPage - 1);
    console.log(this.currentPage);
  }
  @action setNextPage() {
    this.currentPage = parseInt(this.currentPage + 1);
    console.log(this.currentPage);
  }
  @action filterByBrand(e) {
    console.log(e);
    this.filterBrand = parseInt(e);
  }
  @action setVehilceBrand(e) {
    this.vehicleBrand = e;
  }
  @action setVehicleModel(e) {
    this.vehicleModel = e;
  }
  @action setVehicleYear(e) {
    this.vehicleYear = e;
  }
  @action setRenameId(e) {
    this.renameId = parseInt(e);
  }

  @action setShowRenameForm() {
    this.showRenameForm = !this.showRenameForm;
  }
  @action sortByBrand(item) {
    item.sort((b, a) => (a.brand < b.brand ? 1 : a.brand > b.brand ? -1 : 0));
  }
  @action sortByModel(item) {
    item.sort((b, a) => (a.model < b.model ? 1 : a.model > b.model ? -1 : 0));
  }
  @action sortByYear(item) {
    item.sort((b, a) => (a.year < b.year ? 1 : a.year > b.year ? -1 : 0));
  }
  @action onDelete(id, vehicles) {
    console.log(id, vehicles);
    const vehicle = vehicles.findIndex((item) => item.id === id);
    vehicles.splice(vehicle, 1);
    return vehicles;
  }
  @action setPlaceholderBrand(e) {
    let placeholderName = e.find((obj) => obj.id === this.renameId);
    this.vehicleBrand = placeholderName.brand;
  }
  @action setPlaceholderModel(e) {
    let placeholderName = e.find((obj) => obj.id === this.renameId);
    this.vehicleModel = placeholderName.model;
  }
  @action setPlaceholderYear(e) {
    let placeholderName = e.find((obj) => obj.id === this.renameId);
    this.vehicleYear = placeholderName.year;
  }
  @action
  onRename(e) {
    const objRename = e.findIndex((obj) => obj.id === this.renameId);
    e[objRename].brand = this.vehicleBrand;
    e[objRename].brand_slug = this.vehicleBrand.toLowerCase();
    e[objRename].model = this.vehicleModel;
    e[objRename].year = this.vehicleYear;
  }
  @action setStartIndex() {
    this.startIndex = this.currentPage * this.rowsPerPage - this.rowsPerPage;
    console.log(this.startIndex);
  }
  @action setEndIndex() {
    this.endIndex = this.startIndex + this.rowsPerPage;
    console.log(this.endIndex);
  }
  @action setSubmitDisabled(e) {
    this.submitDisabled = e;
  }
}
@inject("VehicleStore")
@inject("ListStore")
@observer
class List extends React.Component {
  render() {
    return (
      <div>
        <select
          className="vehicle__dropdown--header"
          value={this.props.VehicleStore.brand.name}
          onClick={(e) => this.props.ListStore.filterByBrand(e.target.value)}
        >
          <option value={0}>All Brands</option>
          {this.props.VehicleStore.brand.map((brand) => (
            <option value={brand.id}>{brand.name}</option>
          ))}
        </select>
        <div className="vehicle__list--header">
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() =>
              this.props.ListStore.sortByBrand(this.props.VehicleStore.vehicle)
            }
          >
            Brand
          </button>
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() =>
              this.props.ListStore.sortByModel(this.props.VehicleStore.vehicle)
            }
          >
            Model
          </button>
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() =>
              this.props.ListStore.sortByYear(this.props.VehicleStore.vehicle)
            }
          >
            Year
          </button>
        </div>
        <table className="vehicle__list">
          <tb>
            {this.props.VehicleStore.vehicle
              .filter((item) => {
                if (this.props.ListStore.filterBrand !== 0) {
                  return item.brand_id === this.props.ListStore.filterBrand;
                } else {
                  return true;
                }
              })
              .slice(
                this.props.ListStore.startIndex,
                this.props.ListStore.endIndex
              )
              .map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="vehicle__list--wrapper">
                    <li className="vehicle__column">{vehicle.brand}</li>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <li className="vehicle__column">{vehicle.model}</li>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <li className="vehicle__column">{vehicle.year}</li>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <button
                      className="vehicle__column--button"
                      value={vehicle.id}
                      onClick={() => {
                        let x = this.props.ListStore.onDelete(
                          vehicle.id,
                          this.props.VehicleStore.vehicle
                        );
                        this.props.VehicleStore.vehicle = x;
                      }}
                    >
                      <Delete />
                    </button>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <button
                      className="vehicle__column--button"
                      value={vehicle.id}
                      onClick={(e) => {
                        this.props.ListStore.setRenameId(e.currentTarget.value);
                        this.props.ListStore.setShowRenameForm();
                        this.props.ListStore.setPlaceholderModel(
                          this.props.VehicleStore.vehicle
                        );
                        this.props.ListStore.setPlaceholderYear(
                          this.props.VehicleStore.vehicle
                        );
                        this.props.ListStore.setPlaceholderBrand(
                          this.props.VehicleStore.vehicle
                        );
                      }}
                    >
                      <Edit />
                    </button>
                  </td>
                </tr>
              ))}
            {this.props.VehicleStore.getBrandId()}
          </tb>
        </table>
        <div className="pagination__wrapper">
          <select
            onChange={(e) => {
              this.props.ListStore.setRowsPerPage(e.target.value);
              this.props.ListStore.setStartIndex();
              this.props.ListStore.setEndIndex();
            }}
          >
            {this.props.ListStore.pageCount.map((item) => (
              <option value={item.pages}>{item.pages}</option>
            ))}
          </select>
          <button
            onClick={() => {
              this.props.ListStore.setPreviousPage();
              this.props.ListStore.setStartIndex();
              this.props.ListStore.setEndIndex();
            }}
            className={`prev ${
              this.props.ListStore.currentPage === 1 ? "disabled" : ""
            }`}
          >
            ◀
          </button>
          <button
            onClick={() => {
              this.props.ListStore.setNextPage();
              this.props.ListStore.setStartIndex();
              this.props.ListStore.setEndIndex();
            }}
            className={`next ${
              this.props.ListStore.currentPage ===
              Math.ceil(
                this.props.VehicleStore.vehicle.length /
                  this.props.ListStore.rowsPerPage
              )
                ? "disabled"
                : ""
            }`}
          >
            ▶
          </button>
        </div>
        {this.props.ListStore.showRenameForm ? (
          <form
            className="rename__form"
            onSubmit={(e) => {
              e.preventDefault();
              this.props.ListStore.onRename(this.props.VehicleStore.vehicle);
              this.props.ListStore.setVehicleModel("");
              this.props.ListStore.setVehicleYear("");
            }}
            value={this.props.ListStore.showRenameForm}
          >
            <p>Input New Brand</p>
            <select
              className="rename__dropdown"
              defaultValue={this.props.ListStore.vehicleBrand}
              onClick={(e) =>
                this.props.ListStore.setVehicleBrand(e.target.value)
              }
            >
              {this.props.VehicleStore.brand.map((brand) => (
                <option value={brand.name}>{brand.name}</option>
              ))}
            </select>
            <p>Input New Model</p>
            <input
              className="rename__fields"
              type="text"
              value={this.props.ListStore.vehicleModel}
              onChange={(e) => {
                this.props.ListStore.setVehicleModel(e.target.value);
                if (
                  this.props.ListStore.vehicleModel &&
                  this.props.ListStore.vehicleYear !== ""
                ) {
                  this.props.ListStore.setSubmitDisabled(false);
                } else {
                  this.props.ListStore.setSubmitDisabled(true);
                }
              }}
            />
            <p>Input New Year</p>
            <input
              className="rename__fields"
              type="text"
              value={this.props.ListStore.vehicleYear}
              onChange={(e) => {
                if (e.currentTarget.value.match("^[0-9]{1,4}$") != null) {
                  this.props.ListStore.setVehicleYear(e.target.value);
                }
                if (
                  this.props.ListStore.vehicleModel &&
                  this.props.ListStore.vehicleYear !== ""
                ) {
                  this.props.ListStore.setSubmitDisabled(false);
                } else {
                  this.props.ListStore.setSubmitDisabled(true);
                }
              }}
            />
            <button
              className="rename__button"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.props.ListStore.onRename(this.props.VehicleStore.vehicle);
                this.props.ListStore.setShowRenameForm();
                this.props.ListStore.setVehicleModel("");
                this.props.ListStore.setVehicleYear("");
              }}
              disabled={this.props.ListStore.submitDisabled}
            >
              Rename Vehicle
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}

export { List, ListStore };
