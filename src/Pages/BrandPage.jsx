import React from "react";
import { inject, observer } from "mobx-react";
import { Edit, Delete } from "@material-ui/icons";
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
        <table className="brand__list">
          <tb>
            {this.props.BrandStore.getBrands(brand => (
              <tr key={brand.id}>
                <td className="vehicle__list--wrapper">
                  <li className="vehicle__column">{brand.name}</li>
                </td>
                <td className="vehicle__list--wrapper">
                  <button
                    className="vehicle__column--button"
                    value={brand.id}
                    onClick={() => {
                      this.props.BrandStore.onDelete(brand.id);
                    }}
                  >
                    <Delete />
                  </button>
                </td>
                <td className="vehicle__list--wrapper">
                  <button
                    className="vehicle__column--button"
                    value={brand.id}
                    onClick={() => {
                      this.props.BrandStore.RenameButtonMethod(brand.id);
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
              this.props.BrandStore.pagingMethod(e.target.value);
            }}
          >
            {this.props.BrandStore.pageCount.map(item => (
              <option value={item.pages}>{item.pages}</option>
            ))}
          </select>
          <button
            onClick={() => {
              this.props.BrandStore.previousPageMethod();
            }}
            className={`prev ${
              this.props.BrandStore.currentPage === 1 ? "disabled" : ""
            }`}
          >
            ◀
          </button>
          <button
            onClick={() => {
              this.props.BrandStore.nextPageMethod();
            }}
            className={`next ${
              this.props.BrandStore.currentPage ===
              this.props.BrandStore.brandLastPage
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
            onSubmit={e => {
              e.preventDefault();
              this.props.BrandStore.renameMethod();
            }}
            value={this.props.BrandStore.showRenameForm}
          >
            <p>Input New Brand</p>
            <input
              className="rename__field--brand"
              type="text"
              value={this.props.BrandStore.renameBrand}
              onChange={e => {
                this.props.BrandStore.renameBrandMethod(e.target.value);
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
