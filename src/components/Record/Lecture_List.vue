<template>
  <div class="container">
    <div class="white-board2">
      <div class="videolist" v-for="item in lectures">
        <!--        <div class="videoimage">-->
        <!--          <img src="../../assets/logo.png">-->
        <!--        </div>-->
        <div class="videoinfo">
          <h3>{{item.name}}</h3>
          <br>
          <p>上传时间：{{item.date}}</p>
          <br>
          <p>视频数量：{{item.number}}</p>
          <br>
        </div>
        <div class="button">
          <el-button type="primary" size="big" @click="enter_lecture()">进入课程</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'lecturelist',
    data(){
      return{
        lectures:[
          {
            name: '课程1',
            date:'2020.09.11',
            number:'20'
          }
        ]
      }
    },
    methods:{
      enter_lecture(){
        this.$router.push({path:'/videolist2'})
      }
    }
  }
</script>

<style lang="scss">
  .container {
    padding: 40px 10% 100px 10%;
    min-width: 100px;
    min-height: 600px;
    overflow: auto; //内容的显示模式（如果超出框，则显示滚轮）
    background-color: #d9ecff;
    .white-board2 {
      border-radius: 25px;
      float: left;
      width: 100%;
      background-color: white;
      box-shadow: 10px 10px 12px 0 rgba(0, 0, 0, 0.1); //阴影
      text-align: left;
      padding: 30px 20px 30px 20px;
      .videolist {
        display: flex;
        border-bottom: 1px solid #DCDFE6;
        .videoinfo {
          margin: 12px;
          width: 80%;
          text-align: left;
          font-size: 15px;
        }
        .button {
          float: right;
          margin: auto;
        }
      }
    }
  }
</style>
