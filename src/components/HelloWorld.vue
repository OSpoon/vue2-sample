<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>count : {{$store.state.count}}</h3>
    <h3>double count : {{$store.getters.doubleCounter}}</h3>
    <div>
      <button @click="increment">increment</button>
    </div>
    <br>
    <div>
      <button @click="asyncincrement">async increment</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    increment () {
      // 触发mutations中的increment
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    },
    asyncincrement () {
      // 触发actions中的increment
      this.$store.dispatch('increment')
      console.log(this.$store.state.count)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
