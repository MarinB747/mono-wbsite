import React, { useContext } from "react";
import { StoreContext } from "./VehicleContext";
import { FormContext } from "./VehicleFormStore/FormContext";
import "../Pages.css";
import BrandModal from "./VehicleFormStore/BrandModal";
import { useObserver } from "mobx-react-lite";

export default function VehicleForm() {
  const store = useContext(StoreContext);
  const form = useContext(FormContext);

  return useObserver(() => (
    <form
      style={{ marginTop: 20 }}
      onSubmit={(e) => {
        store.addVehicle({
          brand: form.vehicleBrand,
          brand_slug: form.vehicleBrand.toLowerCase(),
          model: form.vehicleModel,
          year: form.vehicleYear,
          id:
            Math.max.apply(
              null,
              store.vehicle.map((obj) => obj.id)
            ) + 1
        });
        form.setVehicleModel("");
        form.setVehicleYear("");
        e.preventDefault();
      }}
    >
      <div>
        <select
          className="vehicle__dropdown"
          onClick={(e) => form.setVehicleBrand(e.target.value)}
        >
          {store.brand.map((brand) => (
            <option value={brand.name}>{brand.name}</option>
          ))}
        </select>
        <input
          className="vehicle__input"
          type="text"
          placeholder="Vehicle Model"
          value={form.vehicleModel}
          onChange={(e) => {
            form.setVehicleModel(e.target.value);
            if (form.vehicleModel && form.vehicleYear !== "") {
              form.setSubmitDisabled(false);
            } else {
              form.setSubmitDisabled(true);
            }
          }}
        />
        <input
          className="vehicle__input"
          type="text"
          placeholder="Vehicle Year "
          value={form.vehicleYear}
          onChange={(e) => {
            if (e.target.value.match("^[0-9]{1,4}$") != null) {
              form.setVehicleYear(e.target.value);
            }
            if (form.vehicleModel && form.vehicleYear !== "") {
              form.setSubmitDisabled(false);
            } else {
              form.setSubmitDisabled(true);
            }
          }}
        />
      </div>

      <button
        className="vehicle__btn--submit"
        type="submit"
        disabled={form.submitDisabled}
      >
        Add Vehicle
      </button>
      <button
        className="vehicle__btn--submit"
        type="button"
        onClick={() => form.setModalShow(true)}
      >
        Add Brand
      </button>

      <BrandModal
        autoFocus={true}
        aria-labelledby="contained-modal-title-vcenter"
        show={form.modalShow}
        onHide={() => form.setModalShow(false)}
        onSubmit={() => form.setModalShow(false)}
      />
    </form>
  ));
}
