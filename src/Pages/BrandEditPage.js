import React from "react";
import "./Pages.css";
import { inject, observer } from "mobx-react";
import "./Pages.css";
@inject("BrandEditStore")
@observer
class BrandEditPage extends React.PureComponent {
  render() {
    return (
      <div className="brand__table">
        {
          (this.props.BrandEditStore.getBrand(),
          this.props.BrandEditStore.getId())
        }
        <form
          className="rename__form"
          onSubmit={e => {
            e.preventDefault();
            this.props.BrandEditStore.renameMethod();
          }}
          value={this.props.renameForm}
        >
          <>
            <p>New Brand</p>
            <input
              className="rename__field"
              type="text"
              placeholder={this.props.BrandEditStore.placeholderBrand}
              value={this.props.BrandEditStore.renameBrand}
              onChange={e => {
                this.props.BrandEditStore.renameBrandMethod(e.target.value);
              }}
            />
          </>
          <button
            className="rename__button"
            type="submit"
            disabled={this.props.BrandEditStore.renameSubmitDisabled}
          >
            Rename Brand
          </button>
        </form>
      </div>
    );
  }
}

export { BrandEditPage };
