const nextPage = (item) => {
  item((page) => page + 1);
};
const previousPage = (item) => {
  item((page) => page - 1);
};
const largerPage = (e, item) => {
  item(e.target.value);
};
export { nextPage, previousPage, largerPage };
