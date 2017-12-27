<template>
  <div id="userinfo">
        <mt-header title="我的资料">
        <div slot="left">
             <mt-button icon="back" @click="toCenter()"></mt-button> 
        </div>
        </mt-header>
        <div class="headerBai"></div>
    <div>
      <mt-cell title="头像" is-link>
        <span class="userInfo_logo">
            <div class="form-group">
              <form id="upload_poster" action="http://up-z1.qiniu.com/" method="post" enctype="multipart/form-data">
                <div class="userInfo_tou">
                  <input name="token" type="hidden" v-model="uploadToken">
                  <input type="file" name="file" @change="upload_poster_background"/>
                </div>
              </form>
            </div>
        </span>
      </mt-cell>
    </div >
    <div @click="nicheng()">
      <mt-cell title="昵称" is-link>
        <span>{{ this.userName }}</span>
      </mt-cell>
    </div>
    <div @click="shiming()">
      <mt-cell title="实名认证" is-link>
          <span v-if="user.realname == 1">未认证</span>
          <span v-else-if="user.realname == 2">已认证</span>
          <span v-else-if="user.realname == 3">审核中</span>
          <span v-else-if="user.realname == 4">认证失败</span>
      </mt-cell>
    </div>
    <div @click="bangpho('zhuce')">
      <mt-cell title="绑定手机号" is-link>
          <span v-if="user.status_desc">{{ user.status_desc }}</span>
          <span v-else>未绑定</span>
      </mt-cell>
    </div>
    <div @click="sanfang('sanfang')">
      <mt-cell title="绑定第三方账户" is-link >
          <span></span>
      </mt-cell>
    </div>
     <!--退出登陆按钮  -->
    <div class="tuichu" v-show="signOut">
        <button  @click="tuichu()">退出登录</button>
    </div>
    <!--toast  -->
    <mu-toast v-if="snackbar" :message="toastmsg"/>
    <!-- 修改昵称 -->

      <mu-dialog :open="dialog" title="">
          <input class="new_name" v-model="userChangeName" type="text" placeholder="输入新昵称"/>
          <mu-flat-button  class="amend_name_btn" slot="actions" @click="closeDialog" primary label="取消"/>
          <mu-flat-button  class="amend_name_btn" slot="actions" primary @click="changeName()" label="确定"/>
      </mu-dialog>
  </div>
</template>
<script>
import global from '../../assets/js/Global'
 import '../../assets/js/jquery.form/jquery.form'
export default {
  name: 'userinfo',
  data () {
    return {
      msg: 'homec',
      user:{},
      userName:"",
      renZheng:true,
      shenHe:false,
      user_id:window.localStorage.user_id,
      access_token:window.localStorage.access_token,
      uploadToken: "",          //上传图片凭证
      form:{
        poster:''//海报
      },
      snackbar: false,//弹窗默认不显示
      toastmsg:"",//存储 弹窗的文字
      userChangeName:"",
      dialog: false,   //修改昵称   layer  的状态
      signOut:false
    }
  },
  methods:{
    toCenter(){
      if(this.form.poster){
          
          this.$router.push({
            name:"center",
            query:{
              myImg:this.form.poster,
              nickname:this.userName
            }
          })
      }else{
          this.$router.push({
            name:"center",
            query:{
              myImg:this.user.portrait,
              nickname:this.userName
            }
          })
      }
      
    },
    sanfang(i){
      this.$router.push({
              name: i,
              query: {
                qq:this.user.qq,
                weibo:this.user.weibo,
                wechat:this.user.wechat
              }
      })
    },
    bangpho(i){
      if(this.user.status_desc){
        this.showToast("你已绑定")
      }else{
        this.$router.push({
          name: i,
          params: {

          }
        })
      }       
    },
    nicheng(){
      this.dialog = true
    },
    shiming(){
      if(this.user.realname == 1){
        this.$router.push({
          name: "realname",
          params: {
            
          }
        })
      }else if(this.user.realname == 2){
        this.showToast("您已认证")
      }else if(this.user.realname == 3){
        this.showToast("审核中")
      }else if(this.user.realname == 4){
        this.$router.push({
          name: "realname"
        })
      }      
    },
     //上传机构Logo时显示上传图片
     upload_poster_background (e) {
      var _this = this;
      var file = e.target.files[0];
      var supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (file && supportedTypes.indexOf(file.type) >= 0) {
        this.form.poster = this.getImgUrl(file);
        $(".userInfo_tou").css("backgroundImage","url("+this.form.poster+")");
         $('#upload_poster').ajaxSubmit(function (data) {
            var userLogo = data.hash;
            _this.axios({
              url: _this.baseUrl.testUrl+"/user/v1/portrait",
              method: 'POST',
              headers: {
                user_id:_this.user_id,
                access_token:_this.access_token
              },
              params: {             
                portrait : userLogo             
              }
            }).then(res=>{
                console.log(res.data)             
            }).catch(function (err) {
                console.log(err)
            })
            console.log(userLogo)
            //提交数据           
         })
      } else {
        alert('文件格式只支持：jpg、jpeg 和 png');
      }
    },
      //点击图片上传，选择图片后，及时预览时获取图片url
    getImgUrl:function (file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
      }
      return url;
    },
    tuichu(){
      this.axios({
            url: this.baseUrl.testUrl+"/user/v1/exit",
            method: 'POST',
            headers: {
              user_id:this.user_id,
              access_token:this.access_token
            },
            params: {             
              type : window.localStorage.type             
            }
          }).then(res=>{
              console.log(res.data.data)
              if(res.data.code == 1200){
                 window.localStorage.removeItem('user_id');
                 window.localStorage.removeItem('access_token')
                 window.localStorage.removeItem('type')
                 window.localStorage.removeItem('openid')
                 this.signOut = false
                 this.$router.push({
                    name:"home"
                 })
              }                          
          }).catch(function (err) {
              console.log(err)
          })
    },
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
    changeName () {
      this.axios({
              url: this.baseUrl.testUrl+"/user/v1/nickname",
              method: 'POST',
              headers: {
                user_id:this.user_id,
                access_token:this.access_token
              },
              params: {             
                nickname : this.userChangeName             
              }
            }).then(res=>{
                console.log(res.data) 
                if(res.data.code == 1200){
                  this.dialog = false
                  this.userName = this.userChangeName
                }            
            }).catch(function (err) {
                console.log(err)
            })
    },
    closeDialog(){
      this.dialog = false
    }
  },
  created(){
    console.log(window.localStorage.user_id)
    console.log(window.localStorage.access_token)
    
    if(window.localStorage.user_id && window.localStorage.access_token){
      console.log("进来了")
        this.axios({
              url: this.baseUrl.testUrl+"/user/v1/info",
              method: 'POST',
              headers: {
                user_id:this.user_id,
                access_token:this.access_token
              },
              params: {             
                       
              }
            }).then(res=>{
                console.log(res.data)

                this.user = res.data.data;
                this.userName = res.data.data.nickname;
                $(".userInfo_tou").css("backgroundImage","url("+res.data.data.portrait+")");
                this.signOut = true
            }).catch(function (err) {
                console.log(err)
            });
        this.axios({
              url: this.baseUrl.testUrl+"/qiniu/v1/getSimplicityToken",
              method: 'GET',
              headers: {
                user_id:window.localStorage.user_id,
                access_token:window.localStorage.access_token
              },
              params: {             
                bucket:'tbd-images'     
              }
            }).then(res=>{
                console.log(res.data)
                this.uploadToken = res.data.data
            }).catch(function (err) {
                console.log(err)
            });   
    }
   
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  @import "../../assets/css/userInfo.css"

</style>
