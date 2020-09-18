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
    <el-tabs  :tab-position="tabPosition" @tab-click="handleClick" tyle="card" v-model="tabName" style=";min-height: 680px;"
             class="myel-tabs">
      <el-tab-pane label="课程" name="first">
        <videoList/>
      </el-tab-pane>
      <el-tab-pane label="圈子" name="second" lazy="true" style="height: auto">
        <div style="margin: 0 5%">
          <el-row style="height: 50px"></el-row>
          <el-card class="box-card" shadow="always" style="margin-bottom: 10px;background-color: white">

            <el-row style="">
              <!--      <el-col span="2" style="height:40px;background-color: #ec008c;text-align: left"></el-col>-->
              <el-col span="24" style="padding-left:40px;height:40px;text-align: left">
                <span style="font-size: 30px;font-weight: bolder;color:rgba(0,0,0,1)">{{circle.name}}</span>
                <span style="font-size: 30px;font-weight: bolder;color: black">&nbsp&nbsp&nbsp</span>
                <el-tooltip content="加入课程"
                            placement="top" effect="dark">
                  <el-button size="medium" class="add"
                             id="addbtn" style="display: none"
                             @click="addClass" round
                  >
                    加入
                  </el-button>
                </el-tooltip>
                <el-tooltip content="已申请课程"
                            placement="top" effect="dark">
                  <el-button size="medium" class="applied"
                             id="appliedbtn" disabled round style="display: none"
                  >
                    已申请
                  </el-button>
                </el-tooltip>
                <el-tooltip content="已加入课程"
                            placement="top" effect="dark">
                  <el-button size="medium" class="added"
                             id="addedbtn" disabled round style="display: none"
                  >
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
                <span style="margin-left: 15px"><el-link :underline="false" @click.native=seeposts()
                                                         style="font-size: 16px;font-weight: bolder;rgba(0,0,0,0.7);"
                >讨论</el-link></span>
