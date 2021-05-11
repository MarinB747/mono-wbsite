import { action, makeObservable } from "mobx";
import { VehicleService } from "../Utility/VehicleService";
import { BrandService } from "../Utility/BrandService";
import { VehicleStore } from "./VehicleStore";
import { BrandStore } from "./BrandStore";
class PageStore {
  VehicleService;
  BrandService;
  VehicleStore;
  BrandStore;
  constructor() {
    this.VehicleService = new VehicleService();
    this.BrandService = new BrandService();
    this.VehicleStore = new VehicleStore();
    this.BrandStore = new BrandStore();
    makeObservable(this);
  }
  @action.bound
  getBrandId() {
    this.VehicleService.vehicle.forEach(obj => {
      const targetBrand = this.BrandService.brand.find(
        e => e.name === obj.brand
      );
      obj.brand_id = targetBrand.id;
    });
  }
}
export { PageStore };
