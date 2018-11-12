const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  fixBabelImports,
  addBundleVisualizer,
  addWebpackAlias
} = require('customize-cra');

console.log(process.env.REACT_APP_BUNDLE_VISUALIZE);

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  process.env.REACT_APP_BUNDLE_VISUALIZE === 'true' && addBundleVisualizer(),
  addWebpackAlias({ '@ant-design/icons': 'purched-antd-icons' }), // only include used Icons
  fixBabelImports('antd', {
    libraryDirectory: 'lib',
    style: 'css'
  }),
  fixBabelImports('lodash', {
    libraryDirectory: '',
    camel2DashComponentName: false
  })
);
