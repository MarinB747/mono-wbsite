import { observable, action, computed, makeObservable } from "mobx";
class VehicleStore {
  PageStore;
  VehicleService;
  constructor(PageStore) {
    this.PageStore = PageStore;
    this.VehicleService = PageStore.VehicleService;
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
  @observable renameSubmitDisabled = false;
  @observable formVehicleBrand = "";
  @observable formVehicleModel = "";
  @observable formVehicleYear = "";
  @observable formSubmitDisabled = true;
  @observable renameVehicleBrand = "";
  @observable renameVehicleParentId = "";
  @observable renameVehicleModel = "";
  @observable renameVehicleYear = "";
  @observable renameId = "";
  @observable sortBrand = false;
  @observable sortModel = false;
  @observable sortYear = false;
  @observable showModal = false;

  @action.bound setShowModal() {
    this.showModal = !this.showModal;
  }
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
    this.VehicleService.getVehicles().sort((b, a) =>
      a.brand < b.brand ? 1 : a.brand > b.brand ? -1 : 0
    );
    this.sortBrand = true;
    this.sortModel = false;
    this.sortYear = false;
  }
  @action sortByModel() {
    this.VehicleService.getVehicles().sort((b, a) =>
      a.model < b.model ? 1 : a.model > b.model ? -1 : 0
    );
    this.sortBrand = false;
    this.sortModel = true;
    this.sortYear = false;
  }
  @action sortByYear() {
    this.VehicleService.getVehicles().sort((b, a) =>
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
    this.formVehicleBrand = parseInt(e);
  }
  @action setFormVehicleModel(e) {
    this.formVehicleModel = e;
  }
  @action setFormVehicleYear(e) {
    this.formVehicleYear = e;
  }
  @action setrenameVehicleParentId(e) {
    this.renameVehicleParentId = parseInt(e);
  }
  @action setFormSubmitDisabled(e) {
    this.formSubmitDisabled = e;
  }

  @action.bound
  onDelete() {
    this.VehicleService.deleteVehicles(this.renameId);
    this.setShowModal();
    this.sortBrand = !this.sortBrand;
    this.sortBrand = !this.sortBrand;
  }
  @action.bound setRenameId(e) {
    this.renameId = parseInt(e);
  }
  @action.bound setPlaceholderBrand() {
    let placeholderName = this.VehicleService.getVehicles().find(
      obj => obj.id === this.renameId
    );
    this.renameVehicleBrand = placeholderName.brand;
  }
  @action.bound setPlaceholderModel() {
    let placeholderName = this.VehicleService.getVehicles().find(
      obj => obj.id === this.renameId
    );
    console.log(placeholderName);
    this.renameVehicleModel = placeholderName.model;
  }
  @action.bound setPlaceholderYear() {
    let placeholderName = this.VehicleService.getVehicles().find(
      obj => obj.id === this.renameId
    );
    this.renameVehicleYear = placeholderName.year;
  }
  @action.bound setRenameVehicleBrand(e) {
    this.renameVehicleBrand = parseInt(e);
  }
  @action.bound setRenameVehicleModel(e) {
    this.renameVehicleModel = e;
  }
  @action.bound setRenameVehicleYear(e) {
    this.renameVehicleYear = e;
  }
  @action.bound
  getParentId() {
    this.VehicleService.getVehicles().forEach(obj => {
      const targetBrand = this.PageStore.BrandService.getBrands().find(
        e => e.id === obj.parentId
      );
      obj.brand = targetBrand.name;
    });
  }
  @computed get vehicleLastPage() {
    return Math.ceil(
      this.VehicleService.getVehicles().length / this.rowsPerPage
    );
  }

  @computed get vehicleId() {
    return (
      Math.max.apply(
        null,
        this.VehicleService.getVehicles().map(obj => obj.id)
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
    let vehicles = this.VehicleService.getVehicles();
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
  showModalMethod(e) {
    this.setRenameId(e);
    this.setShowModal();
    this.setPlaceholderBrand();
    this.setPlaceholderModel();
    this.setPlaceholderYear();
    this.sortBrand = false;
    this.sortModel = false;
    this.sortYear = false;
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
    this.VehicleService.renameVehicles(this.renameId, {
      parentId: this.renameVehicleBrand,
      model: this.renameVehicleModel,
      year: this.renameVehicleYear
    });
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
    this.VehicleService.addVehicles({
      parentId: this.formVehicleBrand,
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
