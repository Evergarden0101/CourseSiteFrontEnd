<template>
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-custom navbar-fixed-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" @click="buttonClick">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" :href="site.baseurl">{{ site.title }}</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div id="huxblog_navbar">
                <div class="navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a :href="site.baseurl">Home</a>
                        </li>
                        <li>
                            <a :href="site.baseurl">About</a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            site: {baseurl: '', title: 'yuketang'}
        }
    },
    methods: {
        buttonClick() {
            var $navbar = document.querySelector('#huxblog_navbar');
            if ($navbar.className.indexOf('in') > 0) {
                this.huxNavClose()
            }else{
                this.huxNavOpen()
            }
        },
        huxNavClose() {
            var $navbar = document.querySelector('#huxblog_navbar');
            var $collapse = document.querySelector('.navbar-collapse');
            $navbar.className = " ";
                // wait until animation end.
                setTimeout(function(){
                    // prevent frequently toggle
                    if($navbar.className.indexOf('in') < 0) {
                        $collapse.style.height = "0px"
                    }
                },400)
        },
        huxNavOpen() {
            var $navbar = document.querySelector('#huxblog_navbar');
            var $collapse = document.querySelector('.navbar-collapse');
            $collapse.style.height = "auto"
            $navbar.className += " in";
        }
    }
}
</script>