import React, { useState, useContext } from "react";
import { StoreContext } from "./VehicleListPage";
import "./Pages.css";

export default function VehicleForm() {
  const store = useContext(StoreContext);
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const onDelete = () => {
    const id = prompt("Delete by id", "");
    store.vehicle.splice(id - 1, 1);
  };

  return (
    <form
      onSubmit={(e) => {
        store.addVehicle({
          brand: vehicleBrand,
          brand_slug: vehicleBrand.toLowerCase(),
          model: vehicleModel,
          year: vehicleYear,
          id:
            Math.max.apply(
              null,
              store.vehicle.map((obj) => obj.id)
            ) + 1,
        });

        e.preventDefault();
      }}
    >
      <div>
        <input
          className="vehicle__input"
          placeholder="Vehicle Brand"
          type="text"
          value={vehicleBrand}
          onChange={(e) => {
            if (e.target.value.match("^[a-zA-Z ]*$") != null) {
              setVehicleBrand(e.target.value);
            }
            if (vehicleBrand && vehicleModel && vehicleYear !== "") {
              setSubmitDisabled(false);
            } else {
              setSubmitDisabled(true);
            }
          }}
        />
        <input
          className="vehicle__input"
          type="text"
          placeholder="Vehicle Model"
          value={vehicleModel}
          onChange={(e) => {
            setVehicleModel(e.target.value);
            if (vehicleBrand && vehicleModel && vehicleYear !== "") {
              setSubmitDisabled(false);
            } else {
              setSubmitDisabled(true);
            }
          }}
        />
        <input
          className="vehicle__input"
          type="text"
          placeholder="Vehicle Year "
          value={vehicleYear}
          onChange={(e) => {
            if (e.target.value.match("^[0-9]{1,4}$") != null) {
              setVehicleYear(e.target.value);
            }
            if (vehicleBrand && vehicleModel && vehicleYear !== "") {
              setSubmitDisabled(false);
            } else {
              setSubmitDisabled(true);
            }
          }}
        />
      </div>
      <button
        className="vehicle__btn--submit"
        type="button"
        disabled={submitDisabled}
      >
        Add Brand
      </button>
      <button
        className="vehicle__btn--submit"
        type="submit"
        disabled={submitDisabled}
      >
        Add Vehicle
      </button>
      <button className="vehicle__btn--submit" type="button" onClick={onDelete}>
        Delete Vehicle
      </button>
    </form>
  );
}
