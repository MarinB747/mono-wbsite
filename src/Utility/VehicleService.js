import axios from "axios";
class VehicleService {
  getVehicles() {
    return axios.get(`http://127.0.0.1:3333/vehicles`);
  }

  addVehicles(e) {
    axios.post(`http://127.0.0.1:3333/vehicles`, e).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }
  deleteVehicles(id) {
    axios.delete(`http://127.0.0.1:3333/vehicles/${id}`).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }
  renameVehicles(id, brand_id, model, year) {
    axios.put(`http://127.0.0.1:3333/vehicles/${id}`, {
      id: id,
      brand_id: brand_id,
      model: model,
      year: year
    });
  }
}

export { VehicleService };
