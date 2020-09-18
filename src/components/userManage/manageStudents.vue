<template >
    <div class="manage-container">
      <el-container style="">
<!--        管理学生界面-->
<!--        提供课程信息-->
        <el-row></el-row>
        <el-card class="box-card" shadow="always" style="width:100%;margin-top: 20px;background-color: white;height: 400px">
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
                    :file-list="fileList"
                    :show-file-list="false">
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
                    prop="studentname"
                    label="学生姓名"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="studentid"
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
                    <div style="float: right">操作选项</div>
                </el-col>
              </el-row>
              <el-row v-for="item in applicationList" key="item.id" class="apply-container" style="height: 70px">
                <el-col span="8" style="text-align: center;margin-top: 22px">
                  {{item.username}}
                </el-col>
                <el-col span="8" style="text-align: center;margin-top: 22px">
                  {{item.userid}}
                </el-col>
                <el-col span="8" style="text-align: center;">
                  <el-row style="height: 20px;margin-top: 3px">
                    <div  @click="refuseApply(item.id)" style="cursor:pointer">拒绝申请</div>
                  </el-row>
                  <el-row style="height: 20px;margin-top: 10px">
                    <div  @click="confirmApply(item.id)" style="cursor:pointer">申请通过</div>
                  </el-row>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="学生管理" >
              <el-row  class="apply-head" justify="left">
                <el-col span="8">
                  学生姓名
                </el-col>
                <el-col span="8">
                  学生学号
                </el-col>
                <el-col span="8">
                  操作选项
                </el-col>
              </el-row>
              <el-row  v-for="item in alreadyInClass" key="item.id" class="apply-container" style="height: 70px">
                <el-col span="8" style="text-align: center;margin-top: 22px">
                  {{item.studentname}}
                </el-col>
                <el-col span="8" style="text-align: center;margin-top: 22px">
                  {{item.studentid}}
                </el-col>
                <el-col span="8" style="text-align: center;">
                  <el-row  style="height: 20px;margin-top: 3px">
                    <div v-if="item.type==1" @click="setAssist(item.studentid)" style="cursor:pointer">设为助教</div>
                    <div v-if="item.type==2" @click="delAssist(item.studentid)" style="cursor:pointer">取消助教</div>
                  </el-row>
                  <el-row style="height: 20px;margin-top: 10px">
                    <div v-if="item.type==1" @click="delStu(item.studentid)" style="cursor:pointer">踢出课程</div>
                    <div v-if="item.type==2"  style="cursor:pointer;color: #C0C4CC">踢出课程</div>
                  </el-row>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-container>

    </div>
</template>

