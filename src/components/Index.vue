<template>
  <div style="height: 100%">
    <nav-header></nav-header>
    <router-view></router-view>
  </div>
</template>

<script>
    import NavHeader from './NavHeader'

    export default {
        name: 'index',
        data () {
            return {
            }
        },
        components: {
            NavHeader
        }
    }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
