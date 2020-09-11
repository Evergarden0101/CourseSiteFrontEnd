<template>
  <div>
<el-container>
  <el-header>
    <div align="left">
      <el-button  type="info" icon="el-icon-arrow-left" > 返回</el-button>
    <el-tag type="info">{{'帖子主题'}}</el-tag>
    </div>
  </el-header>
  <el-main>
    <el-card class="box-card">
      <div  class="text item">
        {{'帖子内容'}}
      </div>
    </el-card>
  </el-main>
  <el-card>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick"  >
    <el-tab-pane label="用户评论（）" name="first">
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-container>
            <el-table :data="tableData" height="350" border style="width: 100%">
              <el-table-column prop="user" label="用户" width="200">
              </el-table-column>
              <el-table-column prop="date" label="发布时间" width="160">
              </el-table-column>
              <el-table-column prop="text" label="内容" width="640">
              </el-table-column>
              <el-table-column prop="NumofLikes" label="点赞数" width="100">
              </el-table-column>
            </el-table>
        </el-container>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="我要评论" name="second">
      <div class ="input-item">
      <el-input v-model="comment" type="textarea"
        placeholder="请输入内容"
        :rows = "4"
        maxlength="200"
        show-word-limit
      >
      </el-input>
      </div>
      <div style="margin: 20px 0;"></div>
      <el-button type="primary">发布<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-tab-pane>
  </el-tabs>
  </el-card>
</el-container>
  </div>
</template>>

<style>
  .input-item{
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }
  .input{
    width: 70%;
    margin-right: 30px;
  }

  .el-header, .el-footer {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 60px;
  }


  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 400px;
  }


  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>


<script>
  export default {
    data() {
      return {
        comment: ''
      }
    },
    methods: {
      goBack() {
        console.log('go back');
      }
    }
  }
</script>

<script>
  export default {
    data() {
      const item = {
        user: '袁梓晽nb！',
        date: '2016-05-02',
        text: '这是一条特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别长的信息',
        NumofLikes: '1'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>
