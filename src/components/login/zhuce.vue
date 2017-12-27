<template>
  <div id="bindphone" class="bindphone">
    <!--顶部的title  -->
    <mt-header title="注册">
        <div slot="left">
             <mt-button icon="back" onclick="history.back()"></mt-button>
        </div>
    </mt-header>
    <!--toast  -->
    <mu-toast v-if="snackbar" :message="toastmsg"/>
    <!--注册的box  -->
      <img class="zhuce_bg" src="../../assets/images/zhuce/beijing@2x.png" alt="" title=""/>
    <div class="zhuce_box">

      <!--手机号  发短信  -->
        <mu-flexbox class="yanzheng_box">
            <input type="number" class="telphone" id="telphone" v-model="telphoneNum" placeholder="请输入手机号" maxlength="11">
            <input class="yanzheng_btn" type="button" :disabled="disabled" v-model="text" @click="sendMsg()">
        </mu-flexbox>
        <!--验证码  -->
        <div  class="telphone_box">
            <input class="yanzheng_num" type="number" placeholder="验证码" v-model="yanzhengNum">
        </div>

        <!--登陆按钮  -->
        <div @click="nowRegister()">
            <mu-raised-button label="立即登录" class="demo-raised-button denglu_btn" secondary backgroundColor="#26a2ff" />
        </div>

        <!--用户协议  -->
        <div v-for="item of items" class="flex-demo">
             <mu-checkbox label="已阅读并同意" backgroundColor="#26a2ff" class="demo-checkbox agree_zhuce"  type="checkbox" v-model="item.agreeState" @click="alocked(item)"/>
            <span @click="open()">用户协议</span>
        </div>
    </div>
    <!--用户协议内容  -->
    <mu-dialog :open="dialog" title="Alert Dialog">
            只有点击确定按钮才可以关闭对话框
            <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
  </div>
</template>

<script>
// import timerBtn from '@/components/sendmsg';
export default {
  name: 'zhuce',
  data () {
    return {
      user_id:window.localStorage.user_id,
      access_token:window.localStorage.access_token,
      telphoneNum:"",//手机号
      yanzhengNum:'',//用户输入的验证码
      snackbar: false,//弹窗默认不显示
      toastmsg:"",//存储 弹窗的文字
      dialog: false,
      items: [{
              agreeState: true//用户协议默认选中状态
          }],
      bottomPopup: false,//存储用户协议   是否显示
      text:'获取验证码',
      disabled:false,
      time:60,
      type:window.localStorage.a

    }
  },
  created(){
    console.log(this.user_id)
  },
    methods:{
    closeToast(){
      // 定时关闭toast
      if (this.toastTimer) {
        clearTimeout(this.toastTimer)
        };
      this.toastTimer = setTimeout(() => { this.snackbar = false }, 2000)
    },
    alocked: function (item) {
      // 是否同意用户协议
          item.state = !item.state;
    },
    sendMsg(){

      var _this=this;
      this.showToast(_this.checkphone(_this.telphoneNum)===''?'短信发送成功':_this.checkphone(_this.telphoneNum));
      if(_this.checkphone(_this.telphoneNum)===''){
        console.log(444)
           this.axios({
            url: this.baseUrl.testUrl+"/sms/v1/send",
            method: 'POST',
            headers: {
              user_id:this.user_id,
              access_token:this.access_token,
            },
            params: {
              phone : this.telphoneNum
            }
          }).then(res=>{
            console.log(res.data)

            if(res.data.code == 1200){
                 // 验证码按钮不可点
                this.disabled = true
                // 倒计时
                let interval = window.setInterval(function () {
                  if ((_this.time--) <= 0) {
                      _this.disabled = false
                      _this.time = 60;
                      _this.text = '重新获取'
                      window.clearInterval(interval)
                  }else{
                    console.log(123)
                     _this.text = _this.time+"S"
                  }
                }, 1000)
            }else if(res.data.code == 1404){
              this.showToast("发送验证码次数已达上限");
            }else{
              this.showToast(res.data.msg);
            }
          });
        //验证手机号是否正确

      }
    },
    showToast(_msg){
      // 展示  toast
        this.snackbar = true;
        this.toastmsg=_msg;
        this.closeToast();
    },
    nowRegister(){
      var _this=this;

      if(!this.items[0].agreeState){
        // 检查是否同意用户协议
        this.showToast("未同意用户协议");
        return
      };
      if (this.checkphone(this.telphoneNum)!='') {
        // 检查手机号
        this.showToast(_this.checkphone(this.telphoneNum));
        console.log(132)
        return
      }
      if(this.yanzhengNum==''||this.yanzhengNum.length!=4){
        // 检查验证码
        this.showToast("验证码有误");
        return
      }
      console.log("绑定手机号时的user_id"+this.user_id)
      this.axios({
            url: this.baseUrl.testUrl+"/user/v1/bind",
            method: 'POST',
            headers: {
              user_id:this.user_id,
              access_token:this.access_token,
            },
            params: {
              type:this.type,
              code:this.yanzhengNum,
              phone:this.telphoneNum
            }
          }).then(res=>{
            console.log(res.data)
            window.localStorage.user_id = res.data.data.user_id
            if(res.data.code == 1200){
                this.$router.push({
                  name:"home"
                })
                console.log("跳转")
            }else{
              this.showToast("验证码有误");
            }
          })
    },
    open () {
      // 打开用户协议
      this.$router.push({
        name:"xieyi"
      })
    },
    close (position) {
      // 关闭用户协议
      this.dialog = false
    },
    checkphone:function(objval){
        var errormessage = '';
        var regx = /^(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(objval==""){
          errormessage = '请输入手机号!';
        }else{
          if(!!objval.match(regx)){
            errormessage = '';
          }else{
            errormessage = '请输入正确格式的手机号!';
          }
        }
        return errormessage;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  @import "../../assets/css/zhuce.css"
</style>
