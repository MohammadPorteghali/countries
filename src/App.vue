<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: { 
    Navbar,
  }
}
</script>

<style lang="scss">
  // @import './assets/styles/_main.scss';
</style>
