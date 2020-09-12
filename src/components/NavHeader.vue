<template>
  <div class="nav-header-container" >
    <el-menu :default-active="this.$route.path"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             active-text-color="#ffd04b"
             router
    >
      <el-menu-item index="/community" style="font-size: 1.5em">社区论坛</el-menu-item>
      <el-menu-item index="/hello" style="font-size: 1.2em">处理中心</el-menu-item>
      <el-menu-item index="/inCircle" style="font-size: 1.7em">处理中心</el-menu-item>
      <el-menu-item index="/userHome" style="font-size: 2em" >个人空间</el-menu-item>
      <el-menu-item class="logout-btn" index="/" style="font-size: 1em">退出登录</el-menu-item>
<!--      别删嗷，删了我生气了>_<by 江一帆-->
      <el-menu-item class="logout-btn">
        <el-input v-model="search_inf" style="width: 80%;" placeholder="搜索圈子" ></el-input>
      </el-menu-item>
    </el-menu>
  </div>
</template>
const index = new Set(['/community'])
<script>
    export default {
        name: "NavHeader",
        data() {
            return {
                activeIndex: '1',
                search_inf:''
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
    background-color: #606266;
    font-family: KaiTi;
    font-size: 1em;
    font-weight: bold;
  }
  .logout-btn{
    float: right;
  }
</style>
