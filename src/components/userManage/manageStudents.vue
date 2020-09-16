<template >
    <div class="manage-container">
      <el-container style="">
<!--        管理学生界面-->
<!--        提供课程信息-->
        <el-row></el-row>
        <el-row style="width:100%;margin-top: 50px;background-color: white;height: 400px">
<!--          导航栏，审核申请-->
          <el-tabs :tab-position="tabPosition" style="padding-top: 20px">
            <el-tab-pane label="导入学生">
<!--              上传文件接口-->
              <el-row>
                <el-col offset="16" span="8">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :http-request="submitForm"
                    :file-list="fileList">
                    <el-button size="small" type="primary">导入学生</el-button>
                  </el-upload>
                </el-col>
              </el-row>
<!--              显示学生表格-->
              <el-row>
                <el-table
                  :data="stuForm"
                  stripe
                  style="width: 100%;height:100%">
                  <el-table-column
                    prop="name"
                    label="学生姓名"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="id"
                    label="学号">
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="审核申请">
              <el-row  class="apply-head" justify="left">
                <el-col span="8">
                  学生姓名
                </el-col>
                <el-col span="8">
                  学生学号
                </el-col>
                <el-col span="8">
                    操作选项（同意/拒绝）
                </el-col>
              </el-row>
              <el-row v-for="item in applicationList" key="index.id" class="apply-container">
                <el-col span="8" style="text-align: center;margin-top: 10px">
                  {{item.name}}
                </el-col>
                <el-col span="8" style="text-align: center;margin-top: 10px">
                  {{item.id}}
                </el-col>
                <el-col span="8">
                  <el-button type="primary" @click="confirmApply(item.id)" plain>申请通过</el-button>
                  <el-button type="info" @click="refuseApply(item.id)" plain>拒绝申请</el-button>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="学生管理">
<!--              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
<!--              <div style="margin: 15px 0;"></div>-->
<!--              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
<!--                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>-->
<!--              </el-checkbox-group>-->
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-container>

    </div>
</template>

<script>
    export default {
        name: "manageStudents",
        data(){
            return{
                tabPosition:"left",
                stuForm:[
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
                fileList:[]
            }
        },
        methods:{
          submitForm(fileObj){
              console.log(fileObj)
              let formData = new FormData();
              formData.set("image",fileObj.file);
              var file = formData.getAll("image");
              console.log(formData)
              alert("inin")
              this.axios.post("/imageupload",formData,{
                  // method:'post',
                  // url:'/imageupload',
                  headers:{
                      'token':this.$store.state.userInfo.token,
                      "Content-type":"multipart/form-data"
                  },
                  // data:{
                  //     image:formData
                  // }
              }).then(res=>{
                  alert("inin222")
                  console.log(res)
                  if(res.data.code == 1001){
                      this.$message({
                          type:'info',
                          message:'上传成功'
                      })
                      this.stuForm = res.data.stuForm
                  }
                  else{
                      this.$message({
                          type:'info',
                          message:"上传失败，只允许上传.xlxs文件"
                      })
                  }
              })
              alert("inin222")
          },
           confirmApply(id){

              this.axios({
                  method:'post',
                  url:'/addApply',
                  data:{
                      id:id
                  }
              }).then(res=>{
                  if(res.code == 1001){
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
                          duration
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
