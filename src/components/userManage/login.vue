<template>
    <el-container>
      <div class="background">
        <img src="../../assets/login1.jpg" width="100%" height="100%">
      </div>
      <el-main>
        <div class="loginBody" >
        <el-row>
<!--          <el-col span="16">-->
<!--          </el-col>-->
          <el-col offset="8"   span="8">
            <el-tabs v-model="loginType" @tab-click="handleClick" class="el-tabs__item"  :header-cell-style="{background:'#eef1f6',color:'#606266'}">
              <el-tab-pane label="用户登录" name="first" style="color: azure">
                <div class="input-item">
                    用户名：
                    <el-input v-model="userName" placeholder="请输入用户名" class="input"></el-input>
                </div>
                <div class="input-item">
                  密码：
                  <el-input v-model="passwd" placeholder="请输入密码" class="input" type="password"></el-input>
                </div>
                <div class="submit-btn">
                  <el-button class="btn" type="info" @click="signin" plain>登录
                  </el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="用户注册" name="second" style="color: azure">
                <div class="input-item">
                  用户名：
                  <el-input v-model="userName" placeholder="请输入用户名(真实姓名)" class="input"></el-input>
                </div>
                <div class="input-item">
                  学号：
                  <el-input v-model="stuId" placeholder="请输入学号" class="input"></el-input>
                </div>
                <div class="input-item">
                  手机号：
                  <el-input v-model="phoneNum" placeholder="请输入手机号" class="input"></el-input>
                </div>
                <div class="input-item">
                  邮箱：
                  <el-input v-model="email" placeholder="请输入邮箱" class="input"></el-input>
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
                  <el-button type="info" class="btn" @click="signup" plain>注册用户
                  </el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
        </div>
      </el-main>
    </el-container>
</template>

<style>
  .el-main{
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
  .background{
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
  }
  .loginBody{
    z-index: 1;
    position: absolute;
    width: 97%;
  }
  .el-tabs__item{
    color:azure;
    width: 100%;
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
                conPasswd:'',
                phoneNum:'',
                email:''
            };
        },
        mounted(){
          console.log(this.$store.state.count)
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            signin(){
              this.axios({
                  method:'post',
                  data:{
                      id:this.userName,
                      password:this.passwd
                  },
                  url:'/login'
              }).then(res=>{
                  if(res.data.code == 1001){
                      this.$message({
                          type:'info',
                          message:'登录成功',
                          showClose: true
                      })
                      // alert("111")
                      // console.log(res.data)
                      this.$store.commit('setUserInfo',res.data.data)
                      this.$router.push('/community')
                      // console.log(this.$store.state)
                      // this.$router.push({path: '/'});
                  }
                  else{
                      this.$message({
                          type:'info',
                          message:'登录失败',
                          showClose: true
                      })
                  }
              })
            },
            signup(){
                // console.log(this.passwd)
                if(this.passwd != this.conPasswd){
                    this.$message({
                        type:'info',
                        message:"两次密码不一致",
                        showClose: true
                    })
                    return
                }
                this.axios({
                    method:'post',
                    data:{
                        input:this.input,
                        username:this.userName,
                        id:this.stuId,
                        password:this.passwd,
                        phone:this.phoneNum,
                        email: this.email
                    },
                    url:'/register'
                }).then(res=>{
                    console.log(res.data.code)
                    if(res.data.code == 1001){
                        this.$message({
                            type:'info',
                            message:'注册成功',
                            showClose: true
                        })
                        this.$store.commit('setUserInfo',res.data.data)
                        this.$router.push('/community')
                        // this.$router.push({path: '/'});
                    }
                    else{
                        this.$message({
                            type:'info',
                            message:'注册失败',
                            showClose: true
                        })
                    }
                })
            },
            tableHeaderColor({ rowIndex}) {
                if (rowIndex === 0) {
                    return 'background-color: lightblue;color: #000000;font-weight: 500;'
                }
            },
        }
    };
</script>
