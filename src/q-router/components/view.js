export default {
  // 无嵌套路由情况
  // render (h) {
  //   const { routeMap, current } = this.$router
  //   const component = routeMap[current] && routeMap[current].component
  //   return h(component)
  // }

  // 嵌套路由情况
  render (h) {
    this.$vnode.data.routerView = true
    let component = null
    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData && vnodeData.routerView) {
        depth++
      }
      parent = parent.$parent
    }
    // 获取需要渲染的component
    const route = this.$router.matched[depth]
    if (route) {
      component = route.component
    }
    return h(component)
  }
}
