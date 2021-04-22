import React, { createContext } from "react";
import { useLocalStore, useObserver } from "mobx-react";
import { observable } from "mobx";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() =>
    observable({
      brand: [
        {
          id: 1,
          slug: "bmw",
          name: "BMW"
        },
        {
          id: 2,
          slug: "audi",
          name: "Audi"
        },
        {
          id: 3,
          slug: "volkswagen",
          name: "Volkswagen"
        },
        {
          id: 4,
          slug: "ford",
          name: "Ford"
        }
      ],

      vehicle: [
        {
          id: 1,
          brand: "BMW",
          model: "X3",
          year: "2011"
        },
        {
          id: 2,
          brand: "BMW",
          model: "X6",
          year: "2017"
        },
        {
          id: 3,
          brand: "BMW",
          model: "Z3",
          year: "2004"
        },
        {
          id: 4,
          brand: "BMW",
          model: "I3",
          year: "2013"
        },
        {
          id: 5,
          brand: "Audi",
          model: "Q5",
          year: "2008"
        },
        {
          id: 6,
          brand: "Audi",
          model: "R8",
          year: "2010"
        },
        {
          id: 7,
          brand: "Audi",
          model: "TT Roadster",
          year: "2003"
        },
        {
          id: 8,
          brand: "Audi",
          model: "A6",
          year: "2011"
        },
        {
          id: 9,
          brand: "Volkswagen",
          model: "Golf 4",
          year: "2001"
        },
        {
          id: 10,
          brand: "Volkswagen",
          model: "Beetle",
          year: "1997"
        },
        {
          id: 11,
          brand: "Volkswagen",
          model: "Polo",
          year: "1985"
        },
        {
          id: 12,
          brand: "Ford",
          model: "Focus",
          year: "2006"
        },
        {
          id: 13,
          brand: "Ford",
          model: "Puma",
          year: "2019"
        },
        {
          id: 14,
          brand: "Ford",
          model: "Kuga",
          year: "2008"
        }
      ],
      getSlug: () => {
        store.vehicle.forEach((obj) => {
          const targetBrand = store.brand.find((e) => e.name === obj.brand);
          obj.brand_slug = targetBrand.slug;
        });
      },
      addBrand: (e) => {
        store.brand.push(e);
      },
      addVehicle: (e) => {
        store.vehicle.push(e);
      }
    })
  );

  return useObserver(() => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  ));
};

export { StoreContext, StoreProvider };
