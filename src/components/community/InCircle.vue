<template>
  <div style="padding-left: 10%;padding-right: 10%" class="wraper">
    <template>
      <el-backtop>
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
        >
          UP
        </div>
      </el-backtop>
    </template>
    <el-row style="height: 70px"></el-row>
    <el-row style="background-color: #00aeef;">
      <el-col span="2" style="height:40px;background-color: black;text-align: left"></el-col>
      <el-col span="22" style="height:40px;background-color: #ec008c;text-align: left">
        <span style="font-size: 30px;font-weight: bolder;color: #00aeef">课程名</span>
        <span style="font-size: 30px;font-weight: bolder;color: #00aeef">&nbsp&nbsp&nbsp</span>
        <el-tooltip content="加入课程" placement="top" effect="dark">
          <el-button size="medium" class="add" id="addbtn" @click="addClass" style="display:none" round>加入</el-button>
        </el-tooltip>
        <el-tooltip content="退出课程" placement="top" effect="dark">
          <el-button size="medium" class="quit" id="quitbtn" @click="quitClass" style="display:none" round>退出
          </el-button>
        </el-tooltip>
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
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 5px"><el-link :underline="false"
                                                                                                   href="">课程信息</el-link></span>
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 15px"><el-link :underline="false"
                                                                                                    href="">讨论</el-link></span>
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 15px"><el-link :underline="false"
                                                                                                    href="">录播</el-link></span>
        <span style="font-size: 14px;font-weight: bolder;color: #00aeef;margin-left: 15px"><el-link :underline="false"
                                                                                                    href="">直播</el-link></span>
      </el-col>
    </el-row>

    <el-row>
      <el-col span="17" style="min-height: 200px;border-radius: 6px;">
        <div style="border-radius: 10px;overflow: hidden;margin-bottom: 20px;text-align: center;font-size:20px;
">
          <el-collapse v-model="activeNames" accordion
                       style="text-align: center;">

            <el-collapse-item title="创建新帖子" name="1" title.style="align: center">

              <!--            <el-row-->
              <!--              style="padding-top:5px;height: 40px;background-color: #21ef00;border-top-right-radius: 6px;border-top-left-radius: 6px;text-align: center;font-size: 20px;font-weight: bolder;color: #00aeef">-->
              <!--              新&nbsp帖&nbsp子-->
              <!--            </el-row>-->
              <el-row
                style="padding-top:15px;height: 60px;background-color: #21ef00;text-align: center;font-size: 20px;font-weight: bolder;color: #00aeef">
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
                style="margin-bottom:0px;background-color: #21ef00;height: 45px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px">
                <el-popover
                  placement="top"
                  width="160"
                  v-model="submitVisible"
                  style="text-align: center"
                >
                  <p>确认发布帖子？</p>
                  <div style="text-align: right; margin-top: 15px">
                    <el-button size="mini" type="text" @click="submitVisible = false">取消</el-button>
                    <el-button class="newPost" type="primary" size="mini" @click="post">确定</el-button>
                  </div>
                  <el-button slot="reference" type="primary" round style="position: absolute;right: 30px;bottom: 8px">
                    提交
                  </el-button>
                </el-popover>
              </el-row>

            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="infinite-list-wrapper" style="overflow:auto;min-height: 400px;background-color: #00aeef">
          <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30"
              style="border-radius: 6px;">
            <el-row style="background-color: #ec008c;height:90px;margin-bottom: 20px;border-radius: 6px;"
                    v-for="item in count" class="list-item">
              <el-row>
                <el-col span="21"
                        style="padding-left: 15px;height: 30px;text-align: left;font-size: 25px;font-weight: bolder;background-color: #21ef00;border-radius: 6px">
                  <el-link href="">{{ item }}</el-link>

                </el-col>
                <el-col span="1">
                  <el-button style="margin-left: 6px;margin-top: 1px" type="primary" size="mini"><i
                    class="el-icon-star-off"></i></el-button>
                </el-col>
                <el-col span="2">
                  <el-dropdown>
                    <el-button type="primary" size="mini" style="margin-left: 20px;margin-top: 1px">
                      <i class="el-icon-more-outline"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>删除</el-dropdown-item>
                      <el-dropdown-item>置顶</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>

              </el-row>
              <el-row
                style=" overflow: hidden;text-indent:2em;word-break: break-all;;margin-top: 5px;padding-left:15px;padding-right:15px;height: 50px;text-align:left;font-size: 15px;font-weight: bold;background-color: #21ef00">
                <el-link :underline="false" href="">
                  {{ item }}
                </el-link>
              </el-row>

            </el-row>
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
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
  // import infiniteScroll from 'vue-infinite-scroll'
  // Vue.use(infiniteScroll)
  export default {
    data() {
      return {
        //////自用
        newTitle: '',
        newContent: '',
        submitVisible: false,
        activeName: '',
        count: 5,   //post第一次加载

        /////请求
        classId: '',
        stuId: '',
        rules: '',
        userInfo: null,

        //加载post
        busy: false,
        loading: false,
        amount: 0,
        posts: [],

      }
    },
    computed: {
      noMore() {
        return this.count >= 20
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    mounted() {
      this.axios({
        method: 'post',
        url: 'getInCircle',
        headers: {'token': this.$store.state.userInfo.token},
        params: {}
      }).then(res => {
        if (res.code == 1001) {
          this.alreadyJoinCommunity = res.data.alreadyJoinCommunity,
            this.allCommunity = res.data.allCommunity,
            this.applyingCommunity = res.data.applyingCommunity
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: "获取圈子内容失败"
          })
        }
      })
      this.userInfo = this.$store.state.userInfo
      console.log(this.$store.state)
    },
    methods: {
      post(){
        this.axios({
          url: '',
          headers: {'token': this.$store.state.userInfo.token},
          params: {
            classId:this.classId,
            newTitle:this.newTitle,
            newContent:this.newContent
          },

        }).then(res=>{
          if(res.data.code == 1001){
            this.submitVisible = false,
            this.$message({
              showClose:true,
              type:'success',
              message:'发布成功'
            })
            // alert("111")
            // console.log(res.data)
            this.$store.commit('setUserInfo',res.data.data)
            this.$router.push('/inCircle')
            // console.log(this.$store.state)
            // this.$router.push({path: '/'});
          }
          else{
            this.$message({
              showClose:true,
              type:'error',
              message:'发布失败'
            })
          }
        })
      },
      addClass() {
        this.axios({
          method: 'POST',
          url: '',
          headers: {'token': this.$store.state.userInfo.token},
          params: {
            classId: this.classId,
            id: this.stuId,
            join: true
          },
        }), then(res => {
          if (res.data.code == 1001) {
            this.$message({
              showClose: true,
              message: '成功加入课程',
              type: 'success'
            }),
              document.getElementById("addbtn").setAttribute("style", "display:none")
            document.getElementById("quitbtn").setAttribute("style", "display:block");
          } else {
            this.$message({
              showClose: true,
              message: '加入课程失败',
              type: 'error'
            })
          }
        })
      },
      loadMore: function () {
        this.busy = true
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
          this.busy = false
        }, 2000)


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

  .el-collapse-item__header {
    font-size: 30px;
  }

  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-more-outline, .el-icon-star-off {
    font-size: 13px;
  }


</style>
