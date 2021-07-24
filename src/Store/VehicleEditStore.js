import { observable, action, makeObservable } from "mobx";
class VehicleEditStore {
  PageStore;
  VehicleService;
  BrandService;
  RotuerStore;
  constructor(PageStore) {
    this.PageStore = PageStore;
    this.VehicleService = PageStore.VehicleService;
    this.BrandService = PageStore.BrandService;
    this.RouterStore = PageStore.RouterStore;
    this.VehicleStore = PageStore.VehicleStore;
    makeObservable(this);
  }

  @observable renameId = "";
  @observable renameBrand = "";
  @observable renameModel = "";
  @observable renameYear = "";
  @observable placeholderBrand = 0;
  @observable placeholderModel = "";
  @observable placeholderYear = "";
  @observable renameSubmitDisabled = true;
  @observable brandList = [];

  @action
  setRenameBrand(e) {
    this.renameBrand = parseInt(e);
  }
  @action
  setRenameModel(e) {
    this.renameModel = e;
  }
  @action
  setRenameYear(e) {
    this.renameYear = e;
  }
  @action.bound
  getId() {
    const loc = window.location.pathname.split("/")[2];
    this.renameId = parseInt(loc);
    console.log(loc);
    console.log(this.renameId);
  }
  @action.bound
  getData() {
    this.placeholderBrand = this.VehicleStore.renameVehicleBrand;
    this.placeholderModel = this.VehicleStore.renameVehicleModel;
    this.placeholderYear = this.VehicleStore.renameVehicleYear;
    this.brandList = this.VehicleStore.brandList;
  }
  @action.bound
  goBack() {
    this.PageStore.RouterStore.history.push(`/store`);
  }
  @action.bound setRenameSubmitDisabled(e) {
    this.renameSubmitDisabled = e;
  }
  @action.bound
  async refreshPage() {
    await window.location.reload(true);
  }

  @action.bound
  renameModelMethod(e) {
    this.setRenameModel(e);
    if (this.renameModel && this.renameYear !== "") {
      this.setRenameSubmitDisabled(false);
    } else {
      this.setRenameSubmitDisabled(true);
    }
  }
  @action.bound
  renameYearMethod(e) {
    if (e.match("^[0-9]{1,4}$") != null) {
      this.setRenameYear(e);
    }
    if (this.renameModel && this.renameYear !== "") {
      this.setRenameSubmitDisabled(false);
    } else {
      this.setRenameSubmitDisabled(true);
    }
  }
  @action.bound
  renameMethod() {
    this.getId();

    this.VehicleService.renameVehicles(
      this.renameId,
      this.renameBrand,
      this.renameModel,
      this.renameYear
    );
    this.goBack();
    this.refreshPage();
  }
}

export { VehicleEditStore };
