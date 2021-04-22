import React, { useContext } from "react";
import { StoreContext } from "../VehicleContext";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormContext } from "./FormContext";
import { useObserver } from "mobx-react-lite";

export default function BrandModal(props) {
  const store = useContext(StoreContext);
  const form = useContext(FormContext);
  /*   const [vehicleBrand, setVehicleBrand] = useState("");
   */
  const pushBrand = () => {
    store.addBrand({
      name: form.vehicleBrand,
      slug: form.vehicleBrand.toLowerCase(),
      id:
        Math.max.apply(
          null,
          store.vehicle.map((obj) => obj.id)
        ) + 1
    });
    form.setModalShow(false);
  };
  return useObserver(() => (
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
          value={form.vehicleBrand}
          onChange={(e) => form.setVehicleBrand(e.target.value)}
        />
        <button type="submit" onClick={pushBrand}>
          Add Brand
        </button>
      </Modal.Body>
    </Modal>
  ));
}
