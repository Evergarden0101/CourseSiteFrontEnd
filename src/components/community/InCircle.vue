<template>
  <div style="padding-left: 10%;padding-right: 10%">
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    <el-row style="height: 70px"></el-row>
    <el-row style="background-color: #00aeef;">
      <el-col span="2" style="height:40px;background-color: black;text-align: left"></el-col>
      <el-col span="22" style="height:40px;background-color: #ec008c;text-align: left">
        <span style="font-size: 30px;font-weight: bolder;color: #00aeef">课程名</span>
        <span style="font-size: 30px;font-weight: bolder;color: #00aeef">&nbsp&nbsp&nbsp</span>
        <el-tooltip content="加入课程" placement="top" effect="dark">
          <el-button size="medium" class="add" @click="addClass" round>加入</el-button>
        </el-tooltip>
        <el-button size="medium" class="quit" @click="quitClass" style="display:none" round>已加入</el-button>
      </el-col>
    </el-row>
    <el-row style="background-color: #00aeef;">
      <el-col span="2" style="height:25px;background-color: black;"></el-col>
      <el-col span="22" style="height:25px;background-color: #ec008c;text-align: left">
        <span style="position:absolute;bottom:0;;font-size: 14px;font-weight: bold;color: #00aeef">&nbsp/教师</span>
      </el-col>
    </el-row>

    <el-row style="background-color: #00aeef;">
      <el-col span="24" style="height:8px;background-color: #ec008c;">
      </el-col>
    </el-row>

    <el-row style="margin-bottom: 20px;background-color: #00aeef;">
      <el-col span="24" style="height:20px;background-color: #ec008c;text-align: left">
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 5px">课程信息</span>
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 15px">讨论</span>
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 15px">录播</span>
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 15px">直播</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col span="17" style="min-height: 200px;border-radius: 6px;">
        <el-row
          style="padding-top:5px;height: 40px;background-color: #21ef00;border-top-right-radius: 6px;border-top-left-radius: 6px;text-align: center;font-size: 20px;font-weight: bolder;color: #00aeef">
          新&nbsp帖&nbsp子
        </el-row>
        <el-row
          style="height: 45px;background-color: #21ef00;text-align: center;font-size: 20px;font-weight: bolder;color: #00aeef">
          <el-col span="3" offset="1" style="background-color: #ec008c;height: inherit;padding-top: 5px">
            标题
          </el-col>
          <el-col span="18" offset="1" style="background-color: #21ef00;height: inherit">
            <el-input type="text" placeholder="请输入标题" v-model="newTitle" maxlength="30" show-word-limit>
            </el-input>
          </el-col>
        </el-row>

        <el-row style="height: 10px;background-color: #21ef00;"></el-row>

        <el-row
          style="background-color: #21ef00;text-align: center;font-size: 20px;font-weight: bolder;color: #00aeef">
          <el-col span="3" offset="1" style="background-color: #ec008c;height: 45px;padding-top: 5px">
            正文
          </el-col>
          <el-col span="18" offset="1" style="background-color: #21ef00;min-height: 120px;">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="newContent"
              maxlength="500" show-word-limit
              style="margin-bottom: 15px">
            </el-input>
          </el-col>
        </el-row>
        <el-row
          style="margin-bottom:20px;background-color: #21ef00;height: 45px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px">
          <el-popover
            placement="top"
            width="160"
            v-model="submitVisible"
            style="text-align: center"
          >
            <p>确认发布帖子？</p>
            <div style="text-align: right; margin-top: 15px">
              <el-button size="mini" type="text" @click="submitVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="submitVisible = false">确定</el-button>
            </div>
            <el-button slot="reference" type="primary" round style="position: absolute;right: 30px;bottom: 8px">
              提交
            </el-button>
          </el-popover>
        </el-row>

        <el-row style="height: 50px;background-color: #21ef00;border-radius: 6px;margin-bottom: 20px">

        </el-row>

        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
<!--          <el-row v-for="i in count" class="infinite-list-item">{{ i }}</el-row>-->
        </ul>

      </el-col>

      <el-col span="6" offset="1"
              style="background-color: #ec008c;height: 160px;text-align: center;border-radius: 6px;">
        <el-row
          style="height: 50px;font-size: 20px;font-weight: bolder;margin-top: 5px;color: #21ef00;">
          圈子规则
        </el-row>
        <el-row v-model="rules" style="height: 80px;font-size: 15px;font-weight: bold;margin-top: 15px;color: #00aeef;">
          具体规则
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0,
        classId: '',
        stuId: '',
        rules: '',
        amount: 0,
        newTitle: '',
        newContent: '',
        submitVisible: false,

      }
    },
    mounted() {

    },
    methods: {
      addClass() {
        this.axios({
          method: 'post',
          data: {
            classId: this.classId,
            id: this.stuId,
            join: true
          },
        }),
          this.$message({
            showClose: true,
            message: '成功加入课程',
            type: 'success'
          }),
          this.text("已加入")
      },
      load() {
        if (this.count + 4 <= this.amount) {
          this.count += 4;
        } else {
          this.count = this.amount;
        }
      }
    }
  }
</script>


<style scoped>
  .add, .quit {
    background-color: #00aeef;
    position: absolute;
    top: 1px;
    font-size: medium;
    font-weight: bold;
    color: #ec008c
  }

  .add:hover, .quit:hover {
    background-color: #21ef00;
  }

</style>
