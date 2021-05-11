import { observable, action, makeObservable } from "mobx";

class BrandService {
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

  @action.bound
  addBrand(e) {
    this.brand.push(e);
  }
  @action onDelete(id, brands, vehicles) {
    const brand = brands.findIndex(item => item.id === id);
    brands.splice(brand, 1);
    const vehicleNum = vehicles.filter(item => item.brand_id === id).length;
    const vehicle = vehicles.findIndex(item => item.brand_id === id);
    vehicles.splice(vehicle, vehicleNum);
    return brands;
  }
}

export { BrandService };
