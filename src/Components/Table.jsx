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
                      this.props.showModalMethod(data.id);
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
        {this.props.showModal ? (
          <div className="modal__container">
            Are you sure you want to delete {this.props.firstSelectValue}{" "}
            {this.props.firstRenameValue} {this.props.secondRenameValue} ?
            <div className="modal__btn--wrapper">
              <button
                onClick={() => {
                  this.props.deleteFn();
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  this.props.hideModalMethod();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export { Table };
