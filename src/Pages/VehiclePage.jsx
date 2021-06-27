import React from "react";
import { inject, observer } from "mobx-react";
import { Table } from "../Components/Table";
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
        <Table
          getData={this.props.VehicleStore.getVehicles}
          deleteFn={this.props.VehicleStore.onDelete}
          renameFn={this.props.VehicleStore.renameFormMethod}
          pagingFn={this.props.VehicleStore.pagingMethod}
          pages={this.props.VehicleStore.pageCount}
          thisPage={this.props.VehicleStore.currentPage}
          lastPage={this.props.VehicleStore.vehicleLastPage}
          prevPageFn={this.props.VehicleStore.previousPageMethod}
          nextPageFn={this.props.VehicleStore.nextPageMethod}
          renameMethod={this.props.VehicleStore.onRenameMethod}
          renameForm={this.props.VehicleStore.showRenameForm}
          firstSelectValue={this.props.VehicleStore.renameVehicleBrand}
          firstSelectMethod={this.props.VehicleStore.setRenameVehicleBrand}
          selectRenameData={this.props.VehicleStore.getBrands}
          firstRenameValue={this.props.VehicleStore.renameVehicleModel}
          firstRenameMethod={this.props.VehicleStore.renameVehicleModelMethod}
          secondRenameValue={this.props.VehicleStore.renameVehicleYear}
          secondRenameMethod={this.props.VehicleStore.renameVehicleYearMethod}
          renameSubmit={this.props.VehicleStore.renameSubmitDisabled}
          dataName="Vehicle"
          secondRenameInput="Year"
          firstRenameInput="Model"
          firstRenameSelect="Brand"
          tableStyle="vehicle__list"
          paginationWrapperStyle="pagination__wrapper--vehicle"
          showModal={this.props.VehicleStore.showModal}
          hideModalMethod={this.props.VehicleStore.setShowModal}
          showModalMethod={this.props.VehicleStore.showModalMethod}
        />

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
                <option value={brand.id}>{brand.name}</option>
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
