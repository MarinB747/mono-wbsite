import React, { createContext } from "react";
import { useLocalStore } from "mobx-react";
import "./Components.css";
import VehicleList from "./VehicleList";
import VehicleForm from "./VehicleForm";
export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    vehicle: {
      vehicleBrand: [
        "BMW",
        "Volkswagen",
        "Audi",
        "Triumph",
        "Ford",
        "Rolls Royce",
        "Cadillac",
        "Mitsubishi",
        "Honda",
        "Ford",
      ],
      vehicleModel: [
        "X6",
        "Golf 4",
        "A5",
        "Tiger",
        "Lobo",
        "Ghost",
        "CTS",
        "Raider",
        "Fit",
        "Expedition",
      ],
      vehicleYear: [
        "2015",
        "2008",
        "2014",
        "2008",
        "2006",
        "2010",
        "2006",
        "2011",
        "2014",
        "2002",
      ],
    },

    addVehicleBrand: (vehicleBrand) => {
      store.vehicle.vehicleBrand.push(vehicleBrand);
    },
    addVehicleModel: (vehicleModel) => {
      store.vehicle.vehicleModel.push(vehicleModel);
    },
    addVehicleYear: (vehicleYear) => {
      store.vehicleYear.push(vehicleYear);
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default function VehicleStore() {
  return (
    <StoreProvider>
      <div className="vehicle__table">
        <VehicleList />
        <VehicleForm />
      </div>
    </StoreProvider>
  );
}
