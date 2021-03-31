import React, { useState, useContext } from "react";
import { useObserver } from "mobx-react";
import { StoreContext } from "./VehicleStore";
import "./Utilities.css";

export default function VehicleList() {
  const store = useContext(StoreContext);
  return useObserver(() => (
    <ul className="vehicle__list">
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
    </ul>
  ));
}
