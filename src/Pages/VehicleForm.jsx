import React, { useState, useContext } from "react";
import { StoreContext } from "./VehicleListPage";
import "./Pages.css";
import BrandModal from "./modal/BrandModal";

export default function VehicleForm() {
  const store = useContext(StoreContext);
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [modalShow, setModalShow] = useState(false);
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
        <select
          className="vehicle__dropdown"
          onClick={(e) => setVehicleBrand(e.target.value)}
        >
          {store.brand.map((brand) => (
            <option value={brand.name}>{brand.name}</option>
          ))}
        </select>
        <input
          className="vehicle__input"
          type="text"
          placeholder="Vehicle Model"
          value={vehicleModel}
          onChange={(e) => {
            setVehicleModel(e.target.value);
            if (vehicleModel && vehicleYear !== "") {
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
            if (vehicleModel && vehicleYear !== "") {
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
        onClick={() => setModalShow(true)}
      >
        Add Brand
      </button>
      <button className="vehicle__btn--submit" type="button">
        Delete Vehicle
      </button>
      <button className="vehicle__btn--submit" type="button" onClick={onRename}>
        Rename Vehicle
      </button>
      <BrandModal
        autoFocus={true}
        aria-labelledby="contained-modal-title-vcenter"
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSubmit={() => setModalShow(false)}
      />
    </form>
  );
}
