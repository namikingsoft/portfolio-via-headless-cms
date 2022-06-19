const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  // Fix for SWC Failed to Load
  // https://nextjs.org/docs/messages/failed-loading-swc
  // https://stackoverflow.com/questions/69816589/next-failed-to-load-swc-binary/69820670#69820670
  swcMinify: false,
}
