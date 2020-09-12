<template>
    <div>
        <!-- Post Header -->
        <header class="intro-header">
            <navbar/>
            <div class="header-mask"></div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <div class="post-heading">
                            <h1>{{ page.title }}</h1>
                            <!-- <h2 class="subheading">{{ page.subtitle }}</h2> -->
                            <span class="meta">作者 {{ page.userid }} 发布于 {{ page.time }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Post Content -->
        <article>
            <div class="container">
                <div class="row">

            <!-- Post Container -->
                    <div class="
                        col-lg-8 col-lg-offset-2
                        col-md-10 col-md-offset-1
                        post-container">

                        {{ page.detail }}

                        <hr style="visibility: hidden;">
                        
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
        <div class="
                        col-lg-8 col-lg-offset-2
                        col-md-10 col-md-offset-1
                        post-container">
            <el-divider>讨论区</el-divider>
            <div>
                <el-row>
                    <el-col span = "3">
                        <el-avatar :size="50" :src="circleUrl"></el-avatar>
                    </el-col>
                    <el-col span = "18">
                         <el-input
                            type="textarea"
                            rows="5"
                            placeholder="请输入内容"
                            v-model="comment">
                        </el-input>
                    </el-col>
                    <el-col span = "3">
                         <el-button type="primary" plain @click="publish()">提交</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect(1,1)">
                <el-menu-item index="1">按热度排序</el-menu-item>
                <el-menu-item index="2">按时间排序</el-menu-item>
            </el-menu>
            <div v-for="(per,i) in commentList" :key="i">
                <el-row style="height: 100px;">
                    <el-col span = "3">
                        <el-avatar :size="50" :src="per.avatorSite"></el-avatar>
                    </el-col>
                    <el-col span = "18">
                        <span>{{ per.comment }}</span>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
            </div>
        </div>
        <footerbar/>
    </div>
</template>

<script>
import navbar from '../navbars/navbar'
import footerbar from '../navbars/footerbar'
import '../../style/bootstrap.css'
import '../../style/hux-blog.css'
export default {
    name: 'postPage',
    components: {
        navbar,
        footerbar
    },
    data() {
        return {
            page: {},
            comment: '',
            commentList: []
        }
    },
    mounted() {
        this.getCommentList()
        this.getPageInfo()
    },
    computed: {
    },
    methods: {
        getPageInfo() {
            this.axios({
                method: 'post',
                data: {
                    id: this.$store.state.userInfo.id
                },
                url: 'findpostbyid'
            }).then(res=>{
                this.page = res.data.data
            })
        },
        getCommentList() {
            this.axios({
                method: 'post',
                data: {
                    postid: this.$store.state.userInfo.id
                },
                url:'/getcomments'
            }).then(res=>{
                this.commentList = res.data.data
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
        publish() {
            if(this.comment.length>=200) {
            alert('长度超出限制')
            return;
            }
            this.axios({
            method:'publish',
            data:{
                comment:this.comment
            },
            url:'/addcomment'
            }).then(
            alert('发布成功'),
            this.$store.commit('pulishcomment',res.data.data),
            this.getCommentList()
            )
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style type="scss">
    header.intro-header{
        position: relative;
        background-image: url(homepage-bg.jpg)
    }
    .self-input{
        width: 1000px;
        margin: 0 auto;
        margin-top:10px;
        height: 80px;

    }
    .user-face{
        width: 150px;
        height: 150px;
        float: left;
    }
    .input-container{
        display: table-cell;
        vertical-align: top;
        /*即使宽度设为2000px，元素的内容还是可以正常显示*/
        width: 2000px;
        height: 600px;
    }
    /* place left on bigger screen */
    @media all and (min-width: 800px) {
        .anchorjs-link{
            position: absolute;
            left: -0.75em;
            font-size: 1.1em;
            margin-top : -0.1em;
        }
    }
</style>
