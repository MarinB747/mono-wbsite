import React, { createContext } from "react";
import { useLocalStore, useObserver } from "mobx-react";
import { observable } from "mobx";
import "./Pages.css";
import VehicleList from "./VehicleList";
import VehicleForm from "./VehicleForm";
export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() =>
    observable({
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
        {
          id: 9,
          brand: "Volkswagen",
          brand_slug: "volkswagen",
          model: "Golf 4",
          year: "2001",
        },
        {
          id: 10,
          brand: "Volkswagen",
          brand_slug: "volkswagen",
          model: "Beetle",
          year: "1997",
        },
        {
          id: 11,
          brand: "Volkswagen",
          brand_slug: "volkswagen",
          model: "Polo",
          year: "1985",
        },
        {
          id: 12,
          brand: "Ford",
          brand_slug: "ford",
          model: "Focus",
          year: "2006",
        },
        {
          id: 13,
          brand: "Ford",
          brand_slug: "ford",
          model: "Puma",
          year: "2019",
        },
        {
          id: 14,
          brand: "Ford",
          brand_slug: "ford",
          model: "Kuga",
          year: "2008",
        },
      ],
      addBrand: (e) => {
        store.brand.push(e);
      },
      addVehicle: (e) => {
        store.vehicle.push(e);
      },
      filterBrand: (e) => {
        store.vehicle.filter((obj) => obj.brand_slug === e);
      },
    })
  );

  return useObserver(() => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  ));
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
