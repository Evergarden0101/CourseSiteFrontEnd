<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col span="16">
            可放置背景图片
          </el-col>
          <el-col  span="8">
            <el-tabs v-model="loginType" @tab-click="handleClick">
              <el-tab-pane label="用户登录" name="first">
                <div class="input-item">
                    用户名：
                    <el-input v-model="userName" placeholder="请输入用户名" class="input"></el-input>
                </div>
                <div class="input-item">
                  密码：
                  <el-input v-model="passwd" placeholder="请输入密码" class="input" type="password"></el-input>
                </div>
                <div class="submit-btn">
                  <el-button type="info" class="btn">登录
                  </el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="用户注册" name="second">
                <div class="input-item">
                  用户名：
                  <el-input v-model="userName" placeholder="请输入用户名" class="input"></el-input>
                </div>
                <div class="input-item">
                  学号：
                  <el-input v-model="stuId" placeholder="请输入学号" class="input"></el-input>
                </div>
                <div class="input-item">
                  密码：
                  <el-input v-model="passwd" placeholder="请输入密码" class="input" type="password"></el-input>
                </div>
                <div class="input-item">
                  确认密码：
                  <el-input v-model="conPasswd" placeholder="请输入重新输入密码" class="input" type="password"></el-input>
                </div>
                <div class="submit-btn">
                  <el-button type="info" class="btn">注册用户
                  </el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<style>
  .el-mian{
    width: 90vw;
    min-width: 800px;
    /* border: solid; */
    margin-left: auto;
    margin-right: auto;
  }
  .input-item{
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }
  .input{
    width: 70%;
    margin-right: 30px;
  }
  .submit-btn{
    margin-top: 30px;
    width: 100%;
    align-items: center;
  }
  .btn{
    width: 70%;
  }
</style>
<script>
    export default {
        data() {
            return {
                loginType: 'first',
                userName:'',
                stuId:'',
                passwd:'',
                conPasswd:''
            };
        },
        mounted(){
          console.log(this.$route)
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>
