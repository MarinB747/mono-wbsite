import React, { useContext } from "react";
import { useObserver } from "mobx-react";
import { StoreContext } from "./VehicleContext";
import { ListContext } from "./VehicleListStore/ListContext";
import "../Pages.css";
import {
  sortByBrand,
  sortByModel,
  sortByYear
} from "./VehicleListStore/SortingFunctions";
import { onDelete } from "./VehicleListStore/DeleteFunction";
import { onRename } from "./VehicleListStore/RenameFunctions";
import { Edit, Delete } from "@material-ui/icons";
export default function VehicleList(props) {
  const store = useContext(StoreContext);
  const list = useContext(ListContext);
  return useObserver(() => {
    let pagesNumber = Math.ceil(store.vehicle.length / list.rowsPerPage);
    let startIndex = list.currentPage * list.rowsPerPage - list.rowsPerPage;
    let endIndex = startIndex + list.rowsPerPage;
    return (
      <div>
        <select
          className="vehicle__dropdown"
          onClick={(e) => list.filterByBrand(e.target.value)}
        >
          <option value={""}>All Brands</option>
          {store.brand.map((brand) => (
            <option value={brand.slug}>{brand.name}</option>
          ))}
        </select>
        <div className="vehicle__list--header">
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() => sortByBrand(store.vehicle)}
          >
            Brand
          </button>
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() => sortByModel(store.vehicle)}
          >
            Model
          </button>
          <button
            className="vehicle__list--btn"
            type="button"
            onClick={() => sortByYear(store.vehicle)}
          >
            Year{endIndex}
            {startIndex}
          </button>
        </div>
        <table className="vehicle__list">
          <tb>
            {store.vehicle
              .filter((item) => {
                if (list.filterBrand !== "") {
                  return item.brand_slug === list.filterBrand;
                } else {
                  return true;
                }
              })
              .slice(startIndex, endIndex)
              .map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="vehicle__list--wrapper">
                    <li className="vehicle__column">{vehicle.brand}</li>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <li className="vehicle__column">{vehicle.model}</li>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <li className="vehicle__column">{vehicle.year}</li>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <button
                      className="vehicle__column--button"
                      value={vehicle.id}
                      onClick={() => onDelete(vehicle.id, store.vehicle)}
                    >
                      <Delete />
                    </button>
                  </td>
                  <td className="vehicle__list--wrapper">
                    <button
                      className="vehicle__column--button"
                      value={vehicle.id}
                      onClick={() => {
                        list.setShowRenameForm();
                        list.getId(vehicle.id, list.setRenameId);
                      }}
                    >
                      <Edit />
                    </button>
                  </td>
                </tr>
              ))}
            {store.getSlug()}
          </tb>
        </table>
        <div className="pagination__wrapper">
          <select
            onChange={(e) => {
              list.setRowsPerPage(e.target.value);
            }}
          >
            {list.pageCount.map((item) => (
              <option value={item.pages}>{item.pages}</option>
            ))}
          </select>
          <button
            onClick={() => list.setPreviousPage()}
            className={`prev ${list.currentPage === 1 ? "disabled" : ""}`}
          >
            ◀
          </button>
          <button
            onClick={() => list.setNextPage()}
            className={`next ${
              list.currentPage === pagesNumber ? "disabled" : ""
            }`}
          >
            ▶
          </button>
        </div>
        {list.showRenameForm ? (
          <form
            className="rename__form"
            onSubmit={() =>
              onRename(
                store.vehicle,
                list.renameId,
                list.newBrand,
                list.newModel,
                list.newYear
              )
            }
            value={list.showRenameForm}
          >
            <p>Input New Brand</p>
            <select
              className="rename__dropdown"
              onClick={(e) => list.setNewBrand(e.target.value)}
            >
              {store.brand.map((brand) => (
                <option value={brand.name}>{brand.name}</option>
              ))}
            </select>
            <p>Input New Model</p>
            <input
              className="rename__fields"
              type="text"
              placeholder="Vehicle Model"
              value={list.newModel}
              onChange={(e) => list.setNewModel(e.target.value)}
            />
            <p>Input New Year</p>
            <input
              className="rename__fields"
              type="text"
              placeholder="Vehicle Year "
              value={list.newYear}
              onChange={(e) => list.setNewYear(e.target.value)}
            />
            <button
              className="rename__button"
              type="submit"
              onClick={() => {
                onRename(
                  store.vehicle,
                  list.renameId,
                  list.newBrand,
                  list.newModel,
                  list.newYear
                );
                list.setShowRenameForm();
              }}
            >
              Rename Vehicle
            </button>
          </form>
        ) : null}
      </div>
    );
  });
}
