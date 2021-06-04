class VehicleService {
  vehicle = [
    {
      id: 1,
      parentId: 1,
      model: "X3",
      year: "2011"
    },
    {
      id: 2,
      parentId: 1,
      model: "X6",
      year: "2017"
    },
    {
      id: 3,
      parentId: 1,
      model: "Z3",
      year: "2004"
    },
    {
      id: 4,
      parentId: 1,
      model: "I3",
      year: "2013"
    },
    {
      id: 5,
      parentId: 2,
      model: "Q5",
      year: "2008"
    },
    {
      id: 6,
      parentId: 2,
      model: "R8",
      year: "2010"
    },
    {
      id: 7,
      parentId: 2,
      model: "TT Roadster",
      year: "2003"
    },
    {
      id: 8,
      parentId: 2,
      model: "A6",
      year: "2011"
    },
    {
      id: 9,
      parentId: 3,
      model: "Golf 4",
      year: "2001"
    },
    {
      id: 10,
      parentId: 3,
      model: "Beetle",
      year: "1997"
    },
    {
      id: 11,
      parentId: 3,
      model: "Polo",
      year: "1985"
    },
    {
      id: 12,
      parentId: 4,
      model: "Focus",
      year: "2006"
    },
    {
      id: 13,
      parentId: 4,
      model: "Puma",
      year: "2019"
    },
    {
      id: 14,
      parentId: 4,
      model: "Kuga",
      year: "2008"
    }
  ];
  getVehicles() {
    return this.vehicle;
  }
  addVehicles(e) {
    let nextId = parseInt(
      this.vehicle.map(x => x.parentId).lastIndexOf(e.parentId) + 1
    );
    if (nextId === 0) {
      nextId = this.vehicle.length;
    }
    this.vehicle.splice(nextId, 0, e);
  }

  deleteVehicles(id) {
    const vehicles = this.vehicle.findIndex(item => item.id === id);
    this.vehicle.splice(vehicles, 1);
  }

  renameVehicles(id, item) {
    const objId = this.vehicle.findIndex(obj => obj.id === id);
    const objRename = this.vehicle[objId];
    if (objRename.parentId === item.parentId) {
      objRename.parentId = item.parentId;
      objRename.model = item.model;
      objRename.year = item.year;
    } else {
      objRename.parentId = item.parentId;
      objRename.model = item.model;
      objRename.year = item.year;

      this.vehicle.splice(objId, 1);
      let nextId = parseInt(
        this.vehicle.map(x => x.parentId).lastIndexOf(item.parentId) + 1
      );
      if (nextId === 0) {
        nextId = this.vehicle.length;
      }
      this.vehicle.splice(nextId, 0, objRename);
    }
  }
}

export { VehicleService };
