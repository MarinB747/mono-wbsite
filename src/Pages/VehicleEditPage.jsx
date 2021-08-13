import React from "react";
import "./Pages.css";
import { inject, observer } from "mobx-react";
import "./Pages.css";
import { VehicleEditStore } from "../Store/VehicleEditStore";
import { pageStore } from "../Store/PageStore";
@inject(() => ({
  VehicleEditStore: new VehicleEditStore(pageStore)
}))
@observer
class VehicleEditPage extends React.PureComponent {
  render() {
    return (
      <div className="page">
        <div className="brand__table">
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
                value={this.props.VehicleEditStore.renameBrand}
                onChange={e =>
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