<script>
    export default {
        name: "manageStudents",
        data(){
            return{
                tabPosition:"left",
                stuForm:[],
                applicationList:[],
                alreadyInClass:[],
                fileList:[],
                courseId:'',
                utype:''
            }
        },
        mounted(){
            this.courseId = window.localStorage.courseid
            console.log(this.$store.state.userInfo.usertype == 'teacher' )
            this.utype = this.$store.state.userInfo.usertype
            // console.log(window.localStorage.courseid)
           console.log(this.courseId)
           this.axios({
               method:'post',
               url:'getAllRelations',
               headers:{'token':this.$store.state.userInfo.token},
               data:{
                   cid:this.courseId
               }
           }).then(res => {
               if(res.data.code == 1001){
                   this.alreadyInClass = res.data.data
                   console.log(this.alreadyInClass)
               }
           })
            this.axios({
                method:'post',
                url:'/getCourseApply',
                headers:{'token':this.$store.state.userInfo.token},
                data:{
                    courseid:this.courseId
                }
            }).then(res => {
                if(res.data.code == 1001){
                    this.applicationList = res.data.data
                    console.log(this.alreadyInClass)
                }
            })
        },
        methods:{
          submitForm(fileObj){
              console.log(fileObj)
              let formData = new FormData();
              formData.set("file",fileObj.file);
              formData.set("courseid",this.courseId)
              var file = formData.getAll("file");
              console.log(formData)
              this.axios.post("/addMoreStudent",
                  formData,{
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
                  // alert("inin222")
                  console.log(res)
                  if(res.data.code == 1001){
                      this.$message({
                          type:'info',
                          message:'上传成功'
                      })
                      this.stuForm = res.data.data
                      this.axios({
                          method:'post',
                          url:'getAllRelations',
                          headers:{'token':this.$store.state.userInfo.token},
                          data:{
                              cid:this.courseId
                          }
                      }).then(res => {
                          if(res.data.code == 1001){
                              this.alreadyInClass = res.data.data
                              // console.log(this.alreadyInClass)
                          }
                      })
                  }
                  else{
                      this.$message({
                          type:'info',
                          message:"上传失败，只允许上传.xlxs文件"
                      })
                  }
              })

              // alert("inin222")
          },
           confirmApply(id){
              if(this.utype != 'teacher'){
                  this.$message({
                      type:'warning',
                      info:'只要老师有操作助教的权限'
                  })
                  return
              }
              // alert(1112)
              this.axios({
                  method:'post',
                  url:'/dealApply',
                  data:{
                      applyid:id,
                      result:1
                  },
                  headers:{'token':this.$store.state.userInfo.token}
              }).then(res=>{
                  console.log(res)
                  if(res.data.code == 1001){
                      // alert(1212)
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
                      // console.log(this.applicationList)
                      this.axios({
                          method:'post',
                          url:'getAllRelations',
                          headers:{'token':this.$store.state.userInfo.token},
                          data:{
                              cid:this.courseId
                          }
                      }).then(res => {
                          if(res.data.code == 1001){
                              this.alreadyInClass = res.data.data
                              console.log(this.alreadyInClass)
                          }
                      })
                  }
                  else{
                      this.$notify({
                          type:'info',
                          message:'申请通过失败',
                          duration
                      })
                  }
              })
           },
            refuseApply(id){
              // alert(111)
                if(this.utype != 'teacher'){
                    this.$message({
                        type:'warning',
                        info:'只要老师有操作助教的权限'
                    })
                    return
                }
                this.axios({
                    method:'post',
                    url:'/dealApply',
                    data:{
                        applyid:id,
                        result:0
                    },
                    headers:{'token':this.$store.state.userInfo.token}
                }).then(res=>{
                    if(res.data.code == 1001){
                        alert(1212)
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
                        this.alreadyInClass = res.data.data
                    }
                    else{
                        this.$notify({
                            type:'info',
                            message:'申请拒绝失败',
                            duration
                        })
                    }
                })
            },
            //添加助教
            setAssist(id){
              this.axios({
                  method:'post',
                  url:'/addAssistant',
                  headers:{'token':this.$store.state.userInfo.token},
                  data:{
                      studentid:id,
                      courseid:this.courseId
                  }
              }).then(res=>{
                  if(res.data.code == 1001){
                      this.$notify({
                          type:'info',
                          message:'助教设置成功',
                          duration:4500
                      })
                      this.alreadyInClass = res.data.data
                  }
                  else{
                      this.$notify({
                          type:'info',
                          message:'助教设置失败',
                          duration:4500
                      })
                  }
              })
            },
            delAssist(id){
                this.axios({
                    method:'post',
                    url:'/deleteAssistant',
                    headers:{'token':this.$store.state.userInfo.token},
                    data:{
                        studentid:id,
                        courseid:this.courseId
                    }
                }).then(res=>{
                    if(res.data.code == 1001){
                        this.$notify({
                            type:'info',
                            message:'助教已取消',
                            duration:4500
                        })
                        this.alreadyInClass = res.data.data
                    }
                    else{
                        this.$notify({
                            type:'info',
                            message:'助教取消失败',
                            duration:4500
                        })
                    }
                })
            },
        //    将学生踢出课程
            delStu(id){
              this.axios({
                  method:'post',
                  url:'/deleteStudent',
                  headers:{'token':this.$store.state.userInfo.token},
                  data:{
                      studentid:id,
                      courseid:this.courseId
                  }
              }).then(res=>{
                  if(res.data.code == 1001){
                      this.$notify({
                          type:'info',
                          message:'学生已从课程中移除',
                          duration:4500
                      })
                      this.alreadyInClass = res.data.data
                  }
                  else{
                      this.$notify({
                          type:'info',
                          message:'学生移除失败',
                          duration:4500
                      })
                  }
              })
            },
        }
    }
</script>

<style scoped>
.manage-container{
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
