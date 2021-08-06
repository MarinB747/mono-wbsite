import { observable, action, makeObservable, runInAction } from "mobx";
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
    runInAction(() => {
      this.getData();
      this.getId();
    });
    makeObservable(this);
  }

  @observable renameId = "";
  @observable renameBrand = "";
  @observable renameModel = "";
  @observable renameYear = "";
  @observable renameSubmitDisabled = false;
  @observable brandList = [];

  @action.bound
  setRenameBrand(e) {
    this.renameBrand = parseInt(e);
  }
  @action.bound
  setRenameModel(e) {
    this.renameModel = e;
  }
  @action.bound
  setRenameYear(e) {
    this.renameYear = e;
  }
  @action.bound
  getId() {
    const loc = window.location.pathname.split("/")[2];
    this.renameId = parseInt(loc);
  }
  @action.bound
  getData() {
    this.renameBrand = this.VehicleStore.renameVehicleBrand;
    this.renameModel = this.VehicleStore.renameVehicleModel;
    this.renameYear = this.VehicleStore.renameVehicleYear;
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
  @action.bound
  clearMethod() {
    this.setRenameBrand("");
    this.setRenameModel("");
    this.setRenameYear("");
  }
}

export { VehicleEditStore };
