import DB from "../db.json";
class VehicleService {
  getVehicles() {
    return DB.vehicle;
  }
  addVehicles(e) {
    let nextId = parseInt(
      DB.vehicle.map(x => x.parentId).lastIndexOf(e.parentId) + 1
    );
    if (nextId === 0) {
      nextId = DB.vehicle.length;
    }
    DB.vehicle.splice(nextId, 0, e);
  }

  deleteVehicles(id) {
    const vehicles = DB.vehicle.findIndex(item => item.id === id);
    DB.vehicle.splice(vehicles, 1);
  }

  renameVehicles(id, item) {
    const objId = DB.vehicle.findIndex(obj => obj.id === id);
    const objRename = DB.vehicle[objId];
    if (objRename.parentId === item.parentId) {
      objRename.parentId = item.parentId;
      objRename.model = item.model;
      objRename.year = item.year;
    } else {
      objRename.parentId = item.parentId;
      objRename.model = item.model;
      objRename.year = item.year;

      DB.vehicle.splice(objId, 1);
      let nextId = parseInt(
        DB.vehicle.map(x => x.parentId).lastIndexOf(item.parentId) + 1
      );
      if (nextId === 0) {
        nextId = DB.vehicle.length;
      }
      DB.vehicle.splice(nextId, 0, objRename);
    }
  }
}

export { VehicleService };
