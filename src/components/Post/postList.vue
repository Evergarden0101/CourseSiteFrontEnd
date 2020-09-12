<template>
    <div>
        <header class="intro-header" style="background-image: url(homepage-bg.jpg);">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 ">
                        <div class="site-heading">
                            <h1>{{ PostTitle }}</h1>
                            <!--<hr class="small">-->
                            <span class="subheading">{{ Description }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- Main Content -->
        <div class="container">
            <div class="row">
        <!-- USE SIDEBAR -->
            <!-- PostList Container -->
                    <div class="
                        col-lg-8 col-lg-offset-1
                        col-md-8 col-md-offset-1
                        col-sm-12
                        col-xs-12
                        postlist-container
                    ">
                        {{ content }}
                    </div>
            <!-- Sidebar Container -->
                    <div class="
                        col-lg-3 col-lg-offset-0
                        col-md-3 col-md-offset-0
                        col-sm-12
                        col-xs-12
                        sidebar-container
                    ">

                        <!-- Short About -->
                        <section class="visible-md visible-lg">
                            <hr><h5><a href="/hello/">ABOUT US</a></h5>
                            <div class="short-about">
                                    <a href="/hello">
                                        <img src="../../assets/lala.jpg"/>
                                    </a>
                                    <p>{{siteDescription}}</p>
                                <!-- SNS Link -->
                                <ul class="list-inline">
                                    <li>
                                        <a target="_blank" href="https://github.com/KLlllly">
                                            <span class="fa-stack fa-lg">
                                                <i class="fa fa-circle fa-stack-2x"></i>
                                                <i class="fa fa-github fa-stack-1x fa-inverse"></i>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
            </div>
        </div>
    </div>            
</template>

<script>
export default {
    name: 'postList',
    data() {
        return {
            PostTitle: 'java',
            content: '111111',
            Description: 'hahhahah',
            siteDescription: 'this is a site description'
        }
    }
}
</script>

<style scoped>
@import '../../style/hux-blog';
</style>