let _Vue

class Store {
  constructor (options) {
    // 将state响应化
    this._vm = new _Vue({
      data: {
        $$state: options.state
      }
    })
    this._mutations = options.mutations
    this._actions = options.actions

    // 组件嵌套导致this混乱
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state () {
    return this._vm._data.$$state
  }

  // type: mutations name
  commit (type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.error('unkown mutation type')
    } else {
      entry(this.state, payload)
    }
  }

  // type: actions name
  dispatch (type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('unkown action type')
    } else {
      entry(this, payload)
    }
  }
}

function install (vue) {
  _Vue = vue
  _Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        _Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install }
