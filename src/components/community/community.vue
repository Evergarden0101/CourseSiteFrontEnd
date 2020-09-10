<template>
  <div class="community-container">
    <el-container>
      <el-main>
        <!--      搜索栏，创建圈子按钮-->
        <el-row style="margin-top: 30px">
          <el-col span="8" v-if="userInfo.usertype == 'teacher'">
            <el-button type="info" >创建课程圈子</el-button>
          </el-col>
          <el-col span="8" style="float: right">
              <el-input v-model="search_inf" style="width: 60%"></el-input>
              <el-button type="info" plain style="margin-left: 10px;width: 30%">搜索圈子</el-button>
          </el-col>
        </el-row>
        <!--      圈子内容-->
        <el-row class="community-body">
          <el-tabs type="border-card">
            <el-tab-pane label="已加入圈子">
              <el-row>
                <el-col span="6" class="community-list" v-for="(item , index) in alreadyJoinCommunity" :key="index">
                  <div class="community-content">
                    <el-row :gutter="5">
                      <el-col span="9" style="border-right:1px solid #C0C4CC">
                        <img src="../../assets/head.jpg"  style="height: 60px;width: 60px;border-radius: 30px">
                      </el-col>
                      <el-col offset="1" span="14">
                        <el-row style="border-bottom:1px solid #C0C4CC;height: 40%;padding-bottom: 5px;padding-top:1px">
                          {{item.name}}
                        </el-row>
                        <el-row style="height: 60%;padding-top: 5px;padding-top:1px">
                         <font size="1">圈子简介：{{item.introduce}}</font>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="已申请圈子">

            </el-tab-pane>
            <el-tab-pane label="所有圈子">

            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "community",
        mounted(){
            this.userInfo = this.$store.state.userInfo
            console.log(this.$store.state)
            console.log(this.userInfo.usertype == 'student')
        },
        data(){
            return{
                userInfo:null,
                search_inf:'',
                alreadyJoinCommunity:[
                {
                    name:'jyf',
                    introduce:"this is a house"
                },
                {
                    name:'lyf',
                    introduce:"this is a home"
                },
                {
                    name:'cly',
                    introduce:"faaaaaaafa"
                },
                {

                },
                {
                    name:"cyk",
                    introduce:"play lol"
                },
                {
                    name:"yzl",
                    introduce:"ctrl"
                }],

                allCommunity:[],
                applyingCommunity:[]
            }
        }
    }
</script>

<style scoped>
.community-container{
  padding-left: 10%;
  padding-right: 10%;
  /*background-color: aqua;*/
}
.community-body{
  margin-top: 30px;
}
.el-tabs_item.is-active{
  background-color:#545c64;
  text-color:#fff;
  active-text-color:#ffd04b;
}
.community-list{
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  /*background-color: red;*/
  height: 70px;
}
.community-content{
  /*background-color: aqua;*/
  border: 1px solid;
  padding-top: 10px;
  height: 70px;
  border-radius: 30px
}

</style>
