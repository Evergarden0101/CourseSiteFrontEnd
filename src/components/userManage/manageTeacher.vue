<template >
  <div class="manage-container">
    <el-container style="">
      <!--        管理学生界面-->
      <!--        提供课程信息-->
      <el-row></el-row>
      <el-row style="width:100%;margin-top: 50px;background-color: white;height: 400px">
        <!--          导航栏，审核申请-->
        <el-tabs :tab-position="tabPosition" style="padding-top: 20px">
          <el-tab-pane label="审核教师申请">
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
            <el-row v-if="applicationList.length!=0" v-for="(item,index) in applicationList" key="index" class="apply-container">
              <el-col span="8">
                {{item.name}}
              </el-col>
              <el-col span="8">
                {{item.id}}
              </el-col>
              <el-col span="8">
                <el-button type="primary" plain>申请通过</el-button>
                <el-button type="info" plain>拒绝申请</el-button>
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
        data(){
            return{
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
                            message:"上传失败，只允许上次.xlxs文件"
                        })
                    }
                })
                alert("inin222")
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
