import { observable, action, makeObservable } from "mobx";
class BrandEditStore {
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
  @observable placeholderBrand = "";
  @observable renameSubmitDisabled = true;

  @action.bound
  setRenameBrand(e) {
    this.renameBrand = e;
  }
  @action.bound
  getId() {
    const loc = window.location.pathname.split("/")[2];
    this.renameId = parseInt(loc);
    console.log(loc);
    console.log(this.renameId);
  }
  @action.bound
  getBrand() {
    this.placeholderBrand = this.BrandStore.renameBrand;
  }
  @action.bound
  goBack() {
    this.PageStore.RouterStore.history.push(`/brand`);
  }
  @action.bound setRenameSubmitDisabled(e) {
    this.renameSubmitDisabled = e;
  }
  @action.bound
  async refreshPage() {
    await window.location.reload(true);
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
    this.getId();
    this.BrandService.renameBrands(this.renameId, this.renameBrand);
    this.goBack();
    this.refreshPage();
  }
}

export { BrandEditStore };
