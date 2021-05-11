import { observable, action, makeObservable } from "mobx";

class VehicleStore {
  constructor() {
    makeObservable(this);
  }
  @observable rowsPerPage = 5;
  @observable currentPage = 1;
  @observable filterBrand = 0;
  @observable filteredContent = "";
  @observable pageCount = [{ pages: 5 }, { pages: 10 }, { pages: 20 }];
  @observable renameVehicleBrand = "";
  @observable renameVehicleModel = "";
  @observable renameVehicleYear = "";
  @observable renameId = "";
  @observable showRenameForm = false;
  @observable startIndex = 0;
  @observable endIndex = 5;
  @observable renameSubmitDisabled = true;
  @observable formVehicleBrand = "";
  @observable formVehicleModel = "";
  @observable formVehicleYear = "";
  @observable formSubmitDisabled = true;

  @action setRowsPerPage(e) {
    this.rowsPerPage = parseInt(e);
  }
  @action setPreviousPage() {
    this.currentPage = parseInt(this.currentPage - 1);
  }
  @action setNextPage() {
    this.currentPage = parseInt(this.currentPage + 1);
  }

  @action filterByBrand(e) {
    this.filterBrand = parseInt(e);
  }
  @action.bound filterMethod = item => {
    if (this.filterBrand !== 0) {
      return item.brand_id === this.filterBrand;
    } else {
      return true;
    }
  };
  @action setRenameVehicleBrand(e) {
    this.renameVehicleBrand = e;
  }
  @action setRenameVehicleModel(e) {
    this.renameVehicleModel = e;
  }
  @action setRenameVehicleYear(e) {
    this.renameVehicleYear = e;
  }
  @action getRenameId(e) {
    this.renameId = parseInt(e);
  }
  @action setShowRenameForm() {
    this.showRenameForm = !this.showRenameForm;
  }
  @action sortByBrand(item) {
    item.sort((b, a) => (a.brand < b.brand ? 1 : a.brand > b.brand ? -1 : 0));
  }
  @action sortByModel(item) {
    item.sort((b, a) => (a.model < b.model ? 1 : a.model > b.model ? -1 : 0));
  }
  @action sortByYear(item) {
    item.sort((b, a) => (a.year < b.year ? 1 : a.year > b.year ? -1 : 0));
  }
  @action setPlaceholderBrand(e) {
    let placeholderName = e.find(obj => obj.id === this.renameId);
    this.renameVehicleBrand = placeholderName.brand;
  }
  @action setPlaceholderModel(e) {
    let placeholderName = e.find(obj => obj.id === this.renameId);
    this.renameVehicleModel = placeholderName.model;
  }
  @action setPlaceholderYear(e) {
    let placeholderName = e.find(obj => obj.id === this.renameId);
    this.renameVehicleYear = placeholderName.year;
  }
  @action
  onRename(e) {
    const objRename = e.findIndex(obj => obj.id === this.renameId);
    e[objRename].brand = this.renameVehicleBrand;
    e[objRename].model = this.renameVehicleModel;
    e[objRename].year = this.renameVehicleYear;
  }
  @action setStartIndex() {
    this.startIndex = this.currentPage * this.rowsPerPage - this.rowsPerPage;
  }
  @action setEndIndex() {
    this.endIndex = this.startIndex + this.rowsPerPage;
  }
  @action setRenameSubmitDisabled(e) {
    this.renameSubmitDisabled = e;
  }
  @action setFormVehicleBrand(e) {
    this.formVehicleBrand = e;
  }
  @action setFormVehicleModel(e) {
    this.formVehicleModel = e;
  }
  @action setFormVehicleYear(e) {
    this.formVehicleYear = e;
  }
  @action setFormSubmitDisabled(e) {
    this.formSubmitDisabled = e;
  }
}

export { VehicleStore };
