import React from "react";
import "./Pages.css";
import { inject, observer } from "mobx-react";
import "./Pages.css";
@inject("VehicleEditStore")
@observer
class VehicleEditPage extends React.PureComponent {
  render() {
    return (
      <div className="page">
        <div className="brand__table">
          {
            (this.props.VehicleEditStore.getData(),
            this.props.VehicleEditStore.getId())
          }
          <form
            className="rename__form"
            onSubmit={e => {
              e.preventDefault();
              this.props.VehicleEditStore.renameMethod();
            }}
          >
            <>
              <p>Input New Brand</p>
              <select
                className="rename__field"
                defaultValue={this.props.VehicleEditStore.placeholderBrand}
                onClick={e =>
                  this.props.VehicleEditStore.setRenameBrand(e.target.value)
                }
              >
                {this.props.VehicleEditStore.brandList.map(data => (
                  <option value={data.id}>{data.name}</option>
                ))}
              </select>
            </>
            <p>Input New Model</p>
            <input
              className="rename__field"
              type="text"
              placeholder={this.props.VehicleEditStore.placeholderModel}
              value={this.props.VehicleEditStore.renameModel}
              onChange={e => {
                this.props.VehicleEditStore.renameModelMethod(e.target.value);
              }}
            />
            <>
              <p>Input Year</p>
              <input
                className="rename__field"
                type="text"
                placeholder={this.props.VehicleEditStore.placeholderYear}
                value={this.props.VehicleEditStore.renameYear}
                onChange={e => {
                  this.props.VehicleEditStore.renameYearMethod(e.target.value);
                }}
              />
            </>
            <button
              className="rename__button"
              type="submit"
              disabled={this.props.VehicleEditStore.renameSubmitDisabled}
            >
              Rename Vehicle
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export { VehicleEditPage };
