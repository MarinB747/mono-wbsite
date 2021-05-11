import React from "react";
import { inject, observer } from "mobx-react";
import { Edit, Delete } from "@material-ui/icons";
import "../Pages.css";

@inject("PageStore")
@observer
class BrandPage extends React.Component {
  render() {
    return (
      <div className="brand__table">
        <select
          className="brand__dropdown--header"
          value={this.props.PageStore.BrandService.brand.id}
          onClick={e =>
            this.props.PageStore.BrandStore.filterByBrand(e.target.value)
          }
        >
          <option value={0}>All Brands</option>
          {this.props.PageStore.BrandService.brand.map(brand => (
            <option value={brand.id}>{brand.name}</option>
          ))}
        </select>
        <div className="brand__list--header">
          <button
            className="brand__list--btn"
            type="button"
            onClick={() =>
              this.props.PageStore.BrandStore.sortByBrand(
                this.props.PageStore.BrandService.brand
              )
            }
          >
            Brand
          </button>
        </div>
        <table className="brand__list">
          <tb>
            {this.props.PageStore.BrandService.brand
              .filter(this.props.PageStore.BrandStore.filterMethod)
              .slice(
                this.props.PageStore.BrandStore.startIndex,
                this.props.PageStore.BrandStore.endIndex
              )
              .map(brand => (
                <tr key={brand.id}>
                  <td className="vehicle__list--wrapper">
                    <li className="vehicle__column">{brand.name}</li>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <button
                      className="vehicle__column--button"
                      value={brand.id}
                      onClick={() => {
                        let x = this.props.PageStore.BrandService.onDelete(
                          brand.id,
                          this.props.PageStore.BrandService.brand,
                          this.props.PageStore.VehicleService.vehicle
                        );
                        this.props.PageStore.BrandService.brand = x;
                      }}
                    >
                      <Delete />
                    </button>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <button
                      className="vehicle__column--button"
                      value={brand.id}
                      onClick={e => {
                        this.props.PageStore.BrandStore.setRenameId(
                          e.currentTarget.value
                        );
                        this.props.PageStore.BrandStore.setShowRenameForm();
                        this.props.PageStore.BrandStore.setPlaceholderBrand(
                          this.props.PageStore.BrandService.brand
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
            onChange={e => {
              this.props.PageStore.BrandStore.setRowsPerPage(e.target.value);
              this.props.PageStore.BrandStore.setStartIndex();
              this.props.PageStore.BrandStore.setEndIndex();
            }}
          >
            {this.props.PageStore.BrandStore.pageCount.map(item => (
              <option value={item.pages}>{item.pages}</option>
            ))}
          </select>
          <button
            onClick={() => {
              this.props.PageStore.BrandStore.setPreviousPage();
              this.props.PageStore.BrandStore.setStartIndex();
              this.props.PageStore.BrandStore.setEndIndex();
            }}
            className={`prev ${
              this.props.PageStore.BrandStore.currentPage === 1
                ? "disabled"
                : ""
            }`}
          >
            ◀
          </button>
          <button
            onClick={() => {
              this.props.PageStore.BrandStore.setNextPage();
              this.props.PageStore.BrandStore.setStartIndex();
              this.props.PageStore.BrandStore.setEndIndex();
            }}
            className={`next ${
              this.props.PageStore.BrandStore.currentPage ===
              Math.ceil(
                this.props.PageStore.BrandService.brand.length /
                  this.props.PageStore.BrandStore.rowsPerPage
              )
                ? "disabled"
                : ""
            }`}
          >
            ▶
          </button>
        </div>
        {this.props.PageStore.BrandStore.showRenameForm ? (
          <form
            className="rename__form--brand"
            onSubmit={e => {
              e.preventDefault();
              this.props.PageStore.BrandStore.onRename(
                this.props.PageStore.BrandService.brand
              );
              this.props.PageStore.BrandStore.setRenameSubmitDisabled(true);
              this.props.PageStore.BrandStore.setShowRenameForm();
              this.props.PageStore.VehicleService.vehicle.forEach(obj => {
                const targetBrand = this.props.PageStore.BrandService.brand.find(
                  e => e.id === obj.brand_id
                );
                obj.brand = targetBrand.name;
              });
              this.props.PageStore.BrandStore.setRenameBrand("");
            }}
            value={this.props.PageStore.BrandStore.showRenameForm}
          >
            <p>Input New Brand</p>
            <input
              className="rename__field--brand"
              type="text"
              value={this.props.PageStore.BrandStore.renameBrand}
              onChange={e => {
                this.props.PageStore.BrandStore.setRenameBrand(e.target.value);
                if (this.props.PageStore.BrandStore.renameBrand !== "") {
                  this.props.PageStore.BrandStore.setRenameSubmitDisabled(
                    false
                  );
                } else {
                  this.props.PageStore.BrandStore.setRenameSubmitDisabled(true);
                }
              }}
            />
            <button
              className="rename__button--brand"
              type="submit"
              disabled={this.props.PageStore.BrandStore.renameSubmitDisabled}
            >
              Rename Vehicle
            </button>
          </form>
        ) : null}
        <form
          className="vehicle__form--container"
          onSubmit={e => {
            this.props.PageStore.BrandService.addBrand({
              name: this.props.PageStore.BrandStore.vehicleBrand,
              id:
                Math.max.apply(
                  null,
                  this.props.PageStore.BrandService.brand.map(obj => obj.id)
                ) + 1
            });

            e.preventDefault();
            this.props.PageStore.BrandStore.setVehicleBrand("");
            this.props.PageStore.BrandStore.setSubmitDisabled(true);
            console.log(this.props.PageStore.BrandService.brand);
          }}
        >
          <input
            className="brand__input"
            type="text"
            placeholder="Brand Name"
            value={this.props.PageStore.BrandStore.vehicleBrand}
            onChange={e => {
              this.props.PageStore.BrandStore.setVehicleBrand(
                e.currentTarget.value
              );
              if (this.props.PageStore.BrandStore.vehicleBrand !== "") {
                this.props.PageStore.BrandStore.setSubmitDisabled(false);
              } else {
                this.props.PageStore.BrandStore.setSubmitDisabled(true);
              }
            }}
          />
          <button
            className="brand__btn--submit"
            type="submit"
            disabled={this.props.PageStore.BrandStore.submitDisabled}
          >
            Add Brand
          </button>
        </form>
        {/*         {this.props.PageStore.getBrandId()}
         */}{" "}
      </div>
    );
  }
}

export { BrandPage };
