import React from "react";
import { inject, observer } from "mobx-react";
import { Table } from "../Components/Table";
import "./Pages.css";

@inject("BrandStore")
@observer
class BrandPage extends React.Component {
  render() {
    return (
      <div className="brand__table">
        <input
          className="brand__dropdown--header"
          value={this.props.BrandStore.filterBrand}
          placeholder="Search brands..."
          onChange={e => this.props.BrandStore.filterByBrand(e.target.value)}
        />
        <div className="brand__list--header">
          <button
            className="brand__list--btn"
            type="button"
            onClick={() => this.props.BrandStore.sortByBrand()}
          >
            Brand{this.props.BrandStore.sortBrand ? <text>▼</text> : null}
          </button>
        </div>
        <Table
          getData={this.props.BrandStore.getBrands}
          deleteFn={this.props.BrandStore.onDelete}
          renameFn={this.props.BrandStore.renameButtonMethod}
          pagingFn={this.props.BrandStore.pagingMethod}
          pages={this.props.BrandStore.pageCount}
          thisPage={this.props.BrandStore.currentPage}
          lastPage={this.props.BrandStore.brandLastPage}
          prevPageFn={this.props.BrandStore.previousPageMethod}
          nextPageFn={this.props.BrandStore.nextPageMethod}
          renameForm={this.props.BrandStore.showRenameForm}
          renameMethod={this.props.BrandStore.renameMethod}
          firstRenameValue={this.props.BrandStore.renameBrand}
          firstRenameMethod={this.props.BrandStore.renameBrandMethod}
          renameSubmit={this.props.BrandStore.renameSubmitDisabled}
          firstRenameInput="Brand"
          dataName="Brand"
          tableStyle="brand__list"
          paginationWrapperStyle="pagination__wrapper--brand"
          showModal={this.props.BrandStore.showModal}
          hideModalMethod={this.props.BrandStore.setShowModal}
          showModalMethod={this.props.BrandStore.showModalMethod}
        />

        <form
          className="vehicle__form--container"
          onSubmit={e => {
            e.preventDefault();
            this.props.BrandStore.addBrandMethod();
          }}
        >
          <input
            className="brand__input"
            type="text"
            placeholder="Brand Name"
            value={this.props.BrandStore.vehicleBrand}
            onChange={e => {
              this.props.BrandStore.addBrandSubmitMethod(e.target.value);
            }}
          />
          <button
            className="brand__btn--submit"
            type="submit"
            disabled={this.props.BrandStore.submitDisabled}
          >
            Add Brand
          </button>
        </form>
        {this.props.BrandStore.getParentId()}
      </div>
    );
  }
}

export { BrandPage };
