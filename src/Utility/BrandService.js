import DB from "../db.json";
class BrandService {
  getBrands() {
    return DB.brand;
  }
  addBrands(e) {
    DB.brand.push(e);
  }

  renameBrands(id, name) {
    const objId = DB.brand.findIndex(obj => obj.id === id);
    const objRename = DB.brand[objId];
    objRename.name = name;
  }
  deleteBrands(id, vehicles) {
    const item = DB.brand.findIndex(item => item.id === id);
    DB.brand.splice(item, 1);
    const vehicleNum = vehicles.filter(item => item.parentId === id).length;
    const vehicle = vehicles.findIndex(item => item.parentId === id);
    vehicles.splice(vehicle, vehicleNum);
  }
}

export { BrandService };
