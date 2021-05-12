import React from "react";
import { inject, observer } from "mobx-react";
import { Edit, Delete } from "@material-ui/icons";
import "./Pages.css";

@inject("PageStore")
@observer
class VehiclePage extends React.Component {
  render() {
    return (
      <div className="vehicle__table">
        <select
          className="vehicle__dropdown--header"
          value={this.props.PageStore.BrandService.brand.name}
          onClick={e =>
            this.props.PageStore.VehicleStore.filterByBrand(e.target.value)
          }
        >
          <option value={0}>All Brands</option>
          {this.props.PageStore.BrandService.brand.map(brand => (
            <option value={brand.id}>{brand.name}</option>
          ))}
        </select>
        <div className="vehicle__list--header">
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() =>
              this.props.PageStore.VehicleStore.sortByBrand(
                this.props.PageStore.VehicleService.vehicle
              )
            }
          >
            Brand
          </button>
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() =>
              this.props.PageStore.VehicleStore.sortByModel(
                this.props.PageStore.VehicleService.vehicle
              )
            }
          >
            Model
          </button>
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() =>
              this.props.PageStore.VehicleStore.sortByYear(
                this.props.PageStore.VehicleService.vehicle
              )
            }
          >
            Year
          </button>
        </div>
        <table className="vehicle__list">
          <tb>
            {this.props.PageStore.VehicleService.vehicle
              .filter(item => {
                if (this.props.PageStore.VehicleStore.filterBrand !== 0) {
                  return (
                    item.brand_id ===
                    this.props.PageStore.VehicleStore.filterBrand
                  );
                } else {
                  return true;
                }
              })
              .slice(
                this.props.PageStore.VehicleStore.startIndex,
                this.props.PageStore.VehicleStore.endIndex
              )
              .map(vehicle => (
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
                        let x = this.props.PageStore.VehicleService.onDelete(
                          vehicle.id,
                          this.props.PageStore.VehicleService.vehicle
                        );
                        this.props.PageStore.VehicleService.vehicle = x;
                      }}
                    >
                      <Delete />
                    </button>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <button
                      className="vehicle__column--button"
                      value={vehicle.id}
                      onClick={e => {
                        this.props.PageStore.VehicleService.getRenameId(
                          e.currentTarget.value
                        );
                        this.props.PageStore.VehicleStore.setShowRenameForm();
                        this.props.PageStore.VehicleService.setPlaceholderModel(
                          this.props.PageStore.VehicleService.vehicle
                        );
                        this.props.PageStore.VehicleService.setPlaceholderYear(
                          this.props.PageStore.VehicleService.vehicle
                        );
                        this.props.PageStore.VehicleService.setPlaceholderBrand(
                          this.props.PageStore.VehicleService.vehicle
                        );
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
              this.props.PageStore.VehicleStore.setRowsPerPage(e.target.value);
              this.props.PageStore.VehicleStore.setStartIndex();
              this.props.PageStore.VehicleStore.setEndIndex();
            }}
          >
            {this.props.PageStore.VehicleStore.pageCount.map(item => (
              <option value={item.pages}>{item.pages}</option>
            ))}
          </select>
          <button
            onClick={() => {
              this.props.PageStore.VehicleStore.setPreviousPage();
              this.props.PageStore.VehicleStore.setStartIndex();
              this.props.PageStore.VehicleStore.setEndIndex();
            }}
            className={`prev ${
              this.props.PageStore.VehicleStore.currentPage === 1
                ? "disabled"
                : ""
            }`}
          >
            ◀
          </button>
          <button
            onClick={() => {
              this.props.PageStore.VehicleStore.setNextPage();
              this.props.PageStore.VehicleStore.setStartIndex();
              this.props.PageStore.VehicleStore.setEndIndex();
            }}
            className={`next ${
              this.props.PageStore.VehicleStore.currentPage ===
              this.props.PageStore.vehicleLastPage
                ? "disabled"
                : ""
            }`}
          >
            ▶
          </button>
        </div>
        {this.props.PageStore.VehicleStore.showRenameForm ? (
          <form
            className="rename__form"
            onSubmit={e => {
              e.preventDefault();
              this.props.PageStore.VehicleService.onRename(
                this.props.PageStore.VehicleService.vehicle
              );
              this.props.PageStore.VehicleStore.setShowRenameForm();
              this.props.PageStore.VehicleService.setRenameVehicleModel("");
              this.props.PageStore.VehicleService.setRenameVehicleYear("");
            }}
            value={this.props.PageStore.VehicleStore.showRenameForm}
          >
            <p>Input New Brand</p>
            <select
              className="rename__dropdown"
              defaultValue={
                this.props.PageStore.VehicleService.renameVehicleBrand
              }
              onClick={e =>
                this.props.PageStore.VehicleService.setRenameVehicleBrand(
                  e.target.value
                )
              }
            >
              {this.props.PageStore.BrandService.brand.map(brand => (
                <option value={brand.name}>{brand.name}</option>
              ))}
            </select>
            <p>Input New Model</p>
            <input
              className="rename__fields"
              type="text"
              value={this.props.PageStore.VehicleService.renameVehicleModel}
              onChange={e => {
                this.props.PageStore.VehicleService.setRenameVehicleModel(
                  e.target.value
                );
                if (
                  this.props.PageStore.VehicleService.renameVehicleModel &&
                  this.props.PageStore.VehicleService.renameVehicleYear !== ""
                ) {
                  this.props.PageStore.VehicleStore.setRenameSubmitDisabled(
                    false
                  );
                } else {
                  this.props.PageStore.VehicleStore.setRenameSubmitDisabled(
                    true
                  );
                }
              }}
            />
            <p>Input New Year</p>
            <input
              className="rename__fields"
              type="text"
              value={this.props.PageStore.VehicleService.renameVehicleYear}
              onChange={e => {
                if (e.currentTarget.value.match("^[0-9]{1,4}$") != null) {
                  this.props.PageStore.VehicleService.setRenameVehicleYear(
                    e.target.value
                  );
                }
                if (
                  this.props.PageStore.VehicleService.renameVehicleModel &&
                  this.props.PageStore.VehicleService.renameVehicleYear !== ""
                ) {
                  this.props.PageStore.VehicleStore.setRenameSubmitDisabled(
                    false
                  );
                } else {
                  this.props.PageStore.VehicleStore.setRenameSubmitDisabled(
                    true
                  );
                }
              }}
            />
            <button
              className="rename__button"
              type="submit"
              disabled={this.props.PageStore.VehicleStore.renameSubmitDisabled}
            >
              Rename Vehicle
            </button>
          </form>
        ) : null}
        <form
          className="vehicle__form--container"
          onSubmit={e => {
            e.preventDefault();
            this.props.PageStore.VehicleService.addVehicle(
              {
                brand: this.props.PageStore.VehicleStore.formVehicleBrand,
                model: this.props.PageStore.VehicleStore.formVehicleModel,
                year: this.props.PageStore.VehicleStore.formVehicleYear,
                id: this.props.PageStore.vehicleId
              },
              this.props.PageStore.VehicleStore.formVehicleBrand
            );
            this.props.PageStore.VehicleStore.setFormVehicleModel("");
            this.props.PageStore.VehicleStore.setFormVehicleYear("");
          }}
        >
          <div>
            <select
              className="vehicle__dropdown"
              defaultValue={this.props.PageStore.VehicleStore.formVehicleBrand}
              onClick={e =>
                this.props.PageStore.VehicleStore.setFormVehicleBrand(
                  e.target.value
                )
              }
            >
              <option selected hidden>
                Select Brand
              </option>
              {this.props.PageStore.BrandService.brand.map(brand => (
                <option value={brand.name}>{brand.name}</option>
              ))}
            </select>
            <input
              className="vehicle__input"
              type="text"
              placeholder="Vehicle Model"
              value={this.props.PageStore.VehicleStore.formVehicleModel}
              onChange={e => {
                this.props.PageStore.VehicleStore.setFormVehicleModel(
                  e.target.value
                );
                if (
                  this.props.PageStore.VehicleStore.formVehicleModel &&
                  this.props.PageStore.VehicleStore.formVehicleYear !== ""
                ) {
                  this.props.PageStore.VehicleStore.setFormSubmitDisabled(
                    false
                  );
                } else {
                  this.props.PageStore.VehicleStore.setFormSubmitDisabled(true);
                }
              }}
            />
            <input
              className="vehicle__input"
              type="text"
              placeholder="Vehicle Year"
              value={this.props.PageStore.VehicleStore.formVehicleYear}
              onChange={e => {
                if (e.target.value.match("^[0-9]{1,4}$") != null) {
                  this.props.PageStore.VehicleStore.setFormVehicleYear(
                    e.target.value
                  );
                }
                if (
                  this.props.PageStore.VehicleStore.formVehicleModel &&
                  this.props.PageStore.VehicleStore.formVehicleYear !== ""
                ) {
                  this.props.PageStore.VehicleStore.setFormSubmitDisabled(
                    false
                  );
                } else {
                  this.props.PageStore.VehicleStore.setFormSubmitDisabled(true);
                }
              }}
            />
          </div>

          <button
            className="vehicle__btn--submit"
            type="submit"
            disabled={this.props.PageStore.VehicleStore.formSubmitDisabled}
          >
            Add Vehicle
          </button>
        </form>
        {this.props.PageStore.getBrandId()}
      </div>
    );
  }
}

export { VehiclePage };
