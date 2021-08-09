import { VehicleService } from "../Utility/VehicleService";
import { BrandService } from "../Utility/BrandService";
import { VehicleStore } from "./VehicleStore";
import { BrandStore } from "./BrandStore";
import { RouterStore } from "react-router-mobx";
class PageStore {
  VehicleService;
  BrandService;
  VehicleStore;
  BrandStore;
  RouterStore;
  BrandEditStore;
  VehicleEditStore;
  constructor() {
    this.VehicleService = new VehicleService(this);
    this.BrandService = new BrandService(this);
    this.VehicleStore = new VehicleStore(this);
    this.BrandStore = new BrandStore(this);
    this.RouterStore = new RouterStore(this);
  }
}
const pageStore = new PageStore();
export { PageStore, pageStore };
