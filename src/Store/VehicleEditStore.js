import { observable, action, makeObservable, runInAction } from "mobx";
class VehicleEditStore {
  PageStore;
  VehicleService;
  BrandService;
  RotuerStore;
  constructor(PageStore) {
    runInAction(() => {
      this.PageStore = PageStore;
      this.VehicleService = PageStore.VehicleService;
      this.BrandService = PageStore.BrandService;
      this.RouterStore = PageStore.RouterStore;
      this.VehicleStore = PageStore.VehicleStore;
      this.getId(this);
      this.getVehicleList();
    });
    makeObservable(this);
  }

  @observable renameId = 0;
  @observable renameBrand = "";
  @observable renameModel = "";
  @observable renameYear = "";
  @observable renameSubmitDisabled = false;
  @observable brandList = [];
  @observable vehicleList = [];

  @action.bound
  getVehicleList() {
    this.VehicleService.getVehicles().then(res => {
      runInAction(() => {
        this.setVehicleList(res.data);
      });
      this.brandList = this.VehicleStore.brandList;
      this.getRenameBrand();
      this.getRenameModel();
      this.getRenameYear();
    });
  }
  @action.bound
  setVehicleList(e) {
    this.vehicleList = e;
  }
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
  getRenameBrand() {
    const newBrand = this.vehicleList.find(obj => obj.id == this.renameId);
    console.log(newBrand);
    this.renameBrand = parseInt(newBrand.parentId);
  }

  @action.bound
  getRenameModel() {
    const newModel = this.vehicleList.find(obj => obj.id == this.renameId);
    this.renameModel = newModel.model;
  }
  @action.bound
  getRenameYear() {
    const newYear = this.vehicleList.find(obj => obj.id == this.renameId);
    this.renameYear = newYear.year;
  }
  @action.bound
  getId() {
    runInAction(() => {
      const loc = window.location.pathname.split("/")[2];
      this.renameId = loc;
    });
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
  }
  @action.bound
  clearMethod() {
    this.setRenameBrand("");
    this.setRenameModel("");
    this.setRenameYear("");
  }
}

export { VehicleEditStore };
