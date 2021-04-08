import React, { useState, useContext } from "react";
import { StoreContext } from "./VehicleStore";
import "./Components.css";

export default function VehicleForm() {
  const store = useContext(StoreContext);
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);

  return (
    <form
      onSubmit={(e) => {
        store.addVehicleBrand(vehicleBrand);
        store.addVehicleModel(vehicleModel);
        store.addVehicleYear(vehicleYear);
        setVehicleBrand("");
        setVehicleModel("");
        setVehicleYear("");
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
        type="submit"
        disabled={submitDisabled}
      >
        Add Vehicle
      </button>
    </form>
  );
}
