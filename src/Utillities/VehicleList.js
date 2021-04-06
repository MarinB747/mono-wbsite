import React, { useState, useContext } from "react";
import { useObserver } from "mobx-react";
import { StoreContext } from "./VehicleStore";
import "./Utilities.css";

export default function VehicleList() {
  const store = useContext(StoreContext);
  const [sortedField, setSortedField] = useState(null);
  return useObserver(() => (
    <table className="vehicle__list">
      {/* <ul>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => setSortedField("vehicleBrand")}
            >
              Brand
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => setSortedField("vehicleModel")}
            >
              Model
            </button>
          </th>
          <th>
            <button type="button" onClick={() => setSortedField("vehicleYear")}>
              Year
            </button>
          </th>
        </tr>
     </ul>  */}
      <ul className="vehicle__list--wrapper">
        {store.vehicleBrand.map((vehicleBrand) => (
          <li className="vehicle__column" key={vehicleBrand}>
            {vehicleBrand}
          </li>
        ))}
      </ul>
      <ul className="vehicle__list--wrapper">
        {store.vehicleModel.map((vehicleModel) => (
          <li className="vehicle__column" key={vehicleModel}>
            {vehicleModel}
          </li>
        ))}
      </ul>
      <ul className="vehicle__list--wrapper">
        {store.vehicleYear.map((vehicleYear) => (
          <li className="vehicle__column" key={vehicleYear}>
            {vehicleYear}
          </li>
        ))}
      </ul>
    </table>
  ));
}
