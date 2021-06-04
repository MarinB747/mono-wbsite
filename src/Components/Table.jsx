import React from "react";
import { Edit, Delete } from "@material-ui/icons";
import "./Components.css";

class Table extends React.Component {
  render() {
    return (
      <>
        <table className={this.props.tableStyle}>
          <tb>
            {this.props.getData(data => (
              <tr key={data.id}>
                <td className="table__list--wrapper">
                  <li className="table__column">{data.name || data.brand}</li>
                </td>
                {data.model ? (
                  <td className="table__list--wrapper">
                    <li className="table__column">{data.model}</li>
                  </td>
                ) : null}
                {data.year ? (
                  <td className="table__list--wrapper">
                    <li className="table__column">{data.year}</li>
                  </td>
                ) : null}
                <td className="table__list--wrapper">
                  <button
                    className="table__column--button"
                    value={data.id}
                    onClick={() => {
                      this.props.deleteFn(data.id);
                    }}
                  >
                    <Delete />
                  </button>
                </td>
                <td className="table__list--wrapper">
                  <button
                    className="table__column--button"
                    value={data.id}
                    onClick={() => {
                      this.props.renameFn(data.id);
                    }}
                  >
                    <Edit />
                  </button>
                </td>
              </tr>
            ))}
          </tb>
        </table>
        <div className={this.props.paginationWrapperStyle}>
          <select
            onChange={e => {
              this.props.pagingFn(e.target.value);
            }}
          >
            {this.props.pages.map(item => (
              <option value={item.pages}>{item.pages}</option>
            ))}
          </select>
          <button
            onClick={e => {
              this.props.prevPageFn(e.target.value);
            }}
            className={`prev ${this.props.thisPage === 1 ? "disabled" : ""}`}
          >
            ◀
          </button>
          <button
            onClick={e => {
              this.props.nextPageFn(e.target.value);
            }}
            className={`next ${
              this.props.thisPage === this.props.lastPage ? "disabled" : ""
            }`}
          >
            ▶
          </button>
        </div>
        {this.props.renameForm ? (
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
        ) : null}
      </>
    );
  }
}

export { Table };
