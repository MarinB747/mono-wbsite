class BrandService {
  brand = [
    {
      id: 1,
      name: "BMW"
    },
    {
      id: 2,
      name: "Audi"
    },
    {
      id: 3,
      name: "Volkswagen"
    },
    {
      id: 4,
      name: "Ford"
    }
  ];
  getBrands() {
    return this.brand;
  }
  addBrands(e) {
    this.brand.push(e);
  }

  renameBrands(id, name) {
    const objId = this.brand.findIndex(obj => obj.id === id);
    const objRename = this.brand[objId];
    objRename.name = name;
  }
  deleteBrands(id, vehicles) {
    const item = this.brand.findIndex(item => item.id === id);
    this.brand.splice(item, 1);
    const vehicleNum = vehicles.filter(item => item.parentId === id).length;
    const vehicle = vehicles.findIndex(item => item.parentId === id);
    vehicles.splice(vehicle, vehicleNum);
  }
}

export { BrandService };
