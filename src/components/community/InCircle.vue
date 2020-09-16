<template>
  <div style="padding-left: 10%;padding-right: 10%;background-color: #d9ecff;" class="wraper">
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
    <el-tabs :tab-position="tabPosition" @tab-click="handleClick" v-model="tabName" style="min-height: 680px;"
             class="el-tabs">
      <el-tab-pane label="课程" name="first"></el-tab-pane>
      <el-tab-pane label="圈子" name="second" lazy="true" style="height: auto">

        <el-row style="height: 50px"></el-row>
        <el-card class="box-card" shadow="always" style="margin-bottom: 10px;background-color: white">

          <el-row style="">
            <!--      <el-col span="2" style="height:40px;background-color: #ec008c;text-align: left"></el-col>-->
            <el-col span="24" style=";padding-left:40px;height:40px;text-align: left">
              <span style="font-size: 30px;font-weight: bolder;color:rgba(0,0,0,1)">{{circle.name}}</span>
              <span style="font-size: 30px;font-weight: bolder;color: black">&nbsp&nbsp&nbsp</span>
              <el-tooltip content="加入课程"
                          placement="top" effect="dark">
                <el-button v-if=" this.userType === 'student' && this.addOrNot === false" size="medium" class="add"
                           id="addbtn"
                           @click="addClass" round
                           style="position: relative;font-weight: bolder;color: black;border: 3px solid;border-color: #00e6ff;top: -5px">
                  加入
                </el-button>
              </el-tooltip>
              <el-tooltip content="已加入课程"
                          placement="top" effect="dark">
                <el-button v-if=" this.userType === 'student' && this.addOrNot === true" size="medium" class="added"
                           id="addedbtn" disabled round
                           style="position: relative;font-weight: bolder;color: black;border: 3px solid;border-color: #00e6ff;top: -5px">
                  已加入
                </el-button>
              </el-tooltip>
            </el-col>
          </el-row>
          <!--    <el-row style="background-color: #00aeef;">-->
          <!--      <el-col span="2" style="height:25px;background-color: black;"></el-col>-->
          <!--      <el-col span="22" style="height:25px;background-color: #ec008c;text-align: left">-->
          <!--        <span style="position:absolute;bottom:0;;font-size: 14px;font-weight: bold;color: #00aeef">&nbsp/教师</span>-->
          <!--      </el-col>-->
          <!--    </el-row>-->

          <el-row style="">
            <el-col span="24" style="height:18px;">
            </el-col>
          </el-row>

          <el-row style="">
            <el-col span="24" style="height:25px;text-align: left">
                <span style="margin-left: 15px"><el-link :underline="false"
                                                         style="font-size: 16px;font-weight: bolder;rgba(0,0,0,0.7);"
                >讨论</el-link></span>
              <span style="margin-left: 15px"><el-link :underline="false"
                                                       style="font-size: 16px;font-weight: bolder;rgba(0,0,0,0.7);"
                                                       @click.native=seevideo()
              >学习统计</el-link></span>
              <span style="margin-left: 15px"><el-link :underline="false"
                                                       style="font-size: 16px;font-weight: bolder;rgba(0,0,0,0.7);"
              >成员管理</el-link></span>
            </el-col>
          </el-row>

        </el-card>

        <el-row>

          <el-col span="17" style="min-height: 200px;border-radius: 6px;">
            <div style="border-radius: 10px;overflow: hidden;margin-bottom: 20px;text-align: center;font-size:20px;
