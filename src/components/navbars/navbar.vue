
<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash; Navigation &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <nav class="navbar navbar-default navbar-custom navbar-fixed-top">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="container-fluid">&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;!&ndash; Brand and toggle get grouped for better mobile display &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="navbar-header page-scroll">&ndash;&gt;-->
<!--&lt;!&ndash;                <button type="button" class="navbar-toggle" @click="buttonClick">&ndash;&gt;-->
<!--&lt;!&ndash;                    <span class="sr-only">Toggle navigation</span>&ndash;&gt;-->
<!--&lt;!&ndash;                    <span class="icon-bar"></span>&ndash;&gt;-->
<!--&lt;!&ndash;                    <span class="icon-bar"></span>&ndash;&gt;-->
<!--&lt;!&ndash;                    <span class="icon-bar"></span>&ndash;&gt;-->
<!--&lt;!&ndash;                </button>&ndash;&gt;-->
<!--&lt;!&ndash;                <a class="navbar-brand" :href="site.baseurl">{{ site.title }}</a>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;!&ndash; Collect the nav links, forms, and other content for toggling &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;            <div id="huxblog_navbar">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="navbar-collapse">&ndash;&gt;-->
<!--&lt;!&ndash;                    <ul class="nav navbar-nav navbar-right">&ndash;&gt;-->
<!--&lt;!&ndash;                        <li>&ndash;&gt;-->
<!--&lt;!&ndash;                            <a :href="site.baseurl">Home</a>&ndash;&gt;-->
<!--&lt;!&ndash;                        </li>&ndash;&gt;-->
<!--&lt;!&ndash;                        <li>&ndash;&gt;-->
<!--&lt;!&ndash;                            <a :href="site.baseurl">About</a>&ndash;&gt;-->
<!--&lt;!&ndash;                        </li>&ndash;&gt;-->
<!--&lt;!&ndash;                    </ul>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;!&ndash; /.navbar-collapse &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash; /.container &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    </nav>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<script>&ndash;&gt;-->
<!--&lt;!&ndash;export default {&ndash;&gt;-->
<!--&lt;!&ndash;    name: 'navbar',&ndash;&gt;-->
<!--&lt;!&ndash;    data() {&ndash;&gt;-->
<!--&lt;!&ndash;        return {&ndash;&gt;-->
<!--&lt;!&ndash;            site: {baseurl: '', title: 'yuketang'}&ndash;&gt;-->
<!--&lt;!&ndash;        }&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    methods: {&ndash;&gt;-->
<!--&lt;!&ndash;        buttonClick() {&ndash;&gt;-->
<!--&lt;!&ndash;            var $navbar = document.querySelector('#huxblog_navbar');&ndash;&gt;-->
<!--&lt;!&ndash;            if ($navbar.className.indexOf('in') > 0) {&ndash;&gt;-->
<!--&lt;!&ndash;                this.huxNavClose()&ndash;&gt;-->
<!--&lt;!&ndash;            }else{&ndash;&gt;-->
<!--&lt;!&ndash;                this.huxNavOpen()&ndash;&gt;-->
<!--&lt;!&ndash;            }&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        huxNavClose() {&ndash;&gt;-->
<!--&lt;!&ndash;            var $navbar = document.querySelector('#huxblog_navbar');&ndash;&gt;-->
<!--&lt;!&ndash;            var $collapse = document.querySelector('.navbar-collapse');&ndash;&gt;-->
<!--&lt;!&ndash;            $navbar.className = " ";&ndash;&gt;-->
<!--&lt;!&ndash;                // wait until animation end.&ndash;&gt;-->
<!--&lt;!&ndash;                setTimeout(function(){&ndash;&gt;-->
<!--&lt;!&ndash;                    // prevent frequently toggle&ndash;&gt;-->
<!--&lt;!&ndash;                    if($navbar.className.indexOf('in') < 0) {&ndash;&gt;-->
<!--&lt;!&ndash;                        $collapse.style.height = "0px"&ndash;&gt;-->
<!--&lt;!&ndash;                    }&ndash;&gt;-->
<!--&lt;!&ndash;                },400)&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        huxNavOpen() {&ndash;&gt;-->
<!--&lt;!&ndash;            var $navbar = document.querySelector('#huxblog_navbar');&ndash;&gt;-->
<!--&lt;!&ndash;            var $collapse = document.querySelector('.navbar-collapse');&ndash;&gt;-->
<!--&lt;!&ndash;            $collapse.style.height = "auto"&ndash;&gt;-->
<!--&lt;!&ndash;            $navbar.className += " in";&ndash;&gt;-->
<!--&lt;!&ndash;        }&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->
<!--=======-->
<!--<template>-->
<!--    &lt;!&ndash; Navigation &ndash;&gt;-->
<!--    <nav class="navbar navbar-default navbar-custom navbar-fixed-top">-->
<!--        <div class="container-fluid">-->
<!--            &lt;!&ndash; Brand and toggle get grouped for better mobile display &ndash;&gt;-->
<!--            <div class="navbar-header page-scroll">-->
<!--                <button type="button" class="navbar-toggle" @click="buttonClick">-->
<!--                    <span class="sr-only">Toggle navigation</span>-->
<!--                    <span class="icon-bar"></span>-->
<!--                    <span class="icon-bar"></span>-->
<!--                    <span class="icon-bar"></span>-->
<!--                </button>-->
<!--                <a class="navbar-brand" :href="site.baseurl">{{ site.title }}</a>-->
<!--            </div>-->
<!--            &lt;!&ndash; Collect the nav links, forms, and other content for toggling &ndash;&gt;-->
<!--            <div id="huxblog_navbar">-->
<!--                <div class="navbar-collapse">-->
<!--                    <ul class="nav navbar-nav navbar-right">-->
<!--                        <li>-->
<!--                            <a href="/community" style="font-size: 15px; font-weight: 900">社区论坛</a>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <a href="/hello" style="font-size: 15px; font-weight: 900">个人空间</a>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <a href="/" style="font-size: 15px; font-weight: 900">退出登录</a>-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </div>-->
<!--            </div>-->
<!--            &lt;!&ndash; /.navbar-collapse &ndash;&gt;-->
<!--        </div>-->
<!--        &lt;!&ndash; /.container &ndash;&gt;-->
<!--    </nav>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--    name: 'navbar',-->
<!--    data() {-->
<!--        return {-->
<!--            site: {baseurl: '', title: 'yuketang'}-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        buttonClick() {-->
<!--            var $navbar = document.querySelector('#huxblog_navbar');-->
<!--            if ($navbar.className.indexOf('in') > 0) {-->
<!--                this.huxNavClose()-->
<!--            }else{-->
<!--                this.huxNavOpen()-->
<!--            }-->
<!--        },-->
<!--        huxNavClose() {-->
<!--            var $navbar = document.querySelector('#huxblog_navbar');-->
<!--            var $collapse = document.querySelector('.navbar-collapse');-->
<!--            $navbar.className = " ";-->
<!--                // wait until animation end.-->
<!--                setTimeout(function(){-->
<!--                    // prevent frequently toggle-->
<!--                    if($navbar.className.indexOf('in') < 0) {-->
<!--                        $collapse.style.height = "0px"-->
<!--                    }-->
<!--                },400)-->
<!--        },-->
<!--        huxNavOpen() {-->
<!--            var $navbar = document.querySelector('#huxblog_navbar');-->
<!--            var $collapse = document.querySelector('.navbar-collapse');-->
<!--            $collapse.style.height = "auto"-->
<!--            $navbar.className += " in";-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--    @import '../post/bootstrap1.css';-->
<!--    @import '../post/hux-blog1.css';-->
<!--</style>-->
<!--&gt;>>>>>> b57e1b12bfdad88dc3e1ad41a87025a9a44a0c66-->
