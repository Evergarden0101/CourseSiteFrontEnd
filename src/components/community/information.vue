<template>
    <div class="inf-container">
      <el-container>
        <el-main style="background-color: white;margin-top: 50px">
          <el-row style="margin-top: 30px;text-align: left;font-size: 25px;font:bold;">
            查看通知信息
          </el-row>
          <el-row v-for="(item,index) in this.informationList" :key="index" style="margin-top: 30px; border-bottom: #C0C4CC 1px solid">
              <div v-if="item.read == false" >

                <el-row style="min-height: 40px;">
                  <el-col span="8" style="font: bold;font-size: 20px;text-align: left;padding-left: 20px">
                    {{item.topic}} | {{item.timestring}}
                  </el-col>
                  <el-col offset="8" span="8"  style="cursor: pointer;font-size: 15px;color:cadetblue">
                    <div @click="alreadyRead(item.id)">标记为已读</div>
                  </el-col>
                </el-row>
                <el-row style="padding-left: 20px;text-align:left;padding-bottom: 15px">
                  {{item.detail}}
                </el-row>

              </div>
              <div v-else>

                <el-row style="min-height: 40px;">
                <el-col span="8" style="font: bold;font-size: 20px;text-align: left;padding-left: 20px;color: #C0C4CC">
                  {{item.topic}} | {{item.timestring}}
                </el-col>
                <el-col offset="8" span="8"  style="font-size: 15px;color:cadetblue">
                  消息已读
                </el-col>
                </el-row>
                <el-row style="padding-left: 20px;text-align:left;padding-bottom: 15px;color: #C0C4CC">
                  {{item.detail}}
                </el-row>
              </div>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "information",
        mounted(){
          this.axios({
              method:'post',
              url:'receivemessage',
              headers:{'token':this.$store.state.userInfo.token},
          }).then(res=>{
              if(res.data.code == 1001){
                  this.informationList = res.data.data
                  console.log(this.informationList[0].timestring)
              }
              else{

              }
          })
        },
        data(){
            return{
              informationList:[]
            }
        },
        methods:{
            alreadyRead(id){
                // alert(1212)
                this.axios({
                    method:'post',
                    url:'/readmessage',
                    headers:{'token':this.$store.state.userInfo.token},
                    data:{
                        id:id
                    }
                }).then(res=>{
                    if(res.data.code == 1001){
                        this.informationList = res.data.data
                        var count = 0 , i = 0;
                        for(;i <this.informationList.length ; i++){
                            if(this.informationList[i].read == false)
                                count++;
                        }
                        this.$store.commit('setMessageNum',count)
                        // console.log(this.$store.state.messageNum)
                    }
                    else{
                        this.$message({
                            type:'info',
                            message:'操作异常'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .inf-container{
    padding-left: 10%;
    padding-right: 10%;
    background-color: #d9ecff;
    min-width: 100px;
    min-height: 600px;
    overflow: auto;
  }
</style>
