<template>
  <Header-component />
  <Main-component />
</template>

<script>
import Header from './components/Header.vue'
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    'Header-component': Header,
    'Main-component': Main
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  outline: none;
  border: none;
  font-family: 'Lato';
}

body {
  &.no-scroll {
    overflow: hidden;
  }
}

.container {
  max-width: 1520px;
  margin: 0 auto;
  padding: 20px;
}
@media screen and (max-width: 450px) {
  .container {
    max-width: 360px;
    margin: 0 auto;
  }
}
</style>
