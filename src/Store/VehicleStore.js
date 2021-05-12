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
