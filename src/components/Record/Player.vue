<template>
  <div class="container">
    <div >
      <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsline="true" :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @ready="playerReadied">

      </video-player>
    </div>
    <div class="white-board">
      <div class="header">
        <h2>视频列表:</h2>
        <br>
      </div>
      <div class="videolist" v-for="(item,i) in videos">
          <!--        <div class="videoimage">-->
          <!--          <img src="../../assets/logo.png">-->
          <!--        </div>-->

        <p :class="{container1: !isShow[i],container2: isShow[i]}" >
          <el-button type="text"@click="play_the_video(i)"><h3>{{item.name}}</h3></el-button>
          <br>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Player',
    data () {
      return {
        beginTime:'',
        endTime:'',
        timber:'',
        paused: true,
        learningDuration: {
          id: '',
          userId: '',
          type: '0',
          examinationId: '',
          finishFlag: '0',
          durations: '2',
        },
        isShow:[],
        lecture:{
          id:'',
          name:'',
          detail:'',
          date:'',
        },
        videos:[],
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
          autoplay: false, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            type: "video/ogg",
            type:"video/webm",
            src: '' // url地址
          }],
          //poster: 'http://39.106.117.192:8080/static/indexImg.png', // 你的封面地址
          width: document.documentElement.clientWidth, // 播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true // 全屏按钮
          }
        }
      }
    },
    beforeMount(){
      this.lecture.id = window.localStorage.getItem('courseid')
      this.lecture.date = window.localStorage.getItem('coursetime')
      this.lecture.detail = window.localStorage.getItem('coursedetail')
      this.lecture.name = window.localStorage.getItem('coursename')
      this.axios({
        method: 'post',
        url: '/getvideos',
        data:{
          courseid: this.lecture.id,
        },
        headers:{
          'token':this.$store.state.userInfo.token,
        }
      }).then(res =>{
        if(res.data.code == 1001){
          this.videos = res.data.data
          for(var i=0;i<this.videos.length;i++){
            if(this.videos[i].id==window.localStorage.getItem('videoid')){
              this.isShow[i]=true
            }
            else{
              this.isShow[i]=false
            }
          }
        }
        else{
        }
      })
    },
    mounted(){
      this.submit()
      this.putLearningObj()
      this.timer = setInterval(this.putLearningObj, 3000)
      this.destroyed()
    },
    methods: {
      play_the_video(i) {
        window.localStorage.setItem('videoid', this.videos[i].id)
        location.reload();
      },
      submit() {
        let id = window.localStorage.getItem('videoid')
        this.playerOptions.sources[0].src = 'http://49.234.83.79:8080/api/getvideostream?id=' + id
      },
      putLearningObj() {
        if (!this.paused) {
          this.axios({
            method: 'post',
            url: '/giveWatchTime',
            data:{
              courseid: this.lecture.id,
              id: window.localStorage.getItem('videoid'),
              WatchTime: this.learningDuration.durations
            },
            headers:{
              'token':this.$store.state.userInfo.token,
            }
          }).then(res =>{
          })
        }
      },
      onPlayerPlay (player) {
        var moment = require('moment');
        this.paused = false
        this.beginTime = moment(new Date());
      },
      onPlayerPause (player) {
        var moment = require('moment');
        this.paused = true
        this.endTime= moment(new Date());
        this.axios({
          method: 'post',
          url: '/giveStudyTime',
          data:{
            courseid: this.lecture.id,
            id: window.localStorage.getItem('videoid'),
            StudyTime: this.endTime.diff(this.beginTime,'second'),
          },
          headers:{
            'token':this.$store.state.userInfo.token,
          }
        }).then(res =>{
        })
      },
      onPlayerEnded (player) {
        this.paused = false
      },
      onPlayerTimeupdate (player) {
        this.learningDuration.durations = player.cache_.currentTime
        // console.log(' onPlayerTimeupdate!', player)
      },
      getbeginTime(){
        setInterval(()=>{
          //new Date() new一个data对象，当前日期和时间
          //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
          this.beginTime = new Date().toLocaleString();
        },1000)
      },
      getendTime(){
        setInterval(()=>{
          //new Date() new一个data对象，当前日期和时间
          //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
          this.endTime= new Date().toLocaleString();
        },1000)
      },
      playerReadied(player) {
        this.axios({
          method: 'post',
          url: '/getWatchTime',
          data:{
            courseid: this.lecture.id,
            id: window.localStorage.getItem('id'),
          },
          headers:{
            'token':this.$store.state.userInfo.token,
          }
        }).then(res =>{
          player.currentTime=res.data.date
        }).catch(() => {
          alert('获取进度失败')
      })
    },
      destroyed() {
        // 如果定时器在运行则关闭
        if (this.timer) {
          clearInterval(this.timer)
        }
      }
    }
  }
</script>

<style lang="scss"scoped>
  .el-button{
    color: black;
  }
  .container{
    padding: 100px 5% 10px 5%;
    min-width: 100px;
    min-height: 600px;
    overflow:auto;//内容的显示模式（如果超出框，则显示滚轮）
    background-color: #d9ecff;
    .video-js .vjs-icon-placeholder {
      width: 80%;
      height: 80%;
      display: block;
    }
    .video-player {
      width: 70%;
      height: 80%;
      float:left;
    }
    .white-board{
      overflow:auto;//内容的显示模式（如果超出框，则显示滚轮）
      width: 25%;
      max-height: 480px;
      float:right;
      min-width: 100px;
      background-color: white;
      box-shadow: 10px 10px 12px 0 rgba(0, 0, 0, 0.1);//阴影
      text-align: left;
      padding: 30px 20px 30px 20px;
      border-radius: 20px;
      .header{
        border-bottom: 1px solid #DCDFE6;
      }
      .videolist {
        border-bottom: 1px solid #DCDFE6;
        .container1{
          width: 100%;
          text-align: left;
          font-size: 15px;
          background-color: white;
        }
        .container2{
          width: 100%;
          text-align: left;
          font-size: 15px;
          background-color: whitesmoke;
        }
      }
    }
  }
</style>


