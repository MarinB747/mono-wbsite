import React, { createContext } from "react";
import { useLocalStore } from "mobx-react";
import "./Utilities.css";
import VehicleList from "./VehicleList";
import VehicleForm from "./VehicleForm";
export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    vehicleBrand: ["BMW", "Volkswagen", "Audi"],
    vehicleModel: ["X6", "Golf 4", "A5"],
    vehicleYear: ["2015", "2008", "2014"],
    addVehicleBrand: (vehicleBrand) => {
      store.vehicleBrand.push(vehicleBrand);
    },
    addVehicleModel: (vehicleModel) => {
      store.vehicleModel.push(vehicleModel);
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
