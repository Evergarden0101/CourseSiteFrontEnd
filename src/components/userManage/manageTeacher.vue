<template >
  <div class="manage-container">
    <el-container style="">
      <!--        管理学生界面-->
      <!--        提供课程信息-->
      <el-row></el-row>
      <el-row style="width:100%;margin-top: 50px;background-color: white;min-height: 400px">
        <!--          导航栏，审核申请-->
        <el-tabs :tab-position="tabPosition" style="padding-top: 20px">
          <el-tab-pane label="审核教师申请">
            <el-row  class="apply-head" justify="left">
              <el-col span="8">
                教师姓名/工号
              </el-col>
              <el-col span="8">
                有效证件照
              </el-col>
              <el-col span="8">
                操作选项（同意/拒绝）
              </el-col>
            </el-row>
            <el-row v-if="applicationList.length!=0" v-for="(item,index) in applicationList" key="index" class="apply-container" style="width:100%;height: 150px">
              <el-col span="8">
                {{item.username}} / {{item.userid}}
              </el-col>
              <el-col span="6" >
                  <el-image
                    style="width: 120px; height: 120px"
                    :src="item.imageurl[0]"
                    :preview-src-list="item.imageurl">
                  </el-image>
              </el-col>
              <el-col span="8">
                <el-button type="primary" @click="agreeApply(item.id)" plain>申请通过</el-button>
                <el-button type="info" @click="refuseApply(item.id)" plain>拒绝申请</el-button>
              </el-col>
            </el-row>
            <el-row v-else style="text-align: center;font-size: 30px">
              目前没有教师申请认证
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-container>

  </div>
</template>

<script>
    export default {
        name: "manageStudents",
        mounted(){
          this.axios({
              method:'post',
              url:'/getTeacherApply',
              headers:{'token':this.$store.state.userInfo.token}
          }).then(res=>{
              console.log(res)
              if(res.data.code == 1001){
                  this.applicationList = res.data.data
              }
              else{

              }
          })
        },
        data(){
            return{
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                tabPosition:"left",
                applicationList:[
                    {
                        name:'李小明',
                        id:'123123'
                    },
                    {
                        name:'张小华',
                        id:'124124'
                    },
                    {
                        name:'王小花',
                        id:'125125'
                    }],
                srcList: [
                    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                ]
            }
        },
        methods:{
           agreeApply(id){
               this.axios({
                   method: 'post',
                   url: '/dealApply',
                   headers:{'token':this.$store.state.userInfo.token},
                   data:{
                       applyid:id,
                       result: 1
                   }
               }).then(res=>{
                   if(res.data.code == 1001){
                       this.$notify({
                           type:'info',
                           message:'申请已通过',
                           duration:4500
                       })
                       var i = 0;
                       for(;this.applicationList[i].id != id && i < this.applicationList.length; ){
                           i++
                       }
                       this.applicationList.splice(i,1)
                   }
                   else{
                       this.$notify({
                           type:'info',
                           message:'申请通过失败',
                           duration:4500
                       })
                   }
               })
           },
           refuseApply(){
               this.axios({
                   method:'post',
                   url:'/dealApply',
                   headers:{'token':this.$store.state.userInfo.token},
                   data:{
                       applyid:id,
                       result:0
                   }
               }).then(res=>{
                   if(res.data.code == 1001){
                       this.$notify({
                           type:'info',
                           message:'申请已拒绝',
                           duration:4500
                       })
                       var i = 0;
                       for(;this.applicationList[i].id != id && i < this.applicationList.length; ){
                           i++
                       }
                       this.applicationList.splice(i,1)
                   }
                   else{
                       this.$notify({
                           type:'info',
                           message:'申请拒绝失败',
                           duration:4500
                       })
                   }
               })
           }
        }
    }
</script>

<style scoped>
  .manage-container{
    padding-left: 10%;
    padding-right: 10%;
    background-color: #d9ecff;
    min-width: 100px;
    min-height: 600px;
    overflow: auto;
  }
  .apply-container{
    height: 50px;
    width: 90%;
    margin-top: 10px;
    border-bottom: 1px solid #C0C4CC;
    text-align: center;
  }
  .apply-head{
    margin-bottom: 5px;
    border-bottom: 1px solid #C0C4CC;
    font-size: 20px ;
    text-align: center;
    padding-bottom: 20px;
    width: 90%;
  }
</style>
