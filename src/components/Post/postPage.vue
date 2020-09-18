<template>
  <div style="
    background-color: #d9ecff;
">
    <div>
      <div>
        <div>
          <!-- Post Header -->
          <header class="intro-header" >
            <!--            <navbar/>-->
            <div class="header-mask"></div>
            <div class="container" >
              <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1" >
                  <div class="post-heading">
                    <h1>{{ page.title }}</h1>
                    <!-- <h2 class="subheading">{{ page.subtitle }}</h2> -->
                    <span class="meta" style="font-weight: 700">作者 {{ page.userid }} 发布于 {{ page.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
        <!-- Post Content -->
        <article>
          <div style="
            padding-left: 10%;
            padding-right: 10%;
            background-color: #d9ecff;
            min-width: 100px;
            min-height: 100px;
            ">
            <div class="row">

              <!-- Post Container -->
              <div class="
                        col-lg-8 col-lg-offset-2
                        col-md-10 col-md-offset-1
                        post-container" style="margin-top: 20px;min-height: 200px;color: #606266;font-size: 20px;text-align: left;border:#C0C4CC  1px solid;border-radius: 4px">
                {{ page.detail }}

<!--                <hr style="visibility: hidden;">-->

<!--                <hr style="visibility: hidden;">-->

                <!--
                <ul class="pager">
                    {% if page.previous.url %}
                    <li class="previous">
                        <a href="{{ page.previous.url | prepend: site.baseurl | replace: '//', '/' }}" data-toggle="tooltip" data-placement="top" title="{{page.previous.title}}">
                        Previous<br>
                        <span>{{page.previous.title}}</span>
                        </a>
                    </li>
                    {% endif %}
                    {% if page.next.url %}
                    <li class="next">
                        <a href="{{ page.next.url | prepend: site.baseurl | replace: '//', '/' }}" data-toggle="tooltip" data-placement="top" title="{{page.next.title}}">
                        Next<br>
                        <span>{{page.next.title}}</span>
                        </a>
                    </li>
                    {% endif %}
                </ul>
                -->
              </div>

              <!-- Side Catalog Container -->
              <div class="
                        col-lg-2 col-lg-offset-0
                        visible-lg-block
                        sidebar-container
                        catalog-container">
                <div class="side-catalog">
                  <hr class="hidden-sm hidden-xs">
                  <h5>
                    <a class="catalog-toggle" href="#">目录</a>
                  </h5>
                  <ul class="catalog-body"></ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <div style="
            padding-left: 10%;
            padding-right: 10%;
            background-color: #d9ecff;
            min-width: 100px;
            min-height: 600px;
            ">
          <el-divider>讨论区</el-divider>
          <div style="margin: 20px">
            <el-row>
              <el-col span="3">
                <el-row>
                  <img src="../../assets/timg.jpg"  style="height: 60px;width: 60px;border-radius: 30px">
                </el-row>
                <el-row>
                  {{this.$store.state.userInfo.username}}
                </el-row>
              </el-col>
              <el-col span="18">
                <el-input
                  type="textarea"
                  rows="5"
                  placeholder="请输入内容"
                  v-model="comment">
                </el-input>
              </el-col>
              <el-col span="3">
                <el-button type="primary" plain @click="publish()">提交</el-button>
              </el-col>
            </el-row>
          </div>
          <h4 style="margin:20px">{{commentSum}}条评论</h4>
          <div style="margin-bottom: 20px">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect(1,1)" background-color="#d9ecff" text-color= "#606266">
<!--              <el-menu-item index="1">按热度排序</el-menu-item>-->
              <el-menu-item index="2">按时间排序</el-menu-item>
            </el-menu>
          </div>
          <div v-for="(per,i) in commentList" :key="i">
            <el-row style="height: 100px;border-bottom: 1px solid #C0C4CC ">
              <el-col span="3">
                <el-row>
                  <img src="../../assets/timg.jpg"  style="height: 60px;width: 60px;border-radius: 30px">
                </el-row>
                <el-row>
                  {{per.username}}
                </el-row>
              </el-col>
              <el-col span="18">
                <div class="text-wrapper" style="text-align: left; padding-left: 10px">
                  <span class="comment-detail">{{ per.detail }}</span>
                </div>
                <div class="comment-Info" style="margin-top: 20px">
                  <span>{{per.timestring}}</span>
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </div>
        <footerbar/>
      </div>
    </div>
  </div>
</template>

<script>
  // import navbar from '../navbars/navbar'
  // import footerbar from '../navbars/footerbar'

  export default {
    name: 'postPage',
    components: {
      // navbar,
      // footerbar
    },
    data() {
      return {
        page: {},
        comment: '',
        commentSum: 0,
        commentList: []
      }
    },
    mounted() {
      this.pid = this.$route.params.id
      this.getCommentList()
      this.getPageInfo()

    },
    computed: {},
    methods: {
      getPageInfo() {
        this.axios({
          method: 'post',
          headers: {'token': this.$store.state.userInfo.token},
          data: {
            id: this.pid
          },
          url: 'findpostbyid'
        }).then(res => {
          this.page = res.data.data
        })
      },
      getCommentList() {
        this.axios({
          method: 'post',
          headers: {'token': this.$store.state.userInfo.token},
          data: {
            postid: this.pid
          },
          url: '/getcomments'
        }).then(res => {
          //todo: 获取commentSum
          this.commentList = res.data.data
          this.commentSum = this.commentList.length
        })
      },
      deleteComment() {
        this.axios({
          method: 'post',
          data: {
            id: this.$store.state.userInfo.id
          },
          url: '/deletecomment'
        })
      },
      goback() {
        this.$router.push('/login')
      },
      publish(id) {
        if (this.comment.length >= 200) {
          alert('长度超出限制')
          return;
        }
        this.axios({
          method: 'post',
          headers: {'token': this.$store.state.userInfo.token},
          data: {
            postid:this.pid,
            detail: this.comment
          },
          url: '/addcomment'
        }).then(res => {
          if (res.data.code == 1001) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '发布成功'
            })
            this.comment = '',
            this.commentList = res.data.data
            this.commentSum = this.commentList.length
              console.log(res)
            //this.$store.commit('pulishcomment', res.data.data),
            // this.getCommentList()
          }
          else{
              this.$message({
                  showClose: true,
                  type: 'success',
                  message: '发布异常'
              })
          }
        })
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style type="scss" scoped>
  @import './bootstrap1.css';
  @import './hux-blog1.css';

  header.intro-header {
    position: relative;
    background-image: url(homepage.jpg)
  }

  .self-input {
    width: 1000px;
    margin: 0 auto;
    margin-top: 10px;
    height: 80px;
  }

  .self-input {
    width: 1000px;
    margin: 0 auto;
    margin-top: 10px;
    height: 80px;

  }

  .user-face {
    width: 150px;
    height: 150px;
    float: left;
  }

  .input-container {
    display: table-cell;
    vertical-align: top;
    /*即使宽度设为2000px，元素的内容还是可以正常显示*/
    width: 2000px;
    height: 600px;
  }

  /* place left on bigger screen */
  @media all and (min-width: 800px) {
    .anchorjs-link {
      position: absolute;
      left: -0.75em;
      font-size: 1.1em;
      margin-top: -0.1em;
    }

    .user-face {
      width: 150px;
      height: 150px;
      float: left;
    }

    .input-container {
      display: table-cell;
      vertical-align: top;
      /*即使宽度设为2000px，元素的内容还是可以正常显示*/
      width: 2000px;
      height: 600px;
    }

    /* place left on bigger screen */
    @media all and (min-width: 800px) {
      .anchorjs-link {
        position: absolute;
        left: -0.75em;
        font-size: 1.1em;
        margin-top: -0.1em;
      }
    }
    .text-wrapper {
      word-break: break-all;
      word-wrap: break-word
    }
    .el-divider--horizontal{
      margin: 20px;
      background: 0 0;
      border-top: 1px dashed #ffffff;
    }
    .el-divider__text {
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      background-color: #d9ecff;
    }
    .el-menu.el-menu--horizontal {
      border-bottom: solid 1px #ffffff;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: #ffffff;
    }
    .el-textarea__inner {
      background-color: rgba(255, 255, 255, .15);
    }
    .text-wrapper{
      word-break: break-all;
      word-wrap: break-word
    }
    .comment-Info {
      margin-bottom: 10px;
      text-align: left;
    }
    .comment-detail {
      font-weight: bold;
    }
  }
</style>
