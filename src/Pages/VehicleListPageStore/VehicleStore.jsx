import React from "react";
import { observable, action, makeObservable } from "mobx";
import { observer } from "mobx-react";

class VehicleStore {
  constructor() {
    makeObservable(this);
  }
  @observable brand = [
    {
      id: 1,
      name: "BMW"
    },
    {
      id: 2,
      name: "Audi"
    },
    {
      id: 3,
      name: "Volkswagen"
    },
    {
      id: 4,
      name: "Ford"
    }
  ];
  @observable vehicle = [
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
  ];

  @action.bound
  addVehicle(e) {
    this.vehicle.push(e);
  }
  @action.bound
  addBrand(e) {
    this.brand.push(e);
  }

  @action.bound
  getBrandId() {
    this.vehicle.forEach((obj) => {
      const targetBrand = this.brand.find((e) => e.name === obj.brand);
      obj.brand_id = targetBrand.id;
    });
  }
}

@observer
class Vehicle extends React.Component {
  render() {
    return null;
  }
}
export { Vehicle, VehicleStore };
