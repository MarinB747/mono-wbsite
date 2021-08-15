import {
  observable,
  action,
  computed,
  makeObservable,
  runInAction
} from "mobx";
class BrandStore {
  PageStore;
  VehicleService;
  BrandService;
  RotuerStore;
  constructor(PageStore) {
    this.PageStore = PageStore;
    this.VehicleService = PageStore.VehicleService;
    this.BrandService = PageStore.BrandService;
    this.RouterStore = PageStore.RouterStore;
    this.getBrandList();
    this.getVehicleList();
    makeObservable(this);
  }
  @observable rowsPerPage = 5;
  @observable currentPage = 1;
  @observable pageCount = [{ pages: 5 }, { pages: 10 }, { pages: 20 }];
  @observable vehicleBrand = "";
  @observable filterBrand = "";
  @observable startIndex = 0;
  @observable endIndex = 5;
  @observable submitDisabled = true;
  @observable renameId = "";
  @observable sortBrand = false;
  @observable showModal = false;
  @observable brandList = [];
  @observable vehicleList = [];

  @action.bound
  openEditPage() {
    this.PageStore.RouterStore.history.push(`/brand-edit/${this.renameId}`);
  }
  @action.bound
  refreshPage() {
    window.location.reload(true);
  }
  @action.bound setBrandList(e) {
    this.brandList = e;
  }
  @action.bound setVehicleList(e) {
    this.vehicleList = e;
  }
  @action.bound
  getBrandList() {
    this.BrandService.getBrands().then(res => {
      runInAction(() => {
        this.setBrandList(res.data);
      });
    });
  }
  getVehicleList() {
    this.VehicleService.getVehicles().then(res => {
      runInAction(() => {
        this.setVehicleList(res.data);
      });
    });
  }
  @action.bound setShowModal() {
    this.showModal = !this.showModal;
  }
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
  @action.bound filterByBrand(e) {
    this.filterBrand = e;
  }
  @action.bound sortByBrand() {
    this.brandList.sort((b, a) =>
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

  @computed get brandLastPage() {
    return Math.ceil(this.brandList.length / this.rowsPerPage);
  }

  @action.bound onDelete() {
    this.BrandService.deleteBrands(this.renameId);
    this.setShowModal();
    this.sortBrand = !this.sortBrand;
    this.sortBrand = !this.sortBrand;
    this.refreshPage();
  }

  @action.bound setRenameId(e) {
    this.renameId = parseInt(e);
  }

  @computed get brandId() {
    return (
      Math.max.apply(
        null,
        this.brandList.map(obj => obj.id)
      ) + 1
    );
  }
  @action.bound
  getParentId() {
    this.vehicleList.forEach(obj => {
      const targetBrand = this.brandList.find(e => e.id === obj.parentId);
      if (targetBrand === undefined) {
        return null;
      } else {
        obj.brand = targetBrand.name;
      }
    });
  }

  @action.bound
  renameMethod() {
    this.BrandService.renameBrands(this.renameId, this.renameBrand);
    this.refreshPage();
  }
  @action.bound
  mapBrands(e) {
    let brands = this.brandList;
    return brands.map(e);
  }
  @action.bound
  getBrands(e) {
    const brands = this.brandList;
    return brands
      .filter(item => {
        if (item.name.indexOf(this.filterBrand) > -1) return true;
      })
      .slice(this.startIndex, this.endIndex)
      .map(e);
  }
  @action.bound
  showModalMethod(e) {
    this.setRenameId(e);
    this.setShowModal();
    this.setPlaceholderBrand();
  }
  @action.bound
  renameButtonMethod(e) {
    this.setRenameId(e);
    this.openEditPage();
  }
  @action.bound
  pagingMethod(e) {
    this.setRowsPerPage(e);
    this.setStartIndex();
    this.setEndIndex();
    this.sortBrand = true;
    this.sortBrand = false;
  }
  @action.bound nextPageMethod() {
    this.setNextPage();
    this.setStartIndex();
    this.setEndIndex();
  }
  @action.bound previousPageMethod() {
    this.setPreviousPage();
    this.setStartIndex();
    this.setEndIndex();
  }

  @action.bound
  addBrandMethod() {
    this.BrandService.addBrands({
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
