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
export default {
  name: 'App',
   components:{
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
html,body,#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
