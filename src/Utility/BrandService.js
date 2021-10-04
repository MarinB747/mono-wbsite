import axios from "axios";
class BrandService {
  getBrands() {
    return axios.get(`http://127.0.0.1:3333/brands`);
  }
  addBrands(e) {
    axios.post(`http://127.0.0.1:3333/brands`, e).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }

  renameBrands(id, name) {
    axios.put(`http://127.0.0.1:3333/brands/${id}`, { id: id, name: name });
  }
  deleteBrands(id) {
    axios.delete(`http://127.0.0.1:3333/brands/${id}`).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }
}

export { BrandService };
