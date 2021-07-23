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
    this.BrandStore = PageStore.BrandStore;
    makeObservable(this);
  }

  @observable renameId = "";
  @observable renameBrand = "";
  @observable renameSubmitDisabled = true;
  @action.bound
  getId() {
    const loc = window.location.pathname.split("/")[2];
    this.renameId = loc;
  }
  @action.bound
  goBack() {
    this.PageStore.RouterStore.history.push(`/brand`);
  }
  @action.bound setRenameSubmitDisabled(e) {
    this.renameSubmitDisabled = e;
  }

  @action.bound
  renameBrandMethod(e) {
    this.setRenameBrand(e);
    if (this.renameBrand !== "") {
      this.setRenameSubmitDisabled(false);
    } else {
      this.setRenameSubmitDisabled(true);
    }
  }
  @action.bound
  renameMethod() {
    this.BrandService.renameBrands(this.renameId, this.renameBrand);

    this.goBack();
  }
}

export { VehicleEditStore };
