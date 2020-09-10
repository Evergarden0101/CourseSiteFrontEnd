<template>
  <div class="container">
    <div class="white-board">
      <h2 style="font-size:20px">{{lecture.name}}</h2>
      <br>
      <p style="font-size:15px">课程创建者：{{lecture.creator}}</p>
      <br>
      <p style="font-size:15px">创建时间：{{lecture.date}}</p>
      <el-divider></el-divider>
      <div class="videolist" v-for="item in videos">
        <div class="videoimage">
          <img src="../../assets/logo.png">
        </div>
        <div class="videoinfo">
          <p>{{item.name}}</p>
          <p>上传时间：{{item.date}}</p>
          <p>视频时长：{{item.duration}}</p>
        </div>
        <div class="button">
          <ul>
            <li><i class="el-icon-video-play"></i></li>
          </ul>
        </div>
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
          name: '课程名称',
          creator: '李景熙',
          date: '2020.09.10',
        },
        notices:[
          {notice: '公告1：该课程截止时间为2020.09.31，请同学尽快添加课程'},
          {notice: '公告2：作业2已发布，请同学尽快完成提交'}
        ],
        videos:[
          {
            name: '视频名称',
            date: '2020.09.10',
            duration: '01:27:33',
          },
          {
            name: '视频名称',
            date: '2020.09.10',
            duration: '01:27:33',
          },
        ],
      }
    },
  }
</script>

<style lang="scss">
  .container{
    padding: 40px 10% 100px 10%;
    min-width: 100px;
    min-height: 600px;
    overflow:hidden;
    background-color: #d9ecff;
    .white-board{
      float:left;
      width: 70%;
      background-color:white;
      box-shadow: 10px 10px 12px 0 rgba(0, 0, 0, 0.1);//阴影
      text-align: left;
      padding: 30px 20px 30px 20px;
      .videolist{
        display: flex;
        .videoimage{
          width: 20%;
          img{
            width: 70px;
            height: 70px;
          }
        }
        .videoinfo{
          width: 20%;
          text-align: left;
          box-sizing: border-box;
          margin: auto;
          font-size:15px;
        }
        .button{
          float: right;
          margin: auto;
        }
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
    font-size: 200%;
  }
</style>
