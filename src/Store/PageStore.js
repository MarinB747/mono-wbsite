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
    this.VehicleService = new VehicleService(this);
    this.BrandService = new BrandService(this);
    this.VehicleStore = new VehicleStore(this);
    this.BrandStore = new BrandStore(this);
  }
}
const pageStore = new PageStore();
export { PageStore, pageStore };
