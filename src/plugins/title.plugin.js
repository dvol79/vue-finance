import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$title = function(title) {
      const appName = process.env.VUE_APP_NAME
      return `${localizeFilter(title)} | ${appName}`
    }
  }
}
