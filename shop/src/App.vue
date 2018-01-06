<template>
  <div id="app">
    <router-view transition="bounce"/>
  </div>
</template>

<script>
import 'animate.css/animate.min.css'

export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import './assets/css/app.scss';
</style>
