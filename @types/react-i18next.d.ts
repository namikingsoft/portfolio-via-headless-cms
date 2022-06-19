import 'react-i18next'
import common from '../public/locales/ja/common.json'

declare module 'react-i18next' {
  // eslint-disable-next-line no-unused-vars -- overwrite
  interface CustomTypeOptions {
    resources: {
      common: typeof common
    }
  }
}
