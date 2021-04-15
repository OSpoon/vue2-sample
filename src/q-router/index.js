import link from './components/link'
import view from './components/view'

let _Vue
class VueRouter {
  constructor (options) {
    this.$options = options
    // 无嵌套路由情况
    // 做路由映射
    // this.routeMap = {}
    // this.$options.routes.forEach(route => {
    //   this.routeMap[route.path] = route
    // })
    // console.log('routeMap :>> ', this.routeMap)
    // const defLocation = window.location.hash.slice(1) || '/'
    // _Vue.util.defineReactive(this, 'current', defLocation)
    // window.addEventListener('hashchange', this.onHashChange.bind(this))

    // 嵌套路由情况
    this.current = window.location.hash.slice(1) || '/'
    _Vue.util.defineReactive(this, 'matched', [])
    this.match()
    console.log(this.matched)
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  // 递归匹配
  match (routes) {
    routes = routes || this.$options.routes
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }

  onHashChange () {
    this.current = window.location.hash.slice(1) || '/'
    this.matched = []
    this.match()
    console.log(this.matched)
    console.log('hash change :>>', this.current)
  }
}

VueRouter.install = function (vue) {
  _Vue = vue
  _Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        _Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 挂载全局组件
  _Vue.component('router-link', link)
  _Vue.component('router-view', view)
}

export default VueRouter
