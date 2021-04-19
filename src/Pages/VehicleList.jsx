import React, { useContext, useState } from "react";
import { useObserver } from "mobx-react";
import { StoreContext } from "./VehicleListPage";
import "./Pages.css";
import {
  sortByBrand,
  sortByModel,
  sortByYear,
} from "./VehicleListStore/SortingFunctions";
import {
  nextPage,
  previousPage,
  largerPage,
} from "./VehicleListStore/PagingFunctions";
import { onDelete } from "./VehicleListStore/DeleteFunction";
import { filterByBrand } from "./VehicleListStore/FilterFunction";
import { getId, onRename } from "./VehicleListStore/RenameFunctions";
export default function VehicleList(props) {
  const store = useContext(StoreContext);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBrand, setFilterBrand] = useState("");
  const pages = useState(Math.round(store.vehicle.length / rowsPerPage));
  const startIndex = currentPage * rowsPerPage - rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageCount = [{ pages: 5 }, { pages: 10 }, { pages: 20 }];
  const [newBrand, setNewBrand] = useState();
  const [newModel, setNewModel] = useState();
  const [newYear, setNewYear] = useState();
  const [showRenameForm, setShowRenameForm] = useState(false);
  const [renameId, setRenameId] = useState();

  return useObserver(() => (
    <div>
      <select
        className="vehicle__dropdown"
        onClick={(e) => filterByBrand(e, setFilterBrand)}
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
          Year
        </button>
      </div>
      <table className="vehicle__list">
        <tb>
          {store.vehicle
            .filter((item) => {
              if (filterBrand !== "") {
                return item.brand_slug === filterBrand;
              } else {
                return true;
              }
            })
            .slice(startIndex, endIndex)
            .map((vehicle) => (
              <tr>
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
                    Delete
                  </button>
                </td>
                <td className="vehicle__list--wrapper">
                  <button
                    className="vehicle__column--button"
                    value={vehicle.id}
                    onClick={() => {
                      setShowRenameForm(true);
                      getId(vehicle.id, setRenameId);
                    }}
                  >
                    Rename
                  </button>
                </td>
              </tr>
            ))}
        </tb>
      </table>
      <div className="pagination__wrapper">
        <select onClick={(e) => largerPage(e, setRowsPerPage)}>
          {pageCount.map((item) => (
            <option value={item.pages}>{item.pages}</option>
          ))}
        </select>
        <button
          onClick={() => previousPage(setCurrentPage)}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          ◀
        </button>
        <button
          onClick={() => nextPage(setCurrentPage)}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          ▶
        </button>
      </div>
      {showRenameForm ? (
        <form
          onSubmit={() =>
            onRename(store.vehicle, renameId, newBrand, newModel, newYear)
          }
          value={showRenameForm}
        >
          <p>Input New Brand</p>
          <select
            className="vehicle__dropdown"
            onClick={(e) => setNewBrand(e.target.value)}
          >
            {store.brand.map((brand) => (
              <option value={brand.name}>{brand.name}</option>
            ))}
          </select>
          <p>Input New Model</p>
          <input
            type="text"
            placeholder="Vehicle Model"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
          />
          <p>Input New Year</p>
          <input
            type="text"
            placeholder="Vehicle Year "
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
          />
          <button
            className="vehicle__btn--submit"
            type="submit"
            onClick={() => {
              onRename(store.vehicle, renameId, newBrand, newModel, newYear);
              setShowRenameForm(false);
            }}
          >
            Rename Vehicle
          </button>
        </form>
      ) : null}
    </div>
  ));
}
