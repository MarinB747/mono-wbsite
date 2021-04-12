import React, { useContext } from "react";
import { useObserver } from "mobx-react";
import { StoreContext } from "./VehicleListPage";
import "./Pages.css";
export default function VehicleList(props) {
  const store = useContext(StoreContext);
  const onRename = (e) => {
    store.vehicle.target.value =
      prompt("New name", store.vehicle.target.value) ||
      store.vehicle.target.value;
  };

  return useObserver(() => (
    <div>
      <select className="vehicle__dropdown">
        {store.brand.map((brand) => (
          <option value={brand.slug}>{brand.name}</option>
        ))}
      </select>
      <div className="vehicle__list--header">
        <button className="vehicle__list--btn" type="button">
          #
        </button>
        <button className="vehicle__list--btn" type="button">
          Brand
        </button>
        <button className="vehicle__list--btn" type="button">
          Model
        </button>
        <button className="vehicle__list--btn" type="button">
          Year
        </button>
      </div>
      <table className="vehicle__list">
        <tb>
          {store.vehicle.map((item) => (
            <tr key={item.id}>
              <td className="vehicle__list--wrapper">
                <li className="vehicle__column">{item.id}</li>
              </td>
              <td className="vehicle__list--wrapper">
                <li className="vehicle__column" onDoubleClick={onRename}>
                  {item.brand}
                </li>
              </td>
              <td className="vehicle__list--wrapper">
                <li className="vehicle__column" onDoubleClick={onRename}>
                  {item.model}
                </li>
              </td>
              <td className="vehicle__list--wrapper">
                <li className="vehicle__column" onDoubleClick={onRename}>
                  {item.year}
                </li>
              </td>
            </tr>
          ))}
        </tb>
      </table>
    </div>
  ));
}
