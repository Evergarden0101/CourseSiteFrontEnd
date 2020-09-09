<template>
  <div class="taskhall-container">
    <div class="taskhall-left">
      <div class="tasklist-container">
        <div class="tasklist">
          <div class="task-item">
            <div>{{"视频名称"}}</div>
            <div>发布人：{{"李景熙"}}    发布时间：{{"2020.09.09"}}</div>
            <el-button class="task-enter-btn1" type="primary" plain @click="get_lecture_detail">查看课程详情</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="taskhall-right">
      <div class="notice">
        <div class="notice-title">公告</div>
        <div class="notice-body">
          <p>公告！！！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'video_list',
    data () {
      return {
        lectures: [],
      }
    },
    methods: {
      get_lecture_detail(){
        alert("成功进入课程详情界面")
      }
    }
  }
</script>

<style scoped lang='scss'>
  @import '../../assets/scss/config.scss';
  @import '../../assets/scss/mixin.scss';
  .taskhall-container{
    @include taskhall-container;
    .taskhall-left{
      float: left;
      width: 70%;
      .filter-container{
        .filter-item{
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          .filter-input{
            margin-left: 20px;
            margin-right: 20px;;
            width: 300px;
          }
        }
      }
    }
    .taskhall-right{
      float: right;
      width: 25%;
      .notice{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
        .notice-title{
          background-color: $theme-color;
          color: white;
          padding: 10px 0;
        }
        .notice-body{
          background-color: white;
          padding: 10px;
          text-align: left;
          font-size: 14px;
        }
      }
    }
  }
</style>
