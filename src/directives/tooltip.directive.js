import M from 'materialize-css'

export default {
  bind(el, { value, arg = 'top' }) {
    M.Tooltip.init(el, { html: value, position: arg })
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
