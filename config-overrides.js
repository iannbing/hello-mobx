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
  process.env.BUNDLE_VISUALIZE === 'true' && addBundleVisualizer(),
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
