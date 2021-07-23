import React from "react";
import "./Pages.css";
import { inject } from "mobx-react";
import "./Pages.css";
@inject("PageStore")
class VehicleEditPage extends React.PureComponent {
  componentDidMount = () => {
    this.props.PageStore.BrandStore.getBrandList();
    this.props.PageStore.VehicleStore.getBrandList();
  };
  render() {
    return (
      <div className="page">
        <form
          className="rename__form"
          onSubmit={e => {
            e.preventDefault();
            this.props.renameMethod();
          }}
          value={this.props.renameForm}
        >
          {this.props.firstRenameSelect ? (
            <>
              <p>Input New {this.props.firstRenameSelect}</p>
              <select
                className="rename__field"
                defaultValue={this.props.firstSelectValue}
                onClick={e => this.props.firstSelectMethod(e.target.value)}
              >
                {this.props.selectRenameData(data => (
                  <option value={data.id}>{data.name}</option>
                ))}
              </select>
            </>
          ) : null}
          <p>Input New {this.props.firstRenameInput}</p>
          <input
            className="rename__field"
            type="text"
            value={this.props.firstRenameValue}
            onChange={e => {
              this.props.firstRenameMethod(e.target.value);
            }}
          />
          {this.props.secondRenameInput ? (
            <>
              <p>Input {this.props.secondRenameInput}</p>
              <input
                className="rename__field"
                type="text"
                value={this.props.secondRenameValue}
                onChange={e => {
                  this.props.secondRenameMethod(e.target.value);
                }}
              />
            </>
          ) : null}
          <button
            className="rename__button"
            type="submit"
            disabled={this.props.renameSubmit}
          >
            Rename {this.props.dataName}
          </button>
        </form>
      </div>
    );
  }
}

export { VehicleEditPage };
