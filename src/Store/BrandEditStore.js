import { observable, action, makeObservable, runInAction } from "mobx";
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
    this.getId();
    this.getBrand();
    makeObservable(this);
  }
  @observable renameId = "";
  @observable renameBrand = "";
  @observable renameSubmitDisabled = false;

  @action
  getRenameBrand() {
    const newBrand = this.BrandStore.brandList.find(
      obj => obj.id == this.renameId
    );
    this.renameBrand = newBrand.name;
  }
  @action
  setRenameBrand(e) {
    this.renameBrand = e;
  }

  @action.bound
  getId() {
    runInAction(() => {
      const loc = window.location.pathname.split("/")[2];
      this.renameId = parseInt(loc);
    });
  }
  @action
  getBrand() {
    runInAction(() => {
      this.getRenameBrand();
    });
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
    this.BrandService.renameBrands(this.renameId, this.renameBrand);
    this.goBack();
    this.refreshPage();
  }
}

export { BrandEditStore };
