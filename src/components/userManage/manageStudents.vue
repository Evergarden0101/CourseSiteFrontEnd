<template>
    <div class="manage-container">
      <el-container>
<!--        管理学生界面-->
<!--        提供课程信息-->
        <el-row></el-row>
        <el-row style="width:100%;margin-top: 50px;background-color: white">
<!--          导航栏，审核申请-->
          <el-tabs :tab-position="tabPosition" style="height: 200px;padding-top: 20px">
            <el-tab-pane label="导入学生">
<!--              上传文件接口-->
              <el-row>
                <el-col offset="16" span="8">
                  <el-button type="primary" plain>导入学生</el-button>
                </el-col>
              </el-row>
<!--              显示学生表格-->
              <el-row>

              </el-row>
            </el-tab-pane>
            <el-tab-pane label="审核申请">

            </el-tab-pane>
            <el-tab-pane label="学生管理"></el-tab-pane>
          </el-tabs>
        </el-row>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "manageStudents",
        data(){
            return{
                tabPosition:"left",
            }
        }
    }
</script>

<style scoped>
.manage-container{
  padding-left: 10%;
  padding-right: 10%;
  background-color: #d9ecff;
  min-width: 100px;
  min-height: 100%;
}
</style>
