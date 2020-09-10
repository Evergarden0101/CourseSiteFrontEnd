<template>
  <div>
    <el-row style="height: 70px"></el-row>
    <el-row style="background-color: #00aeef;">
      <el-col span="1" offset="4" style="height:40px;background-color: black;text-align: left"></el-col>
      <el-col span="15" style="height:40px;background-color: #ec008c;text-align: left">
        <span style="font-size: 30px;font-weight: bolder;color: #00aeef">课程名</span>
        <span style="font-size: 30px;font-weight: bolder;color: #00aeef">&nbsp&nbsp&nbsp</span>
        <el-button size="medium" style="background-color: #00aeef;position: absolute;top:1px;font-size: medium;font-weight: bold; color: #ec008c" round>加入</el-button>
      </el-col>
    </el-row>
    <el-row style="background-color: #00aeef;">
      <el-col span="1" offset="4" style="height:18px;background-color: black;text-align: left"></el-col>
      <el-col span="15" style="height:18px;background-color: #ec008c;text-align: left">
        <span style="font-size: 12px;font-weight: bold;color: #00aeef">&nbsp/教师</span>
      </el-col>
    </el-row>

    <el-row style="background-color: #00aeef;">
      <el-col span="16" offset="4" style="height:8px;background-color: #ec008c;">
      </el-col>
    </el-row>

    <el-row style="margin-bottom: 20px;background-color: #00aeef;">
      <el-col span="16" offset="4" style="height:20px;background-color: #ec008c;text-align: left">
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 5px">课程信息</span>
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 15px">讨论</span>
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 15px">录播</span>
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 15px">直播</span>
      </el-col>
    </el-row>

    <el-row style="margin-bottom: 20px;background: black"></el-row>
  </div>
</template>

<script>
  export default {
    name: "CirclePosts"
  }
</script>


<style scoped>

</style>
