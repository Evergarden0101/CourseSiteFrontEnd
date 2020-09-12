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
      <el-col span="24" style="height:25px;background-color: #ec008c;text-align: left">
        <span style="margin-left: 5px"><el-link :underline="false"
                                                style="font-size: 16px;font-weight: bolder;color: #00aeef;"
        >课程信息</el-link></span>
        <span style="margin-left: 15px"><el-link :underline="false"
                                                 style="font-size: 16px;font-weight: bolder;color: #00aeef;"
        >讨论</el-link></span>
        <span style="margin-left: 15px"><el-link :underline="false"
                                                 style="font-size: 16px;font-weight: bolder;color: #00aeef;"
                                                 @click.native=seevideo()
        >录播</el-link></span>
        <span style="margin-left: 15px"><el-link :underline="false"
                                                 style="font-size: 16px;font-weight: bolder;color: #00aeef;"
        >直播</el-link></span>
      </el-col>
    </el-row>

    <el-row>
      <el-col span="17" style="min-height: 200px;border-radius: 6px;">
        <div style="border-radius: 10px;overflow: hidden;margin-bottom: 20px;text-align: center;font-size:20px;
">
          <el-collapse v-model="activeNames" accordion
                       style="border: solid 5px ;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-color: #00aeef">

            <el-collapse-item title="创建新帖子" name="1" style="border-radius: 6px">

              <!--            <el-row-->
              <!--              style="padding-top:5px;height: 40px;background-color: #21ef00;border-top-right-radius: 6px;border-top-left-radius: 6px;text-align: center;font-size: 20px;font-weight: bolder;color: #00aeef">-->
              <!--              新&nbsp帖&nbsp子-->
              <!--            </el-row>-->
              <el-row
                style="border-top-left-radius: 6px;border-top-right-radius: 6px;padding-top:15px;height: 60px;background-color: #4eff58;text-align: center;font-size: 20px;font-weight: bolder;color: #00aeef">
                <el-col span="3" offset="1" style="height: inherit;padding-top: 5px">
                  标题
                </el-col>
                <el-col span="18" offset="1" style="background-color: #4eff58;height: inherit">
                  <el-input type="text" placeholder="请输入标题" v-model="newTitle" maxlength="30" show-word-limit>
                  </el-input>
                </el-col>
              </el-row>

              <el-row style="height: 10px;background-color: #4eff58;"></el-row>

              <el-row
                style="background-color: #4eff58;text-align: center;font-size: 20px;font-weight: bolder;color: #00aeef">
                <el-col span="3" offset="1"
                        style="height: 45px;padding-top: 5px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;">
                  正文
                </el-col>
                <el-col span="18" offset="1" style="background-color: #4eff58;min-height: 120px;">
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
                style="margin-bottom:0px;background-color: #4eff58;height: 45px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px">
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

        <div class="infinite-list-wrapper" style="overflow:auto;min-height: 400px;rgba(0,0,0,0.58)">
          <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30"
              style="border-radius: 6px;">
            <el-row style="background-color: #4eff58;height:90px;margin-bottom: 15px;border-radius: 6px;"
                    v-for="(item,index) in posts" key="index" class="list-item">
              <el-row>
                <el-col span="21" @click="seePost(item)"
                        style="padding-left: 15px;height: 30px;text-align: left;border-radius: 6px">
                  <el-link @click.native=seePost(item)
                           style="font-size: 20px;font-weight: bolder;color: #ff0098">
                    {{ item.title }}
                  </el-link>

                </el-col>
                <el-col span="1">
                  <el-button @click="addStar(item)" id="star" style="margin-left: 6px;margin-top: 1px" type="primary"
                             size="mini"><i
                    id='starIcon' class="el-icon-star-off"></i></el-button>
                </el-col>
                <el-col span="2">
                  <el-dropdown trigger="click" @command="handleCommand" id="moreList">
                    <el-button type="primary" size="mini" style="margin-left: 20px;margin-top: 1px">
                      <i class="el-icon-more-outline"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="delPost">删除</el-dropdown-item>
                      <el-dropdown-item command="topPost">置顶</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>

              </el-row>
              <el-row
                style=" overflow: hidden;text-indent:2em;word-break: break-all;margin-top: 5px;padding-left:15px;padding-right:15px;height: 50px;text-align:left;font-size: 15px;font-weight: bold;">
                <el-link :underline="false" href="" style="color: #ff0098;font-weight: normal"
                         @click.native=seePost(item)>
                  {{ item.detail }}
                </el-link>
              </el-row>

            </el-row>
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </el-col>

      <el-col span="6" offset="1">
        <el-row
          style="margin-bottom: 30px;background-color: #ec008c;min-height: 200px;text-align: center;border-radius: 6px;">
          <el-row
            style="height: 50px;font-size: 20px;font-weight: bolder;margin-top: 5px;color: #21ef00;">
            圈子规则
          </el-row>
          <el-row v-model="rules"
                  style="overflow: hidden;text-indent: 2em;word-break: break-all;height: 80px;font-size: 15px;font-weight: bold;margin-top: 15px;color: #00aeef;">
            {{circle.rule}}
          </el-row>
          <el-row id="ruleChange"
                  style="height: 15px;font-size: 10px;font-weight: bold;margin-top: 10px;margin-bottom:10px;color: #00aeef;">
            <el-button type="text" underline="true" style="font-weight: bold;color: #00aeef;font-size: 15px"
                       @click="changeRuleVisible = true">修改规则
            </el-button>
            <el-dialog title="修改规则" :visible.sync="changeRuleVisible">
              <el-form :model="form">
                <el-form-item label="输入新规则" :label-width="formLabelWidth">
                  <el-input type="textarea" :rows="5" v-model="newRule"
                            placeholder="请输入新规则"
                            maxlength="300" show-word-limit autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="changeRuleVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeRule">确 定</el-button>
              </div>
            </el-dialog>
          </el-row>
        </el-row>
        <el-row style="background-color: #ec008c;min-height: 160px;text-align: center;border-radius: 6px;">
          <el-row
            style="height: 50px;font-size: 20px;font-weight: bolder;margin-top: 5px;color: #21ef00;">
            课程信息
          </el-row>
          <el-row v-model="classDetail"
                  style="overflow: hidden;text-indent: 2em;word-break: break-all;height: 80px;font-size: 15px;font-weight: bold;margin-top: 15px;color: #00aeef;">
            {{circle.detail}}
          </el-row>
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
        newRule: '',
        submitVisible: false,
        changeRuleVisible: false,
        activeName: '',
        count: 5,   //post第一次加载
        busy: false,
        loading: false,

        /////请求
        circle: {},
        classId: '',
        rules: "",
        userInfo: null,
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
      console.log(this.$route.params.course.id)
      this.classId = this.$route.params.course.id
      this.rules = this.$route.params.course.rule
      this.circle = this.$route.params.course
      if (this.rules == "") {
        this.rules = "暂无规则"
      }
      this.axios({
        method: 'post',
        url: '/findpostbycourse',
        headers: {'token': this.$store.state.userInfo.token},
        data: {
          id: this.classId,
        }
      }).then(res => {
        // console.log(res)
        if (res.data.code == 1001) {
          if (this.$store.state.userInfo.usertype == 'student') {
            document.getElementById("ruleChange").setAttribute("style", "display:none")
            document.getElementById("star").setAttribute("style", "display:none")
            document.getElementById("moreList").setAttribute("style", "display:none")
          }
          this.posts = res.data.data
          this.amount = this.posts.length
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: "获取圈子内容失败"
          })
        }
      })
      this.userInfo = this.$store.state.userInfo
      // console.log(this.$store.state)
    },
    methods: {
      seePost(item) {
        this.$router.replace({
          name: 'post',
          params: {
            id: item.id
          }
        })
      },
      seevideo() {
        window.localStorage.setItem('courseid', this.classId)
        window.localStorage.setItem('coursename', this.circle.name)
        window.localStorage.setItem('coursedetail', this.circle.detail)
        window.localStorage.setItem('coursetime', this.circle.time)
        this.$router.push({
          name: 'videolist2'
        })
      },
      addStar(item) {
        this.axios({
          method: 'post',
          url: '/changepostiselite',
          headers: {'token': this.$store.state.userInfo.token},
          data: {
            id: item.id,
          },
        }).then(res => {
          if (res.data.code == 1001) {
            document.getElementById("starIcon").setAttribute("class", "el-icon-star-on")//undone v-if
            this.$message({
              showClose: true,
              type: 'success',
              message: '设置为精华帖'
            })
            this.posts = res.data.data
            this.amount = this.posts.length
            //this.$store.commit('setUserInfo', res.data.data)
            //this.$router.push('/inCircle')
            this.posts = res.data.data
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '设置失败'
            })
          }
        })
      },
      handleCommand(command, item) {
        if (command == "topPost") {
          this.axios({
            method: 'post',
            url: '/changepostistop',
            headers: {'token': this.$store.state.userInfo.token},
            data: {
              id: item.id,
            },
          }).then(res => {
            if (res.data.code == 1001) {
              this.$message({
                showClose: true,
                type: 'success',
                message: '置顶成功'
              })
              this.posts = res.data.data
              this.amount = this.posts.length
              // this.$router.push({
              //   name: '/inCircle',
              //   params: {
              //     course: this.circle
              //   }
              // })
            } else {
              this.$message({
                showClose: true,
                type: 'error',
                message: '设置失败'
              })
            }
          })
        } else if (command == "delPost") {
          this.axios({
            method: 'post',
            url: '/deletepost',
            headers: {'token': this.$store.state.userInfo.token},
            data: {
              id: item.id,
            },
          }).then(res => {
            if (res.data.code == 1001) {
              this.$message({
                showClose: true,
                type: 'success',
                message: '已删除'
              })
              this.posts = res.data.data
              this.amount = this.posts.length
            } else {
              this.$message({
                showClose: true,
                type: 'error',
                message: '删除失败'
              })
            }
          })
        }
      },
      changeRule() {
        this.axios({
          method: 'post',
          url: '/setrule',
          headers: {'token': this.$store.state.userInfo.token},
          data: {
            courseid: this.classId,
            rule: this.newRule,
          },
        }).then(res => {
          if (res.data.code == 1001) {
            this.changeRuleVisible = false,
              this.$message({
                showClose: true,
                type: 'success',
                message: '修改成功'
              })
            this.rules = res.data.rule
            // alert("111")
            // console.log(res.data)
            // this.$router.push({
            //   name: '/inCircle',
            //   params: {
            //     course: this.classId
            //   }
            // })
            // console.log(this.$store.state)
            // this.$router.push({path: '/'});
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '修改失败'
            })
          }
        })
      },
      post() {
        if (this.newTitle == '') {
          this.$message({
            type: 'warning',
            message: '请输入帖子标题'
          })
          return;
        } else if (this.newContent == '') {
          this.$message({
            type: 'warning',
            message: '请输入帖子内容'
          })
          return;
        }
        this.axios({
          method: 'post',
          url: '/createpost',
          headers: {'token': this.$store.state.userInfo.token},
          data: {
            courseid: this.classId,
            title: this.newTitle,
            detail: this.newContent
          },
        }).then(res => {
          if (res.data.code == 1001) {
            this.submitVisible = false,
              this.$message({
                showClose: true,
                type: 'success',
                message: '发布成功'
              })
            this.posts = res.data.data
            this.amount = this.posts.length
            // alert("111")
            // console.log(res.data)
            //this.$router.go(0)
            // this.$router.push({
            //   name: '/inCircle',
            //   params: {
            //     course: this.circle
            //   }
            // })
            // console.log(this.$store.state)
            // this.$router.push({path: '/'});
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '发布失败'
            })
          }
        })
      },
      /*
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
      },*/
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
