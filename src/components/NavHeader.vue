<template>
  <div class="nav-header-container" >
    <el-menu :default-active="this.$route.path"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             active-text-color="#ffd04b"
             router
    >
      <el-menu-item index="/community" style="font-size: 23px">社区论坛</el-menu-item>
<!--      <el-menu-item index="/hello" style="font-size: 1.2em">处理中心</el-menu-item>-->
<!--      <el-menu-item index="/inCircle" style="font-size: 1.7em">处理中心</el-menu-item>-->
      <el-menu-item index="/manageTea" style="font-size: 23px" v-if="this.$store.state.userInfo.usertype == 'admin'">审核教师申请</el-menu-item>
      <el-menu-item class="logout-btn" index="/" style="font-size: 23px">退出登录</el-menu-item>
      <el-menu-item  style="font-size: 23px;float: right;font-size:20px" >{{this.$store.state.userInfo.username}}</el-menu-item>
        <el-menu-item  index="/information">
            <i class="el-icon-message" ><el-badge v-if="this.$store.state.messageNum != 0" :value=this.$store.state.messageNum class="item" ></el-badge></i>
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
                search_inf:'',
                infNum:0
            };
        },
        mounted(){
            // console.log("abc")
            // console.log(this.$store.state.messageNum)
            // console.log("bcd")
          this.axios({
              method: 'post',
              url:'/getmessagenum',
              headers:{'token':this.$store.state.userInfo.token},
          }).then(res=>{
                if(res.data.code == 1001){
                    this.infNum = res.data.data
                    this.$store.commit('setMessageNum',res.data.data)
                }
                else{
                    this.$store.commit('setMessageNum',0)
                }
          })
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
