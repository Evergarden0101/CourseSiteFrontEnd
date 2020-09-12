<template>
  <div class="container">
    <div class="white-board">
      <h2 style="font-size:20px">{{lecture.name}}</h2>
      <br>
      <p style="font-size:15px">课程创建者：{{lecture.creator}}</p>
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
          <p>视频简介：{{item.detail}}</p>
          <br>
        </div>
        <div class="button">
          <ul>
            <li>
              <i class="el-icon-video-play"  @click="play_the_video()"></i>
              <i class="el-icon-delete" @click="delete_the_video(i)"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="upload-container">
        <el-upload
          class="upload-demo"
          action="https://localhost/8080/"
          drag
          accept=".mp4, .txt"
          :auto-upload="true"
          :before-upload="before_upload"
          :http-request="upload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将想要上传的视频拖拽至此处或<em>点击上传</em></div>
          <h5>注意：只能上传mp4文件</h5>
        </el-upload>
      </div>
    </div>
    <div class="notice">
      <div class="notice-title">公告栏</div>
      <div class="notice-body" v-for="item in notices">
        <p>{{item.notice}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'videolist2',
    data(){
      return{
        lecture:{
          id: '111',
          name: '课程名称',
          creator: '李景熙',
          date: '2020.09.10',
        },
        notices:[
          {notice: '公告1：该课程截止时间为2020.09.31，请同学尽快添加课程'},
          {notice: '公告2：作业2已发布，请同学尽快完成提交'}
        ],
        videos:[],
      }
    },
    beforeMount(){
      this.axios({
        method: 'post',
        url: '/getvideos',
        data:{
          courseid: '111',
        },
        headers:{
          'token':this.$store.state.userInfo.token,
        }
      }).then(res =>{
        if(res.data.code == 1001){
          this.videos = res.data.data
        }
        else{
        }
      })
    },
    methods: {
      delete_the_video(i){
        this.axios({
          method: 'post',
          url: '/deletevideo',
          data:{
            'id': this.videos[i].id,
          },
          headers:{
            'token':this.$store.state.userInfo.token,
          }
        }).then(res =>{
          if(res.data.code == 1001){
            alert("删除成功")
          }
          else{
            alert("删除失败")
          }
        })
        setTimeout(()=>{
          location.reload()
        }, 1000)
      },
      play_the_video(){
        alert("播放成功！！！！")
      },
      before_upload(file){
        const isOverSize = file.size/1024/1024 < 100
        if(isOverSize){
        }
        else{
          alert("文件大小超过100Mb，不能上传.")
        }
      },
      upload(File){
        let formData = new FormData();
        formData.append("video", File.file);
        formData.append("courseid", this.lecture.id);
        this.axios.post("/fileupload",formData,{
          headers:{
            "Content-type":"multipart/form-data",
            "token":this.$store.state.userInfo.token,
          }
        }).then(res=>{
          if(res.data.code == 1001){
            alert("文件上传成功")
          }
          else{
            alert("文件上传失败，请按照规定格式重新上传");
          }
        })
        setTimeout(()=>{
          location.reload()
        }, 1000)
      }
    }
  }
</script>

<style lang="scss">
  .container{
    padding: 40px 10% 100px 10%;
    min-width: 100px;
    min-height: 600px;
    overflow:auto;//内容的显示模式（如果超出框，则显示滚轮）
    background-color: #d9ecff;
    .white-board{
      border-radius:25px;
      float:left;
      width: 70%;
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
