import axios from "axios";
import { model } from "mongoose";
class VehicleService {
  getVehicles() {
    return axios.get(`http://localhost:3000/vehicle`);
  }
  /* addVehicles(e) {
    let nextId = parseInt(
      DB.vehicle.map(x => x.parentId).lastIndexOf(e.parentId) + 1
    );
    if (nextId === 0) {
      nextId = DB.vehicle.length;
    }
    DB.vehicle.splice(nextId, 0, e);
  } */
  addVehicles(e) {
    axios.post(`http://localhost:3000/vehicle`, e).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }
  deleteVehicles(id) {
    axios.delete(`http://localhost:3000/vehicle/${id}`).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }
  renameVehicles(id, parentId, model, year) {
    axios.put(`http://localhost:3000/vehicle/${id}`, {
      id: id,
      parentId: parentId,
      model: model,
      year: year
    });
  }

  /*  renameVehicles(id, item) {
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
  }*/
}

export { VehicleService };
