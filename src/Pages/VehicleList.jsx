import React, { useContext } from "react";
import { useObserver } from "mobx-react";
import { StoreContext } from "./VehicleListPage";
import "./Pages.css";
export default function VehicleList(props) {
  const store = useContext(StoreContext);

  function filterBrand() {
    store.vehicle.filter((obj) => obj.brand_slug === store.vehicle.brand_slug);
  }

  function sortById() {
    store.vehicle.sort((b, a) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
  }

  function sortByBrand() {
    store.vehicle.sort((b, a) =>
      a.brand < b.brand ? 1 : a.brand > b.brand ? -1 : 0
    );
  }
  function sortByModel() {
    store.vehicle.sort((b, a) =>
      a.model < b.model ? 1 : a.model > b.model ? -1 : 0
    );
  }
  function sortByYear() {
    store.vehicle.sort((b, a) =>
      a.year < b.year ? 1 : a.year > b.year ? -1 : 0
    );
  }
  return useObserver(() => (
    <div>
      <select className="vehicle__dropdown" onChange={() => filterBrand()}>
        {store.brand.map((brand) => (
          <option value={brand.slug}>{brand.name}</option>
        ))}
      </select>
      <div className="vehicle__list--header">
        <button
          className="vehicle__list--btn"
          type="button"
          onClick={() => sortById(store.vehicle)}
        >
          #
        </button>
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
          {store.vehicle.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="vehicle__list--wrapper">
                <li className="vehicle__column">{vehicle.id}</li>
              </td>
              <td className="vehicle__list--wrapper">
                <li className="vehicle__column">{vehicle.brand}</li>
              </td>
              <td className="vehicle__list--wrapper">
                <li className="vehicle__column">{vehicle.model}</li>
              </td>
              <td className="vehicle__list--wrapper">
                <li className="vehicle__column">{vehicle.year}</li>
              </td>
            </tr>
          ))}
        </tb>
      </table>
    </div>
  ));
}
