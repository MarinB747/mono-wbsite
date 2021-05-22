import { observable, action, computed, makeObservable } from "mobx";
class VehicleStore {
  PageStore;
  constructor(PageStore) {
    this.PageStore = PageStore;
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
  @observable renameVehicleBrand = "";
  @observable renameVehicleModel = "";
  @observable renameVehicleYear = "";
  @observable renameId = "";
  @observable sortBrand = false;
  @observable sortModel = false;
  @observable sortYear = false;

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
  @action sortByBrand() {
    this.PageStore.VehicleService.vehicle.sort((b, a) =>
      a.name < b.name ? 1 : a.name > b.name ? -1 : 0
    );
    this.sortBrand = true;
    this.sortModel = false;
    this.sortYear = false;
  }
  @action sortByModel() {
    this.PageStore.VehicleService.vehicle.sort((b, a) =>
      a.model < b.model ? 1 : a.model > b.model ? -1 : 0
    );
    this.sortBrand = false;
    this.sortModel = true;
    this.sortYear = false;
  }
  @action sortByYear() {
    this.PageStore.VehicleService.vehicle.sort((b, a) =>
      a.year < b.year ? 1 : a.year > b.year ? -1 : 0
    );
    this.sortBrand = false;
    this.sortModel = false;
    this.sortYear = true;
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
  @action.bound
  addVehicle(e) {
    let nextId = parseInt(
      this.PageStore.VehicleService.vehicle
        .map(x => x.name)
        .lastIndexOf(this.formVehicleBrand) + 1
    );
    if (nextId === 0) {
      nextId = this.PageStore.VehicleService.vehicle.length;
    }
    this.PageStore.VehicleService.vehicle.splice(nextId, 0, e);
  }

  @action.bound
  onDelete(id) {
    const vehicle = this.PageStore.VehicleService.vehicle.findIndex(
      item => item.id === id
    );
    this.PageStore.VehicleService.vehicle.splice(vehicle, 1);
    this.sortBrand = true;
    this.sortBrand = false;
  }
  @action
  onRename() {
    const objId = this.PageStore.VehicleService.vehicle.findIndex(
      obj => obj.id === this.renameId
    );
    const objRename = this.PageStore.VehicleService.vehicle[objId];
    if (objRename.name === this.renameVehicleBrand) {
      objRename.name = this.renameVehicleBrand;
      objRename.model = this.renameVehicleModel;
      objRename.year = this.renameVehicleYear;
    } else {
      objRename.name = this.renameVehicleBrand;
      objRename.model = this.renameVehicleModel;
      objRename.year = this.renameVehicleYear;

      this.PageStore.VehicleService.vehicle.splice(objId, 1);
      let nextId = parseInt(
        this.PageStore.VehicleService.vehicle
          .map(x => x.name)
          .lastIndexOf(this.renameVehicleBrand) + 1
      );
      if (nextId === 0) {
        nextId = this.vehicle.length;
      }
      this.PageStore.VehicleService.vehicle.splice(nextId, 0, objRename);
    }
  }
  @action setRenameId(e) {
    this.renameId = parseInt(e);
  }
  @action setPlaceholderBrand() {
    let placeholderName = this.PageStore.VehicleService.vehicle.find(
      obj => obj.id === this.renameId
    );
    this.renameVehicleBrand = placeholderName.name;
  }
  @action setPlaceholderModel() {
    let placeholderName = this.PageStore.VehicleService.vehicle.find(
      obj => obj.id === this.renameId
    );
    console.log(placeholderName);
    this.renameVehicleModel = placeholderName.model;
  }
  @action setPlaceholderYear() {
    let placeholderName = this.PageStore.VehicleService.vehicle.find(
      obj => obj.id === this.renameId
    );
    this.renameVehicleYear = placeholderName.year;
  }
  @action setRenameVehicleBrand(e) {
    this.renameVehicleBrand = e;
  }
  @action setRenameVehicleModel(e) {
    this.renameVehicleModel = e;
  }
  @action setRenameVehicleYear(e) {
    this.renameVehicleYear = e;
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
  @computed get vehicleLastPage() {
    return Math.ceil(
      this.PageStore.VehicleService.vehicle.length / this.rowsPerPage
    );
  }

  @computed get vehicleId() {
    return (
      Math.max.apply(
        null,
        this.PageStore.VehicleService.vehicle.map(obj => obj.id)
      ) + 1
    );
  }
  @action.bound
  getBrands(e) {
    let brands = this.PageStore.BrandService.brand;
    return brands.map(e);
  }
  @action.bound
  getVehicles(e) {
    let vehicles = this.PageStore.VehicleService.vehicle;
    return vehicles
      .filter(item => {
        if (this.filterBrand !== 0) {
          return item.parentId === this.filterBrand;
        } else {
          return true;
        }
      })
      .slice(this.startIndex, this.endIndex)
      .map(e);
  }
  @action.bound
  renameFormMethod(e) {
    this.setRenameId(e);
    this.setShowRenameForm();
    this.setPlaceholderBrand();
    this.setPlaceholderModel();
    this.setPlaceholderYear();
  }
  @action.bound
  pagingMethod(e) {
    this.setRowsPerPage(e);
    this.setStartIndex();
    this.setEndIndex();
  }
  @action.bound
  previousPageMethod() {
    this.setPreviousPage();
    this.setStartIndex();
    this.setEndIndex();
  }
  @action.bound
  nextPageMethod() {
    this.setNextPage();
    this.setStartIndex();
    this.setEndIndex();
  }
  @action.bound
  onRenameMethod() {
    this.onRename();
    this.setShowRenameForm();
    this.setRenameVehicleModel("");
    this.setRenameVehicleYear("");
  }
  @action.bound
  renameVehicleModelMethod(e) {
    this.setRenameVehicleModel(e);
    if (this.renameVehicleModel && this.renameVehicleYear !== "") {
      this.setRenameSubmitDisabled(false);
    } else {
      this.setRenameSubmitDisabled(true);
    }
  }
  @action.bound
  renameVehicleYearMethod(e) {
    if (e.match("^[0-9]{1,4}$") != null) {
      this.setRenameVehicleYear(e);
    }
    if (this.renameVehicleModel && this.renameVehicleYear !== "") {
      this.setRenameSubmitDisabled(false);
    } else {
      this.setRenameSubmitDisabled(true);
    }
  }
  @action.bound
  addVehicleMethod() {
    this.addVehicle({
      name: this.formVehicleBrand,
      model: this.formVehicleModel,
      year: this.formVehicleYear,
      id: this.vehicleId
    });
    this.setFormVehicleModel("");
    this.setFormVehicleYear("");
  }
  @action.bound
  formVehicleModelMethod(e) {
    this.setFormVehicleModel(e);
    if (this.formVehicleModel && this.formVehicleYear !== "") {
      this.setFormSubmitDisabled(false);
    } else {
      this.setFormSubmitDisabled(true);
    }
  }
  @action.bound
  formVehicleYearMethod(e) {
    if (e.match("^[0-9]{1,4}$") != null) {
      this.setFormVehicleYear(e);
    }
    if (this.formVehicleModel && this.formVehicleYear !== "") {
      this.setFormSubmitDisabled(false);
    } else {
      this.setFormSubmitDisabled(true);
    }
  }
}

export { VehicleStore };
