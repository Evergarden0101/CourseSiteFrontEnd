<template>
  <div id="app">
<!--      <div v-if="!this.$route.name!='Login'">-->
<!--        <navHeader/>-->
<!--      </div>-->
        <router-view/>
<!--      <div v-else>-->
<!--        <navHeader/>-->
<!--        <router-view/>-->
<!--      </div>-->
  </div>
</template>

<script>
import navHeader from '@/components/NavHeader'
export default {
  name: 'App',
   components:{
       // navHeader
   },
    mounted(){
    },
    methods:{
    },
   created () {
    // this.$router.replace('/postpage')
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
