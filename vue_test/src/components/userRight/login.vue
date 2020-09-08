<template>
  <el-container>
    <el-header>
      <el-input v-model="input" placeholder="用户名" v-model="userName"></el-input>
      <el-input v-model="input" placeholder="密码" v-model="code"></el-input>
    </el-header>
  </el-container>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
              userName : "jyf",
              code : 1111
            }
        }
    }
</script>

<style scoped>

</style>
