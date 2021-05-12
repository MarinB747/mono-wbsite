import { action, makeObservable, computed } from "mobx";
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
  @action.bound renameVehicleByBrand(obj) {
    const targetBrand = this.BrandService.brand.find(
      e => e.id === obj.brand_id
    );
    obj.brand = targetBrand.name;
  }
  @computed get vehicleLastPage() {
    return Math.ceil(
      this.VehicleService.vehicle.length / this.VehicleStore.rowsPerPage
    );
  }
  @computed get brandLastPage() {
    return Math.ceil(
      this.BrandService.brand.length / this.BrandStore.rowsPerPage
    );
  }
  @computed get vehicleId() {
    return (
      Math.max.apply(
        null,
        this.VehicleService.vehicle.map(obj => obj.id)
      ) + 1
    );
  }
  @computed get brandId() {
    return (
      Math.max.apply(
        null,
        this.BrandService.brand.map(obj => obj.id)
      ) + 1
    );
  }
}
export { PageStore };
