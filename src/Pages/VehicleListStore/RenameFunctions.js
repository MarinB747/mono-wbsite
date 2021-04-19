export const getId = (e, item) => {
  item(e);
};
export const onRename = (e, item, state1, state2, state3) => {
  const findId = item;
  const byId = parseInt(findId);
  const objRename = e.findIndex((obj) => obj.id === byId);
  e[objRename].brand = state1;
  e[objRename].brand_slug = state1.toLowerCase();
  e[objRename].model = state2;
  e[objRename].year = state3;
};
