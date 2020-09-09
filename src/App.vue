<template>
  <div id="app">
    <navHeader/>
    <router-view/>
  </div>
</template>

<script>
import navHeader from '@/components/NavHeader'
export default {
  name: 'App',
   components:{
       navHeader
   }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
