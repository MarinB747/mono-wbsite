import axios from "axios";
class VehicleService {
  getVehicles() {
    return axios.get(`http://localhost:3000/vehicle`);
  }

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
}

export { VehicleService };
