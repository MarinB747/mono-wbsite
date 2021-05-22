import { observable, action, computed, makeObservable } from "mobx";
class BrandStore {
  PageStore;
  constructor(PageStore) {
    this.PageStore = PageStore;
    makeObservable(this);
  }
  @observable rowsPerPage = 5;
  @observable currentPage = 1;
  @observable pageCount = [{ pages: 5 }, { pages: 10 }, { pages: 20 }];
  @observable vehicleBrand = "";
  @observable filterBrand = "";
  @observable showRenameForm = false;
  @observable startIndex = 0;
  @observable endIndex = 5;
  @observable submitDisabled = true;
  @observable renameSubmitDisabled = true;
  @observable renameBrand = "";
  @observable renameId = "";
  @observable sortBrand = false;
  @action.bound setRowsPerPage(e) {
    this.rowsPerPage = parseInt(e);
  }
  @action.bound setPreviousPage() {
    this.currentPage = parseInt(this.currentPage - 1);
  }
  @action.bound setNextPage() {
    this.currentPage = parseInt(this.currentPage + 1);
  }
  @action.bound setVehicleBrand(e) {
    this.vehicleBrand = e;
  }
  @action.bound setShowRenameForm() {
    this.showRenameForm = !this.showRenameForm;
  }
  @action.bound filterByBrand(e) {
    this.filterBrand = e;
  }
  @action.bound sortByBrand() {
    this.PageStore.BrandService.brand.sort((b, a) =>
      a.name < b.name ? 1 : a.name > b.name ? -1 : 0
    );
    this.sortBrand = true;
  }
  @action.bound
  setStartIndex() {
    this.startIndex = this.currentPage * this.rowsPerPage - this.rowsPerPage;
  }
  @action.bound setEndIndex() {
    this.endIndex = this.startIndex + this.rowsPerPage;
  }
  @action.bound setSubmitDisabled(e) {
    this.submitDisabled = e;
  }
  @action.bound setRenameSubmitDisabled(e) {
    this.renameSubmitDisabled = e;
  }
  @action.bound renameVehicleByBrand(obj) {
    const targetBrand = this.PageStore.BrandService.brand.find(
      e => e.id === obj.parentId
    );
    obj.name = targetBrand.name;
  }
  @computed get brandLastPage() {
    return Math.ceil(
      this.PageStore.BrandService.brand.length / this.rowsPerPage
    );
  }
  @action.bound
  addBrand(e) {
    this.PageStore.BrandService.brand.push(e);
  }
  @action onDelete(id) {
    const brand = this.PageStore.BrandService.brand.findIndex(
      item => item.id === id
    );
    this.PageStore.BrandService.brand.splice(brand, 1);
    const vehicleNum = this.PageStore.VehicleService.vehicle.filter(
      item => item.parentId === id
    ).length;
    const vehicle = this.PageStore.VehicleService.vehicle.findIndex(
      item => item.parentId === id
    );
    this.PageStore.VehicleService.vehicle.splice(vehicle, vehicleNum);
    this.sortBrand = true;
    this.sortBrand = false;
  }
  @action.bound
  onRename() {
    const objId = this.PageStore.BrandService.brand.findIndex(
      obj => obj.id === this.renameId
    );
    const objRename = this.PageStore.BrandService.brand[objId];
    objRename.name = this.renameBrand;
  }
  @action.bound setRenameBrand(e) {
    this.renameBrand = e;
  }
  @action.bound setRenameId(e) {
    this.renameId = parseInt(e);
  }
  @action.bound setPlaceholderBrand() {
    let placeholderName = this.PageStore.BrandService.brand.find(
      obj => obj.id === this.renameId
    );
    this.renameBrand = placeholderName.name;
  }
  @computed get brandId() {
    return (
      Math.max.apply(
        null,
        this.PageStore.BrandService.brand.map(obj => obj.id)
      ) + 1
    );
  }
  @action.bound
  getParentId() {
    this.PageStore.VehicleService.vehicle.forEach(obj => {
      const targetBrand = this.PageStore.BrandService.brand.find(
        e => e.name === obj.name
      );
      obj.parentId = targetBrand.id;
    });
  }
  @action.bound
  renameMethod() {
    this.onRename();
    this.setRenameSubmitDisabled(true);
    this.setShowRenameForm();
    this.PageStore.VehicleService.vehicle.forEach(this.renameVehicleByBrand);
    this.setRenameBrand("");
  }
  @action.bound
  mapBrands(e) {
    let brands = this.PageStore.BrandService.brand;
    return brands.map(e);
  }
  @action.bound
  getBrands(e) {
    let brands = this.PageStore.BrandService.brand;
    return brands
      .filter(item => {
        if (item.name.indexOf(this.filterBrand) > -1) return true;
      })
      .slice(this.startIndex, this.endIndex)
      .map(e);
  }
  @action.bound
  RenameButtonMethod(e) {
    this.setRenameId(e);
    this.setShowRenameForm();
    this.setPlaceholderBrand();
  }
  @action.bound
  pagingMethod(e) {
    this.setRowsPerPage(e);
    this.setStartIndex();
    this.setEndIndex();
  }
  @action nextPageMethod() {
    this.setNextPage();
    this.setStartIndex();
    this.setEndIndex();
  }
  @action previousPageMethod() {
    this.setPreviousPage();
    this.setStartIndex();
    this.setEndIndex();
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
  addBrandMethod() {
    this.addBrand({
      name: this.vehicleBrand,
      id: this.brandId
    });
    this.setVehicleBrand("");
    this.setSubmitDisabled(true);
  }
  @action.bound
  addBrandSubmitMethod(e) {
    this.setVehicleBrand(e);
    if (this.vehicleBrand !== "") {
      this.setSubmitDisabled(false);
    } else {
      this.setSubmitDisabled(true);
    }
  }
}

export { BrandStore };
