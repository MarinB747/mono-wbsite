import axios from "axios";
class BrandService {
  getBrands() {
    return axios.get(`http://localhost:3000/brand`);
  }
  addBrands(e) {
    axios.post(`http://localhost:3000/brand`, e).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }

  renameBrands(id, name) {
    axios.put(`http://localhost:3000/brand/${id}`, { id: id, name: name });
  }
  deleteBrands(id, vehicles) {
    axios.delete(`http://localhost:3000/brand/${id}`).then(res => {
      console.log(res);
      console.log(res.data);
    });
    const vehicleNum = vehicles.filter(item => item.parentId === id).length;
    const vehicle = vehicles.findIndex(item => item.parentId === id);
    vehicles.splice(vehicle, vehicleNum);
  }
}

export { BrandService };
