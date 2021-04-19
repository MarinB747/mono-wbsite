import React, { useState, useContext } from "react";
import { StoreContext } from "./Context";
import "../Pages.css";
import BrandModal from "./VehicleFormStore/BrandModal";

export default function VehicleForm() {
  const store = useContext(StoreContext);
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  return (
    <form
      style={{ marginTop: 20 }}
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
