<template>
  <div class="container">
    <div class="white-board">
      <h2 style="font-size:20px">{{lecture.name}}</h2>
      <br>
      <p style="font-size:15px">课程简介：{{lecture.detail}}</p>
      <br>
      <p style="font-size:15px">创建时间：{{lecture.date}}</p>
      <el-divider></el-divider>
      <div class="videolist" v-for="(item,i) in videos">
<!--        <div class="videoimage">-->
<!--          <img src="../../assets/logo.png">-->
<!--        </div>-->
        <div class="videoinfo">
          <h3>{{item.name}}</h3>
          <br>
          <p>上传时间：{{item.time}}</p>
          <br>
        </div>
        <div class="button">
          <ul>
            <li>
              <i class="el-icon-video-play"  @click="play_the_video(i)"></i>
              <i class="el-icon-delete" @click="delete_the_video(i)"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="upload-container" v-if="this.$store.state.userInfo.usertype == 'teacher'">
        <el-upload
          class="upload-demo"
          ref="upload"
          :limit="20"
          :action="action"
          drag
          :accept="'.mp4'"
          :before-upload="before_upload"
          :http-request="upload"
          :auto-upload="true"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将想要上传的视频拖拽至此处或<em>点击上传</em></div>
          <h5>注意：只能上传mp4文件且文件最大1Gb</h5>
        </el-upload>
      </div>
      <el-progress :stroke-width="10" :percentage="progressPercent" v-if="progressFlag==true"></el-progress>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'videolist2',
    data() {
      return {
        progressFlag: false,
        progressPercent: 0,
        lecture: {
          id: '',
          name: '',
          detail: '',
          date: '',
        },
        notices: [
          {notice: '公告1：该课程截止时间为2020.09.31，请同学尽快添加课程'},
          {notice: '公告2：作业2已发布，请同学尽快完成提交'}
        ],
        videos: [],
      }
    },
    beforeMount() {
      this.lecture.id = window.localStorage.getItem('courseid')
      this.lecture.date = window.localStorage.getItem('coursetime')
      this.lecture.detail = window.localStorage.getItem('coursedetail')
      this.lecture.name = window.localStorage.getItem('coursename')
      this.axios({
        method: 'post',
        url: '/getvideos',
        data: {
          courseid: this.lecture.id,
        },
        headers: {
          'token': this.$store.state.userInfo.token,
        }
      }).then(res => {
        if (res.data.code == 1001) {
          this.videos = res.data.data
        } else {
        }
      })
    },
    methods: {
      delete_the_video(i) {
        this.axios({
          method: 'post',
          url: '/deletevideo',
          data: {
            'id': this.videos[i].id,
          },
          headers: {
            'token': this.$store.state.userInfo.token,
          }
        }).then(res => {
          if (res.data.code == 1001) {
            alert("删除成功")
          } else {
            alert("删除失败")
          }
        })
        setTimeout(() => {
          location.reload()
        }, 1000)
      },
      play_the_video(i) {
        window.localStorage.setItem('videoid', this.videos[i].id)
        this.$router.push({
          name: 'player',
        })
      },
      before_upload(file) {
        const isOverSize = file.size / 1024 / 1024 / 1024 < 1;
        if (!isOverSize) {
          alert("文件大小超过1Gb.拒绝上传")
        }
      },
      upload(File){
        const fileend = File.file.name.substring(File.file.name.lastIndexOf("."));
        if(fileend != ".mp4"){
          alert("文件类型不符合规定，请重新选择文件")
          location.reload()
        }
        else{
          this.progressFlag=true;
          this.progressPercent = 0;
          let formData = new FormData();
          formData.append("video", File.file);
          formData.append("courseid", this.lecture.id);
          this.uploadcallback(formData, (res)=>{
            let loaded = res.loaded,
              total = res.total;
            this.$nextTick(()=>{
              this.progressPercent = (loaded/total)*100
            })
          }, (res)=>{
            if(res.code == 1001){
              this.progressFlag=false;
              location.reload()
            }
          })
        }
      },
      uploadcallback(file, callback1, callback2){
        this.axios({
          url:"/fileupload",
          data: file,
          method: 'post',
          headers: {
            "token": this.$store.state.userInfo.token,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: function (e){
            if(e.lengthComputable){
              callback1(e)
            }
          }
        }).then(res =>{
          callback2(res.data);
        }).then(error =>{
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss">
  .container{
    padding: 50px 10% 100px 5%;
    min-width: 100px;
    min-height: 600px;
    overflow:auto;//内容的显示模式（如果超出框，则显示滚轮）
    background-color: #d9ecff;
    .white-board{
      border-radius:4px;
      float:left;
      width: 100%;
      background-color:white;
      box-shadow: 10px 10px 12px 0 rgba(0, 0, 0, 0.1);//阴影
      text-align: left;
      padding: 30px 20px 30px 20px;
      .videolist{
        display: flex;
        border-bottom: 1px solid #DCDFE6;
        .videoinfo{
          margin:12px;
          width: 80%;
          text-align: left;
          font-size:15px;
        }
        .button{
          float: right;
          margin:auto;
        }
      }
      .upload-container{
        display:flex;
        justify-content:center;//这两行强迫子元素居中
        margin: 30px 20px 20px 20px;
      }
    }
    .notice{
      float:right;
      width:25%;
      box-shadow: 10px 10px 12px 0 rgba(0, 0, 0, 0.1);//阴影
      .notice-title{
        background-color: #409EFF;
        color: white;
        text-align: center;
        font-size: 20px;
      }
      .notice-body{
        background-color: white;
        color: black;
        padding: 10px;
        text-align: left;
        font-size: 15px;
      }
    }
  }
  ul{
    font-size: 250%;
  }
</style>
