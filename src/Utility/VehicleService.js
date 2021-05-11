import { observable, action, makeObservable } from "mobx";
class VehicleService {
  constructor() {
    makeObservable(this);
  }

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
  addVehicle(e, item) {
    let nextId = parseInt(this.vehicle.map(x => x.brand).lastIndexOf(item) + 1);
    if (nextId === 0) {
      nextId = this.vehicle.length;
    }
    console.log(nextId);
    this.vehicle.splice(nextId, 0, e);
  }

  @action.bound
  onDelete(id, vehicles) {
    const vehicle = vehicles.findIndex(item => item.id === id);
    vehicles.splice(vehicle, 1);
    return vehicles;
  }
}

export { VehicleService };