<!--                <span v-if="this.addOrNot === 3" style="margin-left: 15px"><el-link :underline="false"-->
<!--                                                                                    style="font-size: 16px;font-weight: bolder;rgba(0,0,0,0.7);"-->
<!--                                                                                    @click.native=seestatistics()-->
<!--                >学习统计</el-link></span>-->
                <span v-if="this.addOrNot === 3" style="margin-left: 15px"><el-link :underline="false"
                                                                                    @click.native=seemanage()
                                                                                    style="font-size: 16px;font-weight: bolder;rgba(0,0,0,0.7);"
                >成员管理</el-link></span>
              </el-col>
            </el-row>

          </el-card>

          <el-row>

            <el-col span="17" style="min-height: 200px;border-radius: 6px;">
              <div id="postlist">
                <div v-if="this.addOrNot==3 || this.addOrNot==2" style="border-radius: 10px;overflow: hidden;margin-bottom: 20px;text-align: center;font-size:20px;
            ">
                  <el-collapse v-model="activeNames" accordion>

                    <el-collapse-item name="1" style="border-radius: 6px">
                      <template slot="title" style="text-align: center">
                        <el-col span="24"
                                style="text-align: center;font-weight:bold;font-size:20px;color:#2C8DF4;">创建新帖子
                        </el-col>
                      </template>
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
                        style="margin-top:5px;background-color: white;height: 45px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px">
                        <el-button type="primary" round class="newPost"
                                   style="position: absolute;right: 30px;bottom: 3px" @click="post">
                          提交
                        </el-button>
                      </el-row>

                    </el-collapse-item>
                  </el-collapse>
                </div>
                <div class="infinite-list-wrapper" style="overflow:auto;min-height: 400px;rgba(0,0,0,0.58)"
                >
                  <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                      infinite-scroll-distance="30"
                      style="border-radius: 6px;">
                    <el-card shadow="always"
                             style="background-color: white;height:180px;margin-bottom: 15px;border-radius: 6px;padding-top: 5px;"
                             v-for="(item,index) in posts" key="index" class="list-item box-card">
                      <el-row style="height:25px;margin-bottom: 10px;margin-top: -17px">
                        <el-col v-if="item.istop === true" class="outside" span="2"
                                style="color: #ffbb00;font-weight: bolder;font-size: 13px;overflow: hidden">
                          <!--                          <el-col class="intext" span="18" offset="3"-->
                          <!--                                  style="border-radius: 4px;padding-top: 5px;height: 25px;background-color: #ff0700;">-->
                          <!--                            TOP-->
                          <!--                          </el-col>-->
                          <el-tag
                            v-if="item.istop === true"
                            effect="dark"
                            type="danger"
                            style="width: 45px"
                          >
                            TOP
                          </el-tag>
                        </el-col>

                        <el-col v-if="item.iselite === true" class="outside" span="2"
                                style="color: #ffbb00;font-weight: bolder;font-size: 13px;overflow: hidden">
                          <!--                          <el-col class="intext" span="18" offset="3"-->
                          <!--                                  style="border-radius: 4px;padding-top: 5px;height: 25px;background-color: #ff0700;"><i-->
                          <!--                            class="el-icon-star-on"></i></el-col>-->
                          <el-tag
                            v-if="item.iselite === true"
                            effect="dark"
                            type="danger"
                            style="width: 45px;color: #ffbb00"
                          >
                            <i class="el-icon-star-on"></i>
                          </el-tag>
                        </el-col>

                      </el-row>

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

                        <el-col span="2" style="padding-top: 1px;overflow: hidden;">
                          <el-button v-if="item.iselite==false" @click="addStar(item)" id="star" type="primary"
                                     size="small" style="right:2px;float: top;margin-top: 10px"><i
                            class="el-icon-star-off"></i></el-button>
                          <el-button v-if="item.iselite==true" @click="addStar(item)" id="star" type="primary"
                                     size="small" style="right:2px;float: top;margin-top: 10px"><i
                            class="el-icon-star-on"></i></el-button>
                        </el-col>
                        <el-col span="2" style="padding-top: 1px;overflow: hidden;">
                          <el-dropdown trigger="click" @command="handleCommand($event, item)" id="moreList"
                                       style="">
                            <el-button type="primary" size="small" style="left: 1px;float: top;margin-top: 10px">
                              <i class="el-icon-more-outline"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item command="delPost">删除</el-dropdown-item>
                              <el-dropdown-item v-if="item.istop==false" command="topPost">置顶</el-dropdown-item>
                              <el-dropdown-item v-if="item.istop==true" command="topPost">取消置顶</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </el-col>

                      </el-row>
                      <el-row
                        style=" overflow: hidden;text-indent:2em;word-break: break-all;margin: 15px 0;padding-left:15px;padding-right:15px;height: 100px;text-align:left;font-size: 15px;font-weight: bold;">
                        <el-link :underline="false" style="color: rgba(0,0,0,0.7);font-weight: normal"
                                 @click.native=seePost(item)>
                          {{ item.detail }}
                        </el-link>
                      </el-row>

                    </el-card>
                  </ul>
                  <p v-if="loading"></p>
                  <p v-if="noMore">没有更多了</p>
                </div>
              </div>

              <div id="statistics" style="display: none">
                <el-card class="box-card" shadow="always" style="min-height: 450px;overflow: auto">
                  <el-row
                    style="min-height: 350px;margin: 0 0px;overflow: auto;width: 100%">
                    <el-col span="20" offset="2" style="align-items: center">
                      <el-row style="margin-top: 10px;height: 50px;font-weight: bolder;font-size: 20px;width: 100%">
                        学习时长
                      </el-row>
                      <!--                    <el-table -->
                      <!--                              :data="learnTime.slice((currentPage-1)*pagesize,currentPage*pagesize)"-->
                      <!--                              row-key="id" :tree-props="{children: 'children'}"-->
                      <!--                              border style="margin-left:40px;width: 600px;">-->

                      <el-table ref="classTable" :data="learnTime.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                                style="width: 100%;position: center" @expand-change="handleExpandChange">
                        <el-table-column type="expand">
                          <template slot-scope="props">
                            <el-table :data="soloTime[props.row.id]" style="width: 100%">
                              <el-table-column label="视频" align="center">
                                <template slot-scope="scope">{{ scope.row.name }}</template>
                              </el-table-column>
                              <el-table-column label="学习时长" align="center">
                                <template slot-scope="scope">{{ scope.row.time }}</template>
                              </el-table-column>
                            </el-table>
                          </template>
                        </el-table-column>
                        <el-table-column

                          label="学号"
                          align="center">
                          <template slot-scope="scope">{{ scope.row.id }}</template>
                        </el-table-column>
                        <el-table-column

                          label="姓名"
                          align="center">
                          <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column

                          label="学习总时长"
                          align="center">
                          <template slot-scope="scope">{{ scope.row.time }}</template>
                        </el-table-column>
                      </el-table>
                      <el-pagination
                        style="margin-top: 40px"
                        background
                        :current-page.sync="currentPage"
                        :pager-count="4"
                        :hide-on-single-page=true
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="learnTime.length"
                        @current-change="handleCurrentChange">
                      </el-pagination>
                    </el-col>
                  </el-row>
            </el-card>
        </div>

        <div id="managepage" style="display: none">
          <manageStu/>
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
            <el-row v-if="this.addOrNot === 3" id="ruleChange"
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
  </div>
  </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
  // import infiniteScroll from 'vue-infinite-scroll'
  // Vue.use(infiniteScroll)
  import manageStu from '../userManage/manageStudents'
  import videoList from '../Record/videolist2'

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
        pagesize: 4,
        currentPage: 1,

        /////请求
        circle: {},
        classId: '',
        rules: '',
        userInfo: null,
        amount: 0,
        posts: [],
        addOrNot: 0,
        userType: 'student',
        stunum: 60,
        soloTime: {
          1: [
            {
              id: 12,
              name: "课1",
              time: 15,
              count: 1,
            },
            {
              id: 22,
              name: "课2",
              time: 10,
              count: 1,
            },
            {
              id: 32,
              name: "课3",
              time: 13,
              count: 1,
            },
            {
              id: 42,
              name: "课4",
              time: 5,
              count: 1,
            },
            {
              id: 52,
              name: "课5",
              time: 20,
              count: 1,
            },
          ],
          2: [
            {
              id: 15,
              name: "课1",
              time: 15,
              count: 1,
            },
            {
              id: 25,
              name: "课2",
              time: 10,
              count: 1,
            },
            {
              id: 35,
              name: "课3",
              time: 13,
              count: 1,
            },
            {
              id: 45,
              name: "课4",
              time: 5,
              count: 1,
            },
            {
              id: 55,
              name: "课5",
              time: 20,
              count: 1,
            },
          ],
          3: [
            {
              id: 11,
              name: "课1",
              time: 15,
              count: 1,
            },
            {
              id: 21,
              name: "课2",
              time: 10,
              count: 1,
            },
            {
              id: 31,
              name: "课3",
              time: 13,
              count: 1,
            },
            {
              id: 41,
              name: "课4",
              time: 5,
              count: 1,
            },
            {
              id: 51,
              name: "课5",
              time: 20,
              count: 1,
            },
          ],
        },//undone
        learnTime: [
          {
            id: 1,
            name: 1,
            time: 50,
            count: 4,
          },
          {
            id: 2,
            name: 2,
            time: 20,
            count: 5,
          },
          {
            id: 3,
            name: 3,
            time: 40,
            count: 4,
          },
          {
            id: 4,
            name: 3,
            time: 40,
            count: 4,
          },
          {
            id: 5,
            name: 3,
            time: 40,
            count: 4,
          },
          {
            id: 6,
            name: 3,
            time: 40,
            count: 4,
          },
          {
            id: 7,
            name: 3,
            time: 40,
            count: 4,
          },
          {
            id: 8,
            name: 3,
            time: 40,
            count: 4,
          },
          {
            id: 9,
            name: 3,
            time: 40,
            count: 4,
          },
          {
            id: 10,
            name: 3,
            time: 40,
            count: 4,
          },
          {
            id: 11,
            name: 3,
            time: 40,
            count: 4,
          },
          {
            id: 12,
            name: 3,
            time: 40,
            count: 4,
          }
        ]
      }
    },
    components: {
      manageStu,
      videoList
    },
    computed: {
      noMore() {
        return this.count >= this.amount
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    beforeMount() {
      if (this.$route.query.course.id != null) {
        this.classId = this.$route.query.course.id
        this.circle = this.$route.query.course
        if (this.$route.query.course.rule == '') {
          this.rules = "暂无规则"
        } else {
          this.rules = this.$route.query.course.rule
        }
        window.localStorage.setItem('courserule', this.rules)
        window.localStorage.setItem('coursename', this.circle.name)
        window.localStorage.setItem('coursedetail', this.circle.detail)
        window.localStorage.setItem('courseid', this.classId)
        window.localStorage.setItem('coursetime', this.circle.time)
        window.localStorage.setItem('coursecircle', this.tabName)
      } else {
        this.classId = window.localStorage.getItem('courseid')
        this.circle.name = window.localStorage.getItem('coursename')
        this.circle.detail = window.localStorage.getItem('coursedetail')
        this.rules = window.localStorage.getItem('courserule')
        this.tabName = window.localStorage.getItem('coursecircle')
      }
      this.getposts()
      this.isIn()
      //this.getStatistics()
      this.userType = this.$store.state.userInfo.usertype
      this.userInfo = this.$store.state.userInfo
    },
    methods: {
      handleExpandChange(row, expandRows) {
        const $classTable = this.$refs.classTable
        if (expandRows.length > 1) {
          expandRows.forEach(expandRow => {
            if (row.id !== expandRow.id) {
              $classTable.toggleRowExpansion(expandRow, false)
            }
          })
        }
        this.currentClassId = row.id
      },
      handleCurrentChange() {
        this.currentPage = currentPage
      },
      // getStatistics() {
      //   this.axios({
      //     method: 'post',
      //     url: '/',
      //     headers: {'token': this.$store.state.userInfo.token},
      //     data: {
      //       id: this.classId,
      //     }
      //   }).then(res => {
      //     if (res.data.code == 1001) {
      //       this.learnTime =
      //       this.soloTime = {}
      //     } else {
      //       this.$message({
      //         showClose: true,
      //         type: 'error',
      //         message: "获取圈子内容失败"
      //       })
      //     }
      //   })
      // },
      getposts() {
        this.axios({
          method: 'post',
          url: '/findpostbycourse',
          headers: {'token': this.$store.state.userInfo.token},
          data: {
            id: this.classId,
          }
        }).then(res => {
          if (res.data.code == 1001) {
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
      },
      isIn() {
        this.axios({
          method: 'post',
          url: '/isInCourse',
          headers: {'token': this.$store.state.userInfo.token},
          data: {
            courseid: this.classId,
          }
        }).then(res => {
          if (res.data.code == 1001) {
            this.addOrNot = res.data.data   //undone
            if (this.userType != 'student') {
              document.getElementById("addbtn").setAttribute("style", "display:none")
              document.getElementById("appliedbtn").setAttribute("style", "display:none")
              document.getElementById("addedbtn").setAttribute("style", "display:none")
            } else {
              if (this.addOrNot == 1) {
                document.getElementById("addbtn").setAttribute("style", "display:none")
                document.getElementById("appliedbtn").removeAttribute("style")
                document.getElementById("addedbtn").setAttribute("style", "display:none")
              } else if (this.addOrNot == 0) {
                document.getElementById("addbtn").removeAttribute("style")
                document.getElementById("appliedbtn").setAttribute("style", "display:none")
                document.getElementById("addedbtn").setAttribute("style", "display:none")
              } else if (this.addOrNot == 2) {
                document.getElementById("addbtn").setAttribute("style", "display:none")
                document.getElementById("appliedbtn").setAttribute("style", "display:none")
                document.getElementById("addedbtn").removeAttribute("style")
              }
            }
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: "获取学生与课程关系失败"
            })
          }
        })
      },
      seeposts() {
        document.getElementById("postlist").removeAttribute("style")
        document.getElementById("statistics").setAttribute("style", "display:none")
        document.getElementById("managepage").setAttribute("style", "display:none")
      },
      // seestatistics() {
      //   document.getElementById("postlist").setAttribute("style", "display:none")
      //   document.getElementById("statistics").removeAttribute("style")
      //   document.getElementById("managepage").setAttribute("style", "display:none")
      // },
      seemanage() {
        document.getElementById("managepage").removeAttribute("style")
        document.getElementById("statistics").setAttribute("style", "display:none")
        document.getElementById("postlist").setAttribute("style", "display:none")
      },
      handleClick(tab) {
        if (tab.name === 'first') {
          this.tabName = 'first'
          window.localStorage.setItem('coursecircle', this.tabName)
        } else if (tab.name === 'second') {
          this.tabName = 'second'
          window.localStorage.setItem('coursecircle', this.tabName)
          this.isIn()
          this.getposts()
          //this.getStatistics()
          //console.log("hre")
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
        window.localStorage.setItem('coursecircle', this.tabName)
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
            let staron = 'starIcon' + item.id
            //document.getElementById(''+staron).setAttribute("class", "el-icon-star-on")//undone v-if
            this.$message({
              showClose: true,
              type: 'success',
              message: '修改成功'
            })
            this.posts = res.data.data
            this.amount = this.posts.length
          } else if (res.data.code == 3001) {
            this.$message({
              showClose: true,
              type: 'error',
              message: '无操作权限'
            })
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
                message: '修改成功'
              })
              this.posts = res.data.data
              this.amount = this.posts.length
            } else if (res.data.code == 3001) {
              this.$message({
                showClose: true,
                type: 'error',
                message: '无操作权限'
              })
            } else {
              this.$message({
                showClose: true,
                type: 'error',
                message: '置顶失败'
              })
            }
          })
        } else if (command == "delPost") {
          this.$confirm('确认删除该帖子?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
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
              } else if (res.data.code == 3001) {
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '无操作权限'
                })
              } else {
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '删除失败'
                })
              }
            })
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
            this.rules = res.data.data
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
          url: '/applyCourse',
          headers: {'token': this.$store.state.userInfo.token},
          data: {
            courseid: this.classId,
          },
        }).then(res => {
          if (res.data.code == 1001) {
            this.$message({
              showClose: true,
              message: '成功申请课程',
              type: 'success'
            }),
              this.isIn()
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
    font-size: 17px;
    font-weight: bold;

  }

  /deep/ .myel-tabs > .el-tabs__header {
    border-bottom: 1px solid #E4E7ED;
    background-color: rgba(138, 255, 149, 0.44);
    margin-top: 50px;
  }

  /deep/ .el-collapse-item {
    text-align: center;
  }

  /deep/ .el-collapse-item__header {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  /deep/ .el-collapse-item__content {
    text-align: center;
  }


  /deep/ .el-dropdown {
    vertical-align: top;
    border-radius: 6px;
  }


  .add:hover {
    background-color: #73ff85;
  }

  .add {
    position: relative;
    font-weight: bolder;
    color: black;
    border: 3px solid;
    border-color: #00e6ff;
    top: -5px
  }

  .applied, .added {
    position: relative;
    font-weight: bolder;
    color: black;
    border: 3px solid;
    border-color: grey;
    top: -5px
  }


  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-more-outline, .el-icon-star-off, .el-icon-star-on {
    font-size: 15px;
  }

  .outside {
  }

</style>
