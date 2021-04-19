<template>
  <div>
    <navbar />
    <countries-list />
  </div>
</template>

<script>
import CountriesList from '../components/CountriesList.vue'
import Navbar from '../components/Navbar.vue'

export default {
  components: { 
    Navbar,
    CountriesList,
  },
  
}
</script>

<style scoped lang="scss">
  
</style>
