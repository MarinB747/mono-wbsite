import React, { useContext } from "react";
import { useObserver } from "mobx-react";
import { StoreContext } from "./VehicleStore";

import "./Components.css";

export default function VehicleList(props) {
  const store = useContext(StoreContext);

  return useObserver(() => (
    <div>
      <ul className="vehicle__list--header">
        <button className="vehicle__list--btn" type="button">
          Brand
        </button>

        <button className="vehicle__list--btn" type="button">
          Model
        </button>

        <button className="vehicle__list--btn" type="button">
          Year
        </button>
      </ul>
      <table className="vehicle__list">
        <ul>
          <tr>
            <td className="vehicle__list--wrapper">
              {store.vehicle.vehicleBrand.map((vehicleBrand) => (
                <li className="vehicle__column" key={vehicleBrand}>
                  {vehicleBrand}
                </li>
              ))}
            </td>
            <td className="vehicle__list--wrapper">
              {store.vehicle.vehicleModel.map((vehicleModel) => (
                <li className="vehicle__column" key={vehicleModel}>
                  {vehicleModel}
                </li>
              ))}
            </td>
            <td className="vehicle__list--wrapper">
              {store.vehicle.vehicleYear.map((vehicleYear) => (
                <li className="vehicle__column" key={vehicleYear}>
                  {vehicleYear}
                </li>
              ))}
            </td>
          </tr>
        </ul>
      </table>
    </div>
  ));
}
