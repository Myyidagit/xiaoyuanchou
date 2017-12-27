<template>
  <div id="zhannei">
    <mt-header title="意见反馈">
        <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button> 
      </router-link>
    </mt-header>
    <div class="headerBai"></div>
    <div>
      <mu-text-field hintText="请描述您的问题" :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" multiLine :rows="8" :rowsMax="10" :maxLength="255"/>
    </div>
    <div class="bottomButton" @click="submit()">
      <mu-raised-button label="提交反馈" class="demo-raised-button" secondary/>
    </div>
    <mu-dialog :open="dialog" @close="close">
       您输入的文字过多！
    </mu-dialog>
      <!--toast  -->
    <mu-toast v-if="snackbar" :message="toastmsg"/>
  </div>
</template>

<script>
export default {
  name: 'yijian',
  data () {
    return {
      user_id:window.localStorage.user_id,
      access_token:window.localStorage.access_token,
      snackbar: false,//弹窗默认不显示
      toastmsg:"",//存储 弹窗的文字
      msg: '意见',
      dialog: false,
      multiLineInputErrorText: '',
      yijiancontent:""
    }
  },
  created(){
  },
  methods:{
    showToast(_msg){
          // 展示  toast
          this.snackbar = true;
          this.toastmsg=_msg;
          this.closeToast(); 
        },
    closeToast(){
        // 定时关闭toast
        if (this.toastTimer) {
          clearTimeout(this.toastTimer)
        };
        this.toastTimer = setTimeout(() => { this.snackbar = false }, 2000)
    },
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? '超过啦！！！！' : ''
    },
    handleMultiLineOverflow (isOverflow) {
      this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
    },
    submit(){
      this.yijiancontent = $("textarea").val()
      if($("textarea").val().length > 255){
        this.dialog = true
      }else if($("textarea").val() == ""){
        this.showToast("反馈不能为空");
      }else{
         this.axios({            
              url: this.baseUrl.testUrl+"/sys/feedback/v1/feedback",
              method: 'POST',
              headers: {
                user_id:this.user_id,
                access_token:this.access_token
              },
              params: {
                message:this.yijiancontent,
              }
          }).then(res=>{
              if(res.data.code == 1200){
                this.showToast("反馈成功");                
              }else{
                this.showToast("反馈失败");
              } 
          }).catch(function (err) {
              console.log(err)                
          })
      }
    },
    close () {
      this.dialog = false
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
  #zhannei{
    .mint-header{
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: #26a2ff;
      box-sizing: border-box;
      color: #fff;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      font-size: 14px;
      height: 1.0rem;
      line-height: 1;
      padding: 0 0.25rem;
      position: fixed;
      z-index: 66666;
      top: 0;
      width: 100%;
      text-align: center;
      white-space: nowrap;
    }
    .headerBai{
      width: 100%;
      height: 1.025rem;
    }
    .mu-text-field{
      width: 96%;
      height: auto;
      background: #fff;
      margin-left: 2%;
      margin-top: 0.25rem;
    }
      .mu-text-field{
          /*display: none*/
      }
      .bottomButton{
        width: 6.25rem;
        margin: 0 auto;
        .mu-raised-button-secondary{
          background: #3993e9;
          width: 6.25rem;
          height: 1.25rem;
          border-radius: 0.625rem;

        }
      }
  }
</style>
