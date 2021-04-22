export const onRename = (e, item, Brand, Model, Year) => {
  const findId = item;
  const byId = parseInt(findId);
  const objRename = e.findIndex((obj) => obj.id === byId);
  e[objRename].brand = Brand;
  e[objRename].brand_slug = Brand.toLowerCase();
  e[objRename].model = Model;
  e[objRename].year = Year;
};
