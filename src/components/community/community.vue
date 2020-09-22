<template>
  <div class="community-container">
<!--    <navbar/>-->
    <el-container>
      <el-main>
        <!--      搜索栏，创建圈子按钮-->
<!--        <el-row style="margin-top: 30px">-->
<!--&lt;!&ndash;          <el-col span="8" v-if="userInfo.usertype == 'teacher'">&ndash;&gt;-->

<!--          <el-col span="8" style="float: right">-->
<!--              <el-input v-model="search_inf" style="width: 60%"></el-input>-->
<!--              <el-button type="info" plain style="margin-left: 10px;width: 30%">搜索圈子</el-button>-->
<!--          </el-col>-->
<!--        </el-row>-->
        <!--      圈子内容-->
        <el-row class="community-body">
          <el-tabs type="border-card">
            <el-tab-pane label="已加入圈子">
              <el-row>
                <el-col span="6" class="community-list" v-for="(item , index) in alreadyJoinCommunity" :key="index">
                  <div class="community-content" @click="seeCommunity(item)">
                    <el-row :gutter="5">
                      <el-col span="9" style="border-right:1px solid #C0C4CC">
                        <img src="../../assets/head.jpg"  style="height: 60px;width: 60px;border-radius: 30px">
                      </el-col>
                      <el-col offset="1" span="14">
                        <el-row style="border-bottom:1px solid #C0C4CC;height: 40%;padding-bottom: 5px;padding-top:1px">
                          {{item.name}}
                        </el-row>
                        <el-row style="height: 60%;padding-top: 5px;padding-top:1px;padding-right: 5px">
                         <font size="1">圈子简介：{{item.detail}}</font>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="所有圈子">
              <el-row>
                <el-col span="6" class="community-list" v-for="(item , index) in allCommunity" :key="index">
                  <div class="community-content" @click="seeCommunity(item)">
                    <el-row :gutter="5">
                      <el-col span="9" style="border-right:1px solid #C0C4CC">
                        <img src="../../assets/head.jpg"  style="height: 60px;width: 60px;border-radius: 30px">
                      </el-col>
                      <el-col offset="1" span="14">
                        <el-row style="border-bottom:1px solid #C0C4CC;height: 40%;padding-bottom: 5px;padding-top:1px">
                          {{item.name}}
                        </el-row>
                        <el-row style="height: 60%;padding-top: 5px;padding-top:1px;padding-right: 5px">
                          <font size="1">圈子简介：{{item.detail}}</font>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row justify="end">
          <el-col  span="8" style="float:right;margin-top: 30px;">
            <el-button v-if="this.$store.state.userInfo.usertype=='student'" type="info" plain @click="identify" style="float: inherit;width: 40%;">教师认证</el-button>
            <el-button v-if="this.$store.state.userInfo.usertype=='teacher'" type="info" plain @click="create" style="float: right;width: 40%;" >创建课程圈子</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <!--  创建课程圈子表单-->
    <el-dialog title="创建课程圈子" :visible.sync="visibleCreateButton">
      <el-form ref="curriculumForm" v-model="curriculumForm" label-width="80px">
        <el-form-item label="课程名称" >
          <el-input v-model="curriculumForm.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程简介" >
          <el-input type="textarea" :rows="7" v-model="curriculumForm.detail" maxlength="300" show-word-limit placeholder="请输入课程简介">
          </el-input>
        </el-form-item>
        <el-form-item label="社区规则">
          <el-input type="textarea" :rows="7" v-model="curriculumForm.rule" maxlength="300" show-word-limit placeholder="请输社区规则（非必填）">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="onSubmit()">创建课程</el-button>
          <el-button type="info" plain @click="visibleCreateButton = false">取消创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--  教师提交认证入口-->
    <el-dialog title="教师认证窗口" :visible.sync="visibleConfirm">
      <el-form ref="curriculumForm" v-model="curriculumForm" label-width="80px" inline="true">
        <el-row>
          <el-form-item label="教师名称" >
            <el-input v-model="teacher.name" placeholder="请输入教师名称" ></el-input>
          </el-form-item>
          <el-form-item label="教师工号" >
            <el-input v-model="teacher.id" placeholder="请输入教师工号" ></el-input>
          </el-form-item>
        </el-row>
        <el-row style="text-align: center">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="uploadPhoto" style="padding-bottom: 20px">
              <img v-if="teacher.url" :src="teacher.url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">有效证件图片，只能上传jpg/png文件</div>
            </el-upload>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="info" @click="onSubmitCon()">提交申请</el-button>
            <el-button type="info" plain @click="visibleConfirm = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import navbar from '../navbars/navbar'
    export default {
        name: "community",
        components: {
          navbar
        },
        mounted(){
            console.log(this.$store.state.userInfo)
            this.axios({
              method:'post',
              url:'/getCircles',
              headers: {'token':this.$store.state.userInfo.token}
            }).then(res=>{
                console.log(res)
                if(res.data.code == 1001){
                    this.alreadyJoinCommunity = res.data.data.teacherList,
                    this.allCommunity = res.data.data.allList
                    // this.applyingCommunity = res.data.data
                    console.log(this.allCommunity)
                }
                else{
                    this.$message({
                        type:'info',
                        message:"获取圈子信息失败"
                    })
                }
            })
            this.userInfo = this.$store.state.userInfo
            // console.log(this.$store.state)
            // console.log(this.userInfo.usertype == 'student')
        },
        data(){
            return{
                visibleCreateButton:false,
                visibleConfirm:false,
                userInfo:null,
                search_inf:'',
                alreadyJoinCommunity:[],
                //创建课程信息表单
                curriculumForm:{
                    name:'',//课程名称
                    detail:'',//课程介绍
                    rule:'',//社区规则
                },
                allCommunity:[],
                applyingCommunity:[],
                teacher:{
                    name:'',
                    userid:'',
                    url:'',
                    imageid:''
                }
            }
        },
        methods:{
            create(){
                this.visibleCreateButton = true
            },
            identify(){
                this.visibleConfirm = true
            },
            onSubmit(){
                if(this.curriculumForm.name == ''){
                    this.$message({
                        type:'info',
                        message:'请输入课程名称'
                    })
                    return
                }
                else if(this.curriculumForm.introduction == ''){
                    this.$message({
                        type:'info',
                        message:'请输入课程简介'
                    })
                    return
                }
                this.axios({
                    method:'POST',
                    url:'/createcourse',
                    headers:{'token':this.$store.state.userInfo.token},
                    data:{
                        name:this.curriculumForm.name,
                        detail:this.curriculumForm.detail,
                        rule:this.curriculumForm.rule
                    }
                }).then(res=>{
                    if(res.data.code == 1001){
                        this.$message({
                            type:"info",
                            message:"创建课程成功"
                        })
                        this.alreadyJoinCommunity = res.data.data.teacherList
                        this.visibleCreateButton = false
                        console.log(this.alreadyJoinCommunity)
                    }
                    else{
                        this.$message({
                            type:"info",
                            message:"创建课程失败"
                        })
                    }
                })
            },
            //查看具体社区圈子内容
            seeCommunity(item){
                this.$router.push({
                    name:'inCircle',
                    query:{
                        course:item
                    }
                })
            },
            onSubmitCon(){
                if(this.teacher.name == '' || this.teacher.id == '' || this.teacher.url == ""){
                    this.$message({
                        type:'info',
                        message:'请输入姓名以及工号并且上传有效照片'
                    })
                    return
                }
                this.axios({
                    method:'post',
                    headers:{'token':this.$store.state.userInfo.token},
                    url:'/applyTeacher',
                    data:{
                        imageid:this.teacher.imageid
                    }
                }).then(res => {
                    if(res.data.code == 1001){
                      this.$message({
                          type:'info',
                          message:'提交成功，等待审核'
                      })
                        this.visibleConfirm = false
                    }
                    else{
                        this.$message({
                            type:'info',
                            message:'提交失败，请重新提交'
                        })
                    }
                })
            },
            uploadPhoto(fileObj){
                console.log(fileObj.file.name)
                let formData = new FormData();
                formData.set("image",fileObj.file);
                var file = formData.getAll("image");
                this.axios.post('/imageupload',formData,{
                    headers:{
                        'token':this.$store.state.userInfo.token,
                        "Content-type":"multipart/form-data"
                    }
                }).then(res =>{
                    if(res.data.code == 1001){
                        this.teacher.url = res.data.data.url
                        this.teacher.imageid = res.data.data.id
                        console.log(this.teacher.url)
                    }
                    else{
                        this.$message({
                            type:'info',
                            message:'上传图片失败，请上传.jpg/.jpeg图片'
                        })
                    }
                    console.log(res)
                    console.log(this.teacher)
                })
            }
        }
    }
</script>

<style scoped>
.community-container{
  padding-left: 10%;
  padding-right: 10%;
  background-color: #d9ecff;
  min-width: 100px;
  min-height: 600px;
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
  height: 100px;
}
.community-content{
  /*background-color: aqua;*/
  border: 1px solid;
  padding-top: 10px;
  height: 80px;
  border-radius: 10px
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /*background-color: red;*/
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
  /*background-color: red;*/
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 196px;
  height: 180px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  /*background-color: red;*/
}
.avatar {
  width: 260px;
  height: 260px;
  display: block;
}
</style>
