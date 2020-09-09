<template>
  <div>
    <el-row class="el-row">
      <!-- gutter 栅格间距 -->
      <el-container>
        <el-header style="text-align: left; font-size: 12px">
        </el-header>
        <el-col :span="18" :offset="3">
          <el-container>
            <el-col :span="16">
              <el-main>Main</el-main>
            </el-col>
            <el-col :span="1"></el-col>

            <el-col :span="3">
              <el-aside>
                Aside
              </el-aside>
            </el-col>
          </el-container>
        </el-col>

      </el-container>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "InCircle"
  }
</script>


<style scoped>

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-row {
    margin-bottom: 20px;
    margin-top: 50px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