">
              <el-collapse v-model="activeNames" accordion>

                <el-collapse-item title="创建新帖子" name="1" style="border-radius: 6px">

                  <!--            <el-row-->
                  <!--              style="padding-top:5px;height: 40px;background-color: #21ef00;border-top-right-radius: 6px;border-top-left-radius: 6px;text-align: center;font-size: 20px;font-weight: bolder;color: #00aeef">-->
                  <!--              新&nbsp帖&nbsp子-->
                  <!--            </el-row>-->
                  <el-row
                    style="border-top-left-radius: 6px;border-top-right-radius: 6px;padding-top:15px;height: 60px;text-align: center;font-size: 20px;font-weight: bolder;color: rgba(0,0,0,0.7)">
                    <el-col span="3" offset="1" style="height: inherit;padding-top: 5px">
                      标题
                    </el-col>
                    <el-col span="18" offset="1" style=";height: inherit">
                      <el-input type="text" placeholder="请输入标题" v-model="newTitle" maxlength="30" show-word-limit>
                      </el-input>
                    </el-col>
                  </el-row>

                  <el-row style="height: 10px;"></el-row>

                  <el-row
                    style="text-align: center;font-size: 20px;font-weight: bolder;color:rgba(0,0,0,0.7)">
                    <el-col span="3" offset="1"
                            style="height: 45px;padding-top: 5px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;">
                      正文
                    </el-col>
                    <el-col span="18" offset="1" style=";min-height: 120px;">
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
                    style="margin-bottom:0px;background-color: white;height: 45px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px">
                    <el-button type="primary" round class="newPost"
                               style="position: absolute;right: 30px;bottom: 8px" @click="post">
                      提交
                    </el-button>
                  </el-row>

                </el-collapse-item>
              </el-collapse>
            </div>

            <div class="infinite-list-wrapper" style="overflow:auto;min-height: 400px;rgba(0,0,0,0.58)">
              <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                  infinite-scroll-distance="30"
                  style="border-radius: 6px;">
                <el-card shadow="always"
                         style="background-color: white;height:160px;margin-bottom: 15px;border-radius: 6px;padding-top: 5px;"
                         v-for="(item,index) in posts" key="index" class="list-item box-card">
                  <el-row>
                    <el-col span="20" @click="seePost(item)"
                            style="padding-left: 15px;height: 30px;text-align: left;border-radius: 6px">
                      <el-link @click.native=seePost(item)
                               style="font-size: 18px;font-weight: bolder;color: rgba(0,0,0,0.7)">
                        {{ item.title }}
                      </el-link>

                    </el-col>
                    <!--                <el-col span="3" style="overflow: hidden">-->
                    <!--                  <el-dropdown split-button type="primary">-->
                    <!--                    <i id='starIcon' class="el-icon-star-off"></i>-->
                    <!--                    <el-dropdown-menu slot="dropdown" trigger="click" @command="handleCommand($event, item)"-->
                    <!--                                      id="moreList">-->
                    <!--                      <el-dropdown-item command="delPost">删除</el-dropdown-item>-->
                    <!--                      <el-dropdown-item command="topPost">置顶</el-dropdown-item>-->
                    <!--                    </el-dropdown-menu>-->
                    <!--                  </el-dropdown>-->
                    <!--                </el-col>-->


                    <el-col span="2" style="padding-top: 1px;overflow: hidden">
                      <el-button @click="addStar(item)" id="star" type="primary"
                                 size="small" style="right:5px;display: none"><i
                        id="'starIcon'+index" class="el-icon-star-off"></i></el-button>
                    </el-col>
                    <el-col span="2" style="padding-top: 1px;overflow: hidden">
                      <el-dropdown trigger="click" @command="handleCommand($event, item)" id="moreList"
                                   style="left: 1px">
                        <el-button type="primary" size="small" style="">
                          <i class="el-icon-more-outline"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="delPost">删除</el-dropdown-item>
                          <!--                        <el-dropdown-item command="topPost">置顶</el-dropdown-item>-->
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>


                  </el-row>
                  <el-row
                    style=" overflow: hidden;text-indent:2em;word-break: break-all;margin-top: 15px;padding-left:15px;padding-right:15px;height: 60px;text-align:left;font-size: 15px;font-weight: bold;">
                    <el-link :underline="false" href="" style="color: rgba(0,0,0,0.7);font-weight: normal"
                             @click.native=seePost(item)>
                      {{ item.detail }}
                    </el-link>
                  </el-row>

                </el-card>
              </ul>
              <p v-if="loading"></p>
              <p v-if="noMore">没有更多了</p>
            </div>

          </el-col>

          <el-col span="6" offset="1">
            <el-card class="box-card" shadow="always"
                     style="background-color: white;margin-bottom: 30px;min-height: 200px;text-align: center;">
              <el-row
                style="height: 50px;font-size: 20px;font-weight: bolder;margin-top: 0px;color: rgba(0,0,0,0.7);">
                圈子规则
              </el-row>
              <el-row v-model="rules"
                      style="overflow: hidden;text-indent: 2em;word-break: break-all;height: 80px;font-size: 15px;font-weight: bold;margin-top: 15px;color: #00aeef;">
                {{this.rules}}
              </el-row>
              <el-row id="ruleChange"
                      style="height: 25px;padding-bottom:5px;font-size: 10px;font-weight: bold;margin-top: 10px;margin-bottom:10px;color: #00aeef;">
                <el-button type="text" underline="true" style="font-weight: bold;color: red;font-size: 15px"
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
            </el-card>
            <el-card class="box-card" shadow="always"
                     style="background-color: white;min-height: 160px;text-align: center;">
              <el-row
                style="height: 50px;font-size: 20px;font-weight: bolder;margin-top: 5px;color: rgba(0,0,0,0.7);">
                课程信息
              </el-row>
              <el-row v-model="classDetail"
                      style="overflow: hidden;text-indent: 2em;word-break: break-all;height: 80px;font-size: 15px;font-weight: bold;margin-top: 15px;color: #00aeef;">
                {{circle.detail}}
              </el-row>
            </el-card>
          </el-col>
        </el-row>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // import infiniteScroll from 'vue-infinite-scroll'
  // Vue.use(infiniteScroll)
  import manageStu from  '../userManage/manageStudents'
  export default {
    data() {
      return {
        //////自用
        tabPosition: 'left',
        newTitle: '',
        newContent: '',
        newRule: '',
        submitVisible: false,
        changeRuleVisible: false,
        activeNames: '',
        count: 3,   //post第一次加载
        busy: false,
        loading: false,
        tabName: 'first',

        /////请求
        circle: {},
        classId: '',
        rules: '',
        userInfo: null,
        amount: 0,
        posts: [],
        addOrNot: false,
        userType: 'student',

      }
    },
    components:{
        manageStu
    } ,
    computed: {
      noMore() {
        return this.count >= this.amount
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    mounted() {
      if (this.$route.query.course.id!=null){
        this.classId = this.$route.query.course.id
        this.circle = this.$route.query.course
        if (this.$route.query.course.rule == '') {
          this.rules = "暂无规则"
        } else {
          this.rules = this.$route.query.course.rule
        }
        window.localStorage.setItem('courserule',this.rules)
        window.localStorage.setItem('coursename',this.circle.name)
        window.localStorage.setItem('coursedetail',this.circle.detail)
        window.localStorage.setItem('courseid',this.classId)
      }else {
        this.classId=window.localStorage.getItem('courseid')
        this.circle.name =window.localStorage.getItem('coursename')
        this.circle.detail =window.localStorage.getItem('coursedetail')
        this.rules=window.localStorage.getItem('courserule')
        this.tabName=window.localStorage.getItem('coursecircle')
        console.log(this.classId)
      }
      this.userType = this.$store.state.userInfo.usertype
      //console.log(this.rules== '')
      //this.addOrNot=   //undone
      this.userInfo = this.$store.state.userInfo
      // console.log(this.$store.state)
    },
    methods: {
      handleClick(tab) {
        if (tab.name === 'first') {
          this.tabName = 'first'
        } else if (tab.name === 'second') {
          this.tabName = 'second'
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
              //concole.log(this.$store.state.userInfo)
              // if (this.$store.state.userInfo.usertype == 'student') {
              //   document.getElementById("ruleChange").setAttribute("style", "display:none")
              //   document.getElementById("star").setAttribute("style", "display:none")
              //   document.getElementById("moreList").setAttribute("style", "display:none")
              // }
              this.posts = res.data.data
              this.amount = this.posts.length
              //console.log(this.posts)
            } else {
              this.$message({
                showClose: true,
                type: 'error',
                message: "获取圈子内容失败"
              })
            }
          })
        }
      },
      seePost(item) {
        this.$router.replace({
          name: 'postpage',
          params: {
            id: item.id
          }
        })
      },
      seevideo() {
        window.localStorage.setItem('coursecircle',this.tabName)
        window.localStorage.setItem('course', this.circle)
        this.$router.push({
          name: 'videolist2',
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
            // this.posts = res.data.data
            // this.amount = this.posts.length
            //this.$store.commit('setUserInfo', res.data.data)
            //this.$router.push('/inCircle')
            //this.posts = res.data.data
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
              //this.posts = res.data.data
              //this.amount = this.posts.length
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
          console.log(item.id)
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
            cid: this.classId,
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
            this.circle.rule = res.data.data
            this.newRule = ''
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
            this.activeNames = ''
            this.newContent = ''
            this.newTitle = ''
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

      addClass() {
        this.axios({
          method: 'post',
          url: '',
          headers: {'token': this.$store.state.userInfo.token},
          params: {
            classId: this.classId,
          },
        }), then(res => {
          if (res.data.code == 1001) {
            this.$message({
              showClose: true,
              message: '成功加入课程',
              type: 'success'
            }),
            //   document.getElementById('addBtn').setAttribute("disabled", true)
            // document.getElementById('addBtn').textContent("已加入")
            this.addOrNot=true
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


<style>
</style>

<style scoped>

  /deep/ .el-tabs__item {
    font-size: 20px;
  }

  /deep/ .el-tabs > .el-tabs__header {
    border-bottom: 1px solid #E4E7ED;
    background-color: rgba(255, 242, 109, 0.65);
    margin-top: 50px;
  }

  /deep/ .el-collapse-item {
    margin: 0 90px;

  }

  /deep/ .el-collapse-item__header {
    font-size: 20px;
    border-radius: 6px;
  }

  /deep/ .el-collapse-item__content {
    text-align: center;
  }


  /deep/ .el-dropdown {
    vertical-align: top;
    border-radius: 6px;
  }


  .add:hover, .quit:hover {
    background-color: #73ff85;
  }


  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-more-outline, .el-icon-star-off, .el-icon-star-on {
    font-size: 15px;
  }


</style>
