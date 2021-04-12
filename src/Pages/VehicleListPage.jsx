import React, { createContext } from "react";
import { useLocalStore } from "mobx-react";
import "./Pages.css";
import VehicleList from "./VehicleList";
import VehicleForm from "./VehicleForm";
export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    brand: [
      {
        id: 1,
        slug: "bmw",
        name: "BMW",
      },
      {
        id: 2,
        slug: "audi",
        name: "Audi",
      },
      {
        id: 3,
        slug: "volkswagen",
        name: "Volkswagen",
      },
      {
        id: 4,
        slug: "ford",
        name: "Ford",
      },
    ],

    vehicle: [
      {
        id: 1,
        brand: "BMW",
        brand_slug: "bmw",
        model: "X3",
        year: "2011",
      },
      {
        id: 2,
        brand: "BMW",
        brand_slug: "bmw",
        model: "X6",
        year: "2017",
      },
      {
        id: 3,
        brand: "BMW",
        brand_slug: "bmw",
        model: "Z3",
        year: "2004",
      },
      {
        id: 4,
        brand: "BMW",
        brand_slug: "bmw",
        model: "I3",
        year: "2013",
      },
      {
        id: 5,
        brand: "Audi",
        brand_slug: "audi",
        model: "Q5",
        year: "2008",
      },
      {
        id: 6,
        brand: "Audi",
        brand_slug: "audi",
        model: "R8",
        year: "2010",
      },
      {
        id: 7,
        brand: "Audi",
        brand_slug: "audi",
        model: "TT Roadster",
        year: "2003",
      },
      {
        id: 8,
        brand: "Audi",
        brand_slug: "audi",
        model: "A6",
        year: "2011",
      },
    ],
    addBrand: (e) => {
      store.brand.push(e);
    },
    addVehicle: (e) => {
      store.vehicle.push(e);
    },
    renameVehicle: (e) => {
      store.vehicle.push(e);
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default function VehicleListPage() {
  return (
    <StoreProvider>
      <div className="vehicle__table">
        <VehicleList />
        <VehicleForm />
      </div>
    </StoreProvider>
  );
}
