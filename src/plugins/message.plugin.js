import M from 'materialize-css'
import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue, options) {
    if (options) {
      console.log('Message.plugin options: ', options)
    }

    Vue.prototype.$message = function(html) {
      html = localizeFilter(html)
      M.toast({ html })
    }

    Vue.prototype.$error = function(html) {
      const er = localizeFilter('Error')
      html = localizeFilter(html)
      M.toast({ html: `[${er}]: ${html}` })
    }
  }
}
