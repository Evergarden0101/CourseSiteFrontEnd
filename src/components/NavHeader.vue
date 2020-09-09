<template>
  <div class="nav-header-container" >
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">社区论坛</el-menu-item>
      <el-menu-item index="2">处理中心</el-menu-item>
      <el-menu-item index="3">处理中心</el-menu-item>
      <el-menu-item index="4">个人空间</el-menu-item>
      <el-menu-item class="logout-btn" index="/">退出登录</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
    export default {
        name: "NavHeader",
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
  .nav-header-container{

  }
  .logout-btn{
    float: right;
  }
</style>
