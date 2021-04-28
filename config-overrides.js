const {
  addDecoratorsLegacy,
  override,
  disableEsLint,
  fixBabelImports
} = require("customize-cra");
module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  fixBabelImports("react-app-rewire-mobx", {
    libraryDirectory: "",
    camel2DashComponentName: false
  })
);
