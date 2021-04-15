import React, { useState, useContext } from "react";
import { StoreContext } from "./VehicleListPage";
import "./Pages.css";

export default function VehicleForm() {
  const store = useContext(StoreContext);
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const onRename = () => {
    const getId = prompt("Which vehicle to change, use id");
    const byId = parseInt(getId);
    const newBrand = prompt("Brand");
    const newModel = prompt("Model");
    const newYear = prompt("Year");
    const objRename = store.vehicle.findIndex((obj) => obj.id === byId);
    store.vehicle[objRename].brand = newBrand;
    store.vehicle[objRename].brand_slug = newBrand.toLowerCase();
    store.vehicle[objRename].model = newModel;
    store.vehicle[objRename].year = newYear;
  };
  const onDelete = () => {
    const id = prompt("Delete by id", "");
    store.vehicle.splice(id - 1, 1);
  };
  const pushBrand = () => {
    store.addBrand({
      name: vehicleBrand,
      slug: vehicleBrand.toLowerCase(),
      id:
        Math.max.apply(
          null,
          store.vehicle.map((obj) => obj.id)
        ) + 1,
    });
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
        type="submit"
        disabled={submitDisabled}
      >
        Add Vehicle
      </button>
      <button
        className="vehicle__btn--submit"
        type="button"
        onClick={pushBrand}
        disabled={submitDisabled}
      >
        Add Brand
      </button>
      <button className="vehicle__btn--submit" type="button" onClick={onDelete}>
        Delete Vehicle
      </button>
      <button className="vehicle__btn--submit" type="button" onClick={onRename}>
        Rename Vehicle
      </button>
    </form>
  );
}
