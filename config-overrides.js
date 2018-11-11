const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  fixBabelImports,
  addBundleVisualizer,
  addWebpackAlias
} = require('customize-cra');

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  process.env.REACT_APP_BUNDLE_VISUALIZE === 'true' && addBundleVisualizer(),
  addWebpackAlias({ '@ant-design/icons': 'purched-antd-icons' }), // only include used Icons
  fixBabelImports('antd', {
    libraryDirectory: 'lib',
    style: false
  }),
  fixBabelImports('lodash', {
    libraryDirectory: '',
    camel2DashComponentName: false
  })
);
