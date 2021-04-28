import React from "react";
import { observable, action, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import { Edit } from "@material-ui/icons";
import "../Pages.css";

class BrandStore {
  constructor() {
    makeObservable(this);
  }
  @observable rowsPerPage = 5;
  @observable currentPage = 1;
  @observable pageCount = [{ pages: 5 }, { pages: 10 }, { pages: 20 }];
  @observable vehicleBrand = "";
  @observable renameBrand = "";
  @observable renameId = "";
  @observable showRenameForm = false;
  @observable startIndex = 0;
  @observable endIndex = 5;
  @observable submitDisabled = true;
  @observable renameSubmitDisabled = true;
  @action setRowsPerPage(e) {
    this.rowsPerPage = parseInt(e);
  }
  @action setPreviousPage() {
    this.currentPage = parseInt(this.currentPage - 1);
  }
  @action setNextPage() {
    this.currentPage = parseInt(this.currentPage + 1);
  }
  @action setVehicleBrand(e) {
    this.vehicleBrand = e;
  }
  @action setRenameBrand(e) {
    this.renameBrand = e;
  }
  @action setRenameId(e) {
    this.renameId = parseInt(e);
  }

  @action setShowRenameForm() {
    this.showRenameForm = !this.showRenameForm;
  }
  @action sortByBrand(item) {
    item.sort((b, a) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0));
  }

  @action onDelete(id, brands) {
    const brand = brands.findIndex((item) => item.id === id);
    brands.splice(brand, 1);
    return brands;
  }
  @action setPlaceholderBrand(e) {
    let placeholderName = e.find((obj) => obj.id === this.renameId);
    this.renameBrand = placeholderName.name;
  }
  @action
  onRename(e) {
    const objRename = e.findIndex((obj) => obj.id === this.renameId);
    e[objRename].name = this.renameBrand;
  }
  @action setStartIndex() {
    this.startIndex = this.currentPage * this.rowsPerPage - this.rowsPerPage;
  }
  @action setEndIndex() {
    this.endIndex = this.startIndex + this.rowsPerPage;
  }
  @action setSubmitDisabled(e) {
    this.submitDisabled = e;
  }
  @action setRenameSubmitDisabled(e) {
    this.renameSubmitDisabled = e;
  }
}
@inject("VehicleStore")
@inject("BrandStore")
@observer
class Brand extends React.Component {
  render() {
    return (
      <div>
        <div className="brand__list--header">
          <button
            className="brand__list--btn"
            type="button"
            onClick={() =>
              this.props.BrandStore.sortByBrand(this.props.VehicleStore.brand)
            }
          >
            Brand
          </button>
        </div>
        <table className="brand__list">
          <tb>
            {this.props.VehicleStore.brand
              .slice(
                this.props.BrandStore.startIndex,
                this.props.BrandStore.endIndex
              )
              .map((brand) => (
                <tr key={brand.id}>
                  <td className="vehicle__list--wrapper">
                    <li className="vehicle__column">{brand.name}</li>
                  </td>

                  <td className="vehicle__list--wrapper">
                    <button
                      className="vehicle__column--button"
                      value={brand.id}
                      onClick={(e) => {
                        this.props.BrandStore.setRenameId(
                          e.currentTarget.value
                        );
                        this.props.BrandStore.setShowRenameForm();
                        this.props.BrandStore.setPlaceholderBrand(
                          this.props.VehicleStore.brand
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
        <div className="pagination__wrapper--brand">
          <select
            onChange={(e) => {
              this.props.BrandStore.setRowsPerPage(e.target.value);
              this.props.BrandStore.setStartIndex();
              this.props.BrandStore.setEndIndex();
            }}
          >
            {this.props.BrandStore.pageCount.map((item) => (
              <option value={item.pages}>{item.pages}</option>
            ))}
          </select>
          <button
            onClick={() => {
              this.props.BrandStore.setPreviousPage();
              this.props.BrandStore.setStartIndex();
              this.props.BrandStore.setEndIndex();
            }}
            className={`prev ${
              this.props.BrandStore.currentPage === 1 ? "disabled" : ""
            }`}
          >
            ◀
          </button>
          <button
            onClick={() => {
              this.props.BrandStore.setNextPage();
              this.props.BrandStore.setStartIndex();
              this.props.BrandStore.setEndIndex();
            }}
            className={`next ${
              this.props.BrandStore.currentPage ===
              Math.ceil(
                this.props.VehicleStore.brand.length /
                  this.props.BrandStore.rowsPerPage
              )
                ? "disabled"
                : ""
            }`}
          >
            ▶
          </button>
        </div>
        {this.props.BrandStore.showRenameForm ? (
          <form
            className="rename__form--brand"
            onSubmit={(e) => {
              e.preventDefault();
              this.props.BrandStore.onRename(this.props.VehicleStore.brand);
              this.props.BrandStore.setRenameBrand("");
              this.props.BrandStore.setRenameSubmitDisabled(true);
              this.props.BrandStore.setShowRenameForm();
            }}
            value={this.props.BrandStore.showRenameForm}
          >
            <p>Input New Brand</p>
            <input
              className="rename__field--brand"
              type="text"
              value={this.props.BrandStore.renameBrand}
              onChange={(e) => {
                this.props.BrandStore.setRenameBrand(e.target.value);
                if (this.props.BrandStore.renameBrand !== "") {
                  this.props.BrandStore.setRenameSubmitDisabled(false);
                } else {
                  this.props.BrandStore.setRenameSubmitDisabled(true);
                }
              }}
            />
            <button
              className="rename__button--brand"
              type="submit"
              disabled={this.props.BrandStore.renameSubmitDisabled}
            >
              Rename Vehicle
            </button>
          </form>
        ) : null}
        <form
          className="vehicle__form--container"
          onSubmit={(e) => {
            this.props.VehicleStore.addBrand({
              name: this.props.BrandStore.vehicleBrand,
              id:
                Math.max.apply(
                  null,
                  this.props.VehicleStore.brand.map((obj) => obj.id)
                ) + 1
            });

            e.preventDefault();
            this.props.BrandStore.setVehicleBrand("");
            this.props.BrandStore.setSubmitDisabled(true);
          }}
        >
          <input
            className="brand__input"
            type="text"
            placeholder="Brand Name"
            value={this.props.BrandStore.vehicleBrand}
            onChange={(e) => {
              this.props.BrandStore.setVehicleBrand(e.currentTarget.value);
              if (this.props.BrandStore.vehicleBrand !== "") {
                this.props.BrandStore.setSubmitDisabled(false);
              } else {
                this.props.BrandStore.setSubmitDisabled(true);
              }
            }}
          />
          <button
            className="brand__btn--submit"
            type="submit"
            disabled={this.props.BrandStore.submitDisabled}
          >
            Add Vehicle
          </button>
        </form>
      </div>
    );
  }
}

export { Brand, BrandStore };
