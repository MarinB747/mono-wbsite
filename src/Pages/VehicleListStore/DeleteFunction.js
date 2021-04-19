export const onDelete = (item, obj) => {
  const determineId = item;
  const id = obj.find((item) => item.id === determineId);
  obj.remove(id);
};
