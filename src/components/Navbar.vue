<template>
  <nav class="nav">
    <h2>Where in the world?</h2>
    <button @click="switchTheme">Dark Mode</button>
  </nav>
</template>

<script>
export default {
  data: () => ({
    dark: true
  }),
  methods: {
    switchTheme() {
      if (this.dark) {
        this.$store.commit('switchTheme', 'dark')
      } else {
        this.$store.commit('switchTheme', 'light')
      }
      this.dark = !this.dark
    }
  }
}
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  background-color: var(--secondary);
  padding: 10px 5vw;
  position: relative;
  box-shadow: 0 0 6px #00000038;

  @media (max-width: 400px) {
    padding: 0 2vw;
  }

  & h2 {
    flex: 1;
    font-weight: 800;
  }

  & button {
    background: none;
    font-size: 13px;
    font-weight: 600;
  }
}
</style>
