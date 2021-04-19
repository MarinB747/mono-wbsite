function sortByBrand(item) {
  item.sort((b, a) => (a.brand < b.brand ? 1 : a.brand > b.brand ? -1 : 0));
}
function sortByModel(item) {
  item.sort((b, a) => (a.model < b.model ? 1 : a.model > b.model ? -1 : 0));
}
function sortByYear(item) {
  item.sort((b, a) => (a.year < b.year ? 1 : a.year > b.year ? -1 : 0));
}

export { sortByBrand, sortByModel, sortByYear };
