import React from "react";
import { inject, observer } from "mobx-react";
import { Edit, Delete } from "@material-ui/icons";
import "./Pages.css";

@inject("VehicleStore")
@observer
class VehiclePage extends React.Component {
  render() {
    return (
      <div className="vehicle__table">
        <select
          className="vehicle__dropdown--header"
          defaultValue={this.props.VehicleStore.filterBrand}
          onClick={e => this.props.VehicleStore.filterByBrand(e.target.value)}
        >
          <option value={0}>All Brands</option>
          {this.props.VehicleStore.getBrands(brand => (
            <option value={brand.id}>{brand.name}</option>
          ))}
        </select>
        <div className="vehicle__list--header">
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() => this.props.VehicleStore.sortByBrand()}
          >
            Brand{this.props.VehicleStore.sortBrand ? <text>▼</text> : null}
          </button>
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() => this.props.VehicleStore.sortByModel()}
          >
            Model
            {this.props.VehicleStore.sortModel ? <text>▼</text> : null}
          </button>
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() => this.props.VehicleStore.sortByYear()}
          >
            Year{this.props.VehicleStore.sortYear ? <text>▼</text> : null}
          </button>
        </div>
        <table className="vehicle__list">
          <tb>
            {this.props.VehicleStore.getVehicles(vehicle => (
              <tr key={vehicle.id}>
                <td className="vehicle__list--wrapper">
                  <li className="vehicle__column">{vehicle.name}</li>
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
                      this.props.VehicleStore.onDelete(vehicle.id);
                    }}
                  >
                    <Delete />
                  </button>
                </td>
                <td className="vehicle__list--wrapper">
                  <button
                    className="vehicle__column--button"
                    value={vehicle.id}
                    onClick={() => {
                      this.props.VehicleStore.renameFormMethod(vehicle.id);
                    }}
                  >
                    <Edit />
                  </button>
                </td>
              </tr>
            ))}
          </tb>
        </table>
        <div className="pagination__wrapper">
          <select
            onChange={e => {
              this.props.VehicleStore.pagingMethod(e.target.value);
            }}
          >
            {this.props.VehicleStore.pageCount.map(item => (
              <option value={item.pages}>{item.pages}</option>
            ))}
          </select>
          <button
            onClick={() => {
              this.props.VehicleStore.previousPageMethod();
            }}
            className={`prev ${
              this.props.VehicleStore.currentPage === 1 ? "disabled" : ""
            }`}
          >
            ◀
          </button>
          <button
            onClick={() => {
              this.props.VehicleStore.nextPageMethod();
            }}
            className={`next ${
              this.props.VehicleStore.currentPage ===
              this.props.VehicleStore.vehicleLastPage
                ? "disabled"
                : ""
            }`}
          >
            ▶
          </button>
        </div>
        {this.props.VehicleStore.showRenameForm ? (
          <form
            className="rename__form"
            onSubmit={e => {
              e.preventDefault();
              this.props.VehicleStore.onRenameMethod();
            }}
            value={this.props.VehicleStore.showRenameForm}
          >
            <p>Input New Brand</p>
            <select
              className="rename__dropdown"
              defaultValue={this.props.VehicleStore.renameVehicleBrand}
              onClick={e =>
                this.props.VehicleStore.setRenameVehicleBrand(e.target.value)
              }
            >
              {this.props.VehicleStore.getBrands(brand => (
                <option value={brand.name}>{brand.name}</option>
              ))}
            </select>
            <p>Input New Model</p>
            <input
              className="rename__fields"
              type="text"
              value={this.props.VehicleStore.renameVehicleModel}
              onChange={e => {
                this.props.VehicleStore.renameVehicleModelMethod(
                  e.target.value
                );
              }}
            />
            <p>Input New Year</p>
            <input
              className="rename__fields"
              type="text"
              value={this.props.VehicleStore.renameVehicleYear}
              onChange={e => {
                this.props.VehicleStore.renameVehicleYearMethod(e.target.value);
              }}
            />
            <button
              className="rename__button"
              type="submit"
              disabled={this.props.VehicleStore.renameSubmitDisabled}
            >
              Rename Vehicle
            </button>
          </form>
        ) : null}
        <form
          className="vehicle__form--container"
          onSubmit={e => {
            e.preventDefault();
            this.props.VehicleStore.addVehicleMethod();
          }}
        >
          <div>
            <select
              className="vehicle__dropdown"
              defaultValue={this.props.VehicleStore.formVehicleBrand}
              onClick={e =>
                this.props.VehicleStore.setFormVehicleBrand(e.target.value)
              }
            >
              <option selected hidden>
                Select Brand
              </option>
              {this.props.VehicleStore.getBrands(brand => (
                <option value={brand.name}>{brand.name}</option>
              ))}
            </select>
            <input
              className="vehicle__input"
              type="text"
              placeholder="Vehicle Model"
              value={this.props.VehicleStore.formVehicleModel}
              onChange={e => {
                this.props.VehicleStore.formVehicleModelMethod(e.target.value);
              }}
            />
            <input
              className="vehicle__input"
              type="text"
              placeholder="Vehicle Year"
              value={this.props.VehicleStore.formVehicleYear}
              onChange={e => {
                this.props.VehicleStore.formVehicleYearMethod(e.target.value);
              }}
            />
          </div>

          <button
            className="vehicle__btn--submit"
            type="submit"
            disabled={this.props.VehicleStore.formSubmitDisabled}
          >
            Add Vehicle
          </button>
        </form>
        {this.props.VehicleStore.getParentId()}
      </div>
    );
  }
}

export { VehiclePage };
