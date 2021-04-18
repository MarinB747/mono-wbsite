import React, { useState, useContext } from "react";
import { StoreContext } from "../VehicleListPage";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BrandModal(props) {
  const store = useContext(StoreContext);
  const [vehicleBrand, setVehicleBrand] = useState("");

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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="error_header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Error</Modal.Title>
      </Modal.Header>
      <Modal.Body className="error_body">
        <p>What is new brand's name?</p>
        <input
          value={vehicleBrand}
          onChange={(e) => setVehicleBrand(e.target.value)}
        />
        <button type="submit" onClick={pushBrand}>
          {" "}
          Add Brand
        </button>
      </Modal.Body>
    </Modal>
  );
}
