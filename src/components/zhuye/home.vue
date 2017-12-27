<template>
  <div id="home">
    <!-- 头部 -->
    <div class="header">
      <div class="menu" @click="openMask()"></div>
      <div class="title">校园创筹</div>
      <div class="share" @click="open('bottom')"></div>
    </div>
    <!-- 将内容顶下来的空白 -->
    <div class="bai"></div>

    <!-- banner图 -->
    <div class="banner">

      <div class="chou" @click="toZhongChou()">
        发起众筹</div>

    </div>
    <!-- 列表 二级路由 -->
    <div class="navList clear">
      <figure @click="upclassification(0)">
        <p>综合推荐</p>
        <!-- <img src="../../assets/images/shouye/zonghetuijian@2x.png" height="47" width="48">
                <figcaption>
                  <p>综合推荐</p>
                </figcaption> -->
      </figure>

      <figure @click="upclassification(1)">
        <p>活动策划</p>
        <!-- <img src="../../assets/images/shouye/huodongcehua@2x.png" height="46" width="55" slot="left">
                <figcaption>
                  <p>活动策划</p>
                </figcaption> -->
      </figure>

      <figure @click="upclassification(2)">
        <p>作品制作</p>
        <!-- <img src="../../assets/images/shouye/zuopinzhizuo@2x.png" height="49" width="49">
                <figcaption>
                  <p>作品制作</p>
                </figcaption> -->
      </figure>
      <figure @click="upclassification(3)">
        <p>创业项目</p>
        <!-- <img src="../../assets/images/shouye/chuangyexiangmu@2x.png" height="47" width="48">
                <figcaption>
                  <p>创业项目</p>
                </figcaption> -->
      </figure>

    </div>
    <!-- 吸顶灯效果 -->
    <!-- <div id="dongTai" v-show="xidingdeng">
              <li v-for="(item,i) in navList" @click="huan(i)" :class="{dongTai_bottom:i == index}">{{ item.name }}</li>
            </div> -->
    <homea :listVos="listVos"></homea>
    <!-- 下拉加载更多 -->
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
    <ul class="layer layer_l" :class="[isShowLeftMask ? 'show' : '']">
      <div class="menuList">
        <ul>
          <li>
            <div class="user">
              <div class="touXiang" @click="toCenter()">
                <div v-if="deng">
                  <img :src="myImg">
                </div>
                <div v-else>
                  <img src="../../assets/images/shouye/morentouxiang@2x.png" alt="">
                </div>
              </div>
              <span v-if="feideng">
                <span>
                  <router-link to="/login">登陆
                  </router-link>
                </span>/
                <span>
                  <router-link to="login">注册
                  </router-link>
                </span>
              </span>

              <div class="userName" v-if="deng" @click="toCenter()">
                {{ this.user }}
              </div>
            </div>
          </li>
          <li @click="toZhannei()" class="zhanNei">
            站内消息
            <span v-if="allMsg >=1">{{ allMsg }}</span>
          </li>
          <li @click="toYiJian()">
            意见反馈
          </li>
          <li @click="toXieyi()">
            用户协议
          </li>
          <li @click="toAboutus()">
            关于我们
          </li>
          <li v-show="backlogin" @click="back()">
            退出登录
          </li>
        </ul>
      </div>
    </ul>
    <div class="layer_mask" @click="openMask()"></div>
    <div class="share_zhe" @click="close_share_zhe()" v-show="share_zhe_show">
      <img src="../../assets/images/shouye/shareguild.png" alt="">
    </div>
    <!-- </mu-popup> -->
    <!-- 下边模态框 -->
    <mu-popup position="bottom" popupClass="aaaa" :open="bottomPopup" @close="close('bottom')">
      <!-- <p class="quxiao" @click="close('bottom')">
                  取消
                </p> -->
      <mu-content-block>
        <div class="shareList">
          <figure id="fen_weixinFriend" @click="fen_weixinFriend('wechatFriend')">
            <img src="../../assets/images/shouye/weixin@2x.png" height="30" width="30">
            <figcaption>
              <p>微信</p>
            </figcaption>
          </figure>
          <figure id="fen_wechatTimeline" @click="fen_wechatTimeline('wechatTimeline')">
            <img src="../../assets/images/shouye/penyouquan@2x.png" height="60" width="60">
            <figcaption>
              <p>朋友圈</p>
            </figcaption>
          </figure>
          <figure @click="fen_QQ('qqFriend')">
            <img src="../../assets/images/shouye/qq@2x.png" height="60" width="60">
            <figcaption>
              <p>QQ</p>
            </figcaption>
          </figure>
          <figure @click="fen_QQzone()">
            <img src="../../assets/images/shouye/QQkongjian@2x.png" height="60" width="60">
            <figcaption>
              <p>QQ空间</p>
            </figcaption>
          </figure>
          <figure @click="shareWeibo()">
            <img src="../../assets/images/shouye/weibo@2x.png" height="60" width="60">
            <figcaption>
              <p>微博</p>
            </figcaption>
          </figure>
          <figure class="copyBtn" :data-clipboard-text="this.share.url">
            <img src="../../assets/images/shouye/fuzhilianjie@2x.png" height="60" width="59">
            <figcaption>
              <p>复制链接</p>
            </figcaption>
          </figure>
        </div>

      </mu-content-block>
      <p class="quxiao" @click="close('bottom')">
        取消
      </p>
    </mu-popup>
    <mu-dialog :open="dialog" title="">
      <p>{{ shenheStatus }}</p>
      <mu-flat-button class="amend_name_btn" slot="actions" @click="closeDialog" primary label="取消" />
      <mu-flat-button class="amend_name_btn" slot="actions" primary @click="toshiMing()" label="确定" />
    </mu-dialog>
    <!--toast  -->
    <mu-toast v-if="snackbar" :message="toastmsg" />
  </div>
</template>

<script>
import Homea from './homea.vue'
import util from "../../assets/js/Util.js"
import $ from "jquery"
import Http from "../../assets/js/common.js"
import { Indicator } from 'mint-ui';
import NativeShare from 'nativeshare'
import wx from 'weixin-js-sdk'
export default {
  name: 'hello',
  data() {
    return {
      isShowLeftMask: false,//左边模态框
      nativeShare: "",//分享插件中的函数
      code: "",
      deng: false,
      feideng: true,
      msg: 'nihao',
      myImg: "",
      user: "",
      realname: "",//用户的认证状态
      award: {},
      num: 0,
      leftPopup: false,
      bottomPopup: false,
      xidingdeng: false,
      scrollFlag: true,
      backlogin: false,
      listVos: [],
      classification: 0,
      scrollHeight: window.localStorage.sch,
      shareurl: window.location,
      navList: [
        { name: "全部" },
        { name: "即将结束" },
        { name: "金额最多" },
        { name: "人数最多" },
        { name: "即将" }
      ],
      index: '',
      share: {
        title: "校园创筹测试title",
        url: 'http://xiaoyuanchou.casiec.cn',
        picurl: "http://img.lezanapp.com/video/screen1704c_62eb_2233_57bab9a3468a.png@!vm"
      },
      snackbar: false,//弹窗默认不显示
      toastmsg: "",//存储 弹窗的文字
      loading: false,//下拉刷新
      scroller: null,//下拉刷新
      allPage: 0,//总页数
      page: 1,//当前页
      allMsg: "",
      toastmsg: "授权失败",
      type: window.localStorage.a,
      user_id: window.localStorage.user_id,
      access_token: window.localStorage.access_token,
      weixinFriend: "",//分享到微信好友的函数
      //微信分享的东西
      imgUrl: "http://www.gdibn.com/m/images/logo.png",  //图片LOGO注意必须是绝对路径
      lineLink: "http://www.gdibn.com/m/images/",   //网站网址，必须是绝对路径
      descContent: '互动网络(www.gdibn.com)10年的网站开发经验,专注于网站建设，网店开发，广州SEO，企业网站设计，网站企业模板，广州网站设计，网站报价，企业网站设计，域名，空间，服务器等相关服务，著名的广州网站建设公司。自始至终，我们真心对待每一位客户。', //分享给朋友或朋友圈时的文字简介
      shareTitle: '广州网站建设_网站推广公司_网站优化_互动网络',  //分享title
      appid: '',//apiID，可留空
      share_zhe_show: false,//控制分享遮罩
      dialog: false,//控制是否去实名认证
      shenheStatus: "是否去实名审核"
    }
  },
  components: {
    Homea
  },
  methods: {
    // 下拉刷新
    loadMore() {
      this.loading = true
      if (this.page >= this.allPage) {
        this.loading = false
      } else {
        setTimeout(() => {
          this.loading = false
          this.page += 1
          this.updata()
        }, 2000)
      }

    },
    //关闭去实名的弹出框
    closeDialog() {
      this.dialog = false
    },
    //是否去实名
    toshiMing() {
      this.dialog = false;

      this.$router.push({
        name: "realname"
      })
    },
    homed() {
      this.$router.push({
        name: "homed"
      })
    },
    close_share_zhe() {
      this.share_zhe_show = false;
      $('body').css({ position: "static" });
    },
    open(position) {
      if (this.isWeiXin()) {
        this.share_zhe_show = true;
        $('body').css({ position: "fixed" });
      } else {
        this[position + 'Popup'] = true
      }
    },
    //打开左边模态框
    openMask() {
      this.isShowLeftMask = !this.isShowLeftMask;
      if (this.isShowLeftMask == true) {
        $('body').css({ position: "fixed" });
      } else {
        $('body').css({ position: "static" });
      }
    },
    close(position) {
      this[position + 'Popup'] = false
    },
    //发布众筹按钮
    toZhongChou() {
      if (window.localStorage.access_token) {
        if (this.realname.realname == 2) {
          this.$router.push({
            name: "zhongchou"
          })
        } else if (this.realname.realname == 1 || this.realname.realname == 4) {
          this.dialog = true
        } else {
          this.showToast("身份正在审核中，请耐心等待")
        }

      } else {
        this.$router.push({
          name: "login"
        })
      }
    },
    // 改变导航条颜色
    huan(key) {
      this.index = key;
    },
    // 点击四个导航块
    upclassification(i) {
      this.classification = i;
      this.page = 1;
      var doc = document.querySelectorAll(".banner")[0];
      var dob = document.querySelectorAll(".navList")[0];
      var height = doc.offsetHeight + dob.offsetHeight;
      console.log(height);
      $("body").animate({ scrollTop: height }, 400);
      this.getdata()
    },
    // 下拉刷新数据
    updata() {
      this.axios({
        url: this.baseUrl.testUrl + "/entry/v1/list",
        method: 'POST',
        params: {
          classification: this.classification,
          page: this.page,
          rows: 10
        }
      }).then(res => {

        res.data.data.listVos.map(item => {
          this.listVos.push(item)
        })
      })
    },
    getdata() {
      this.axios({
        url: this.baseUrl.testUrl + "/entry/v1/list",
        method: 'POST',
        params: {
          classification: this.classification,
          page: this.page,
          rows: 10
        }
      }).then(res => {
        this.listVos = res.data.data.listVos
        this.allPage = res.data.data.pageTotal;
        console.log("总页数" + this.allPage)
        console.log(res.data.data)
      })
    },
    toCenter() {
      if (window.localStorage.access_token && window.localStorage.openid && window.localStorage.type && window.localStorage.user_id) {
        this.$router.push({
          name: "center",
          query: {
            myImg: this.myImg,
            nickname: this.user
          }
        })
      } else {
        this.$router.push({
          name: "login",
          query: {
            myImg: this.myImg,
            nickname: this.user
          }
        })
      }
    },
    toZhannei() {
      if (window.localStorage.access_token && window.localStorage.openid && window.localStorage.type && window.localStorage.user_id) {
        this.$router.push({
          name: "zhannei"
        })
      } else {
        this.$router.push({
          name: "login",
          query: {
            myImg: this.myImg,
            nickname: this.user
          }
        })
      }
    },
    toYiJian() {
      if (window.localStorage.access_token && window.localStorage.openid && window.localStorage.type && window.localStorage.user_id) {
        this.$router.push({
          name: "yijian"
        })
      } else {
        this.$router.push({
          name: "login",
          query: {
            myImg: this.myImg,
            nickname: this.user
          }
        })
      }
    },
    toXieyi() {
      this.$router.push({
        name: "xieyi"
      })
    },
    toAboutus() {
      this.$router.push({
        name: "aboutus"
      })
    },
    shareWeibo() {
      let sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + this.share.title + '&url=' + this.share.url + '&content=utf-8&sourceUrl=' + this.share.url + '&pic=' + this.share.picurl;
      window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
      this.getShareNum()
    },
    //设置分享的头部
    setTitle(title) {
      console.log("d调用了serTITLE")
      this.nativeShare.setShareData({
        title: title,
      })
    },
    //分享到朋友圈
    shareFriend() {
      WeixinJSBridge.invoke('sendAppMessage', {
        "appid": this.appid,
        "img_url": this.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": this.lineLink,
        "desc": this.descContent,
        "title": this.shareTitle
      }, function(res) {
        //_report('send_msg', res.err_msg);

      })
    },
    //分享到朋友圈
    shareTimeline() {
      WeixinJSBridge.invoke('shareTimeline', {
        "img_url": this.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": this.lineLink,
        "desc": this.descContent,
        "title": this.shareTitle
      }, function(res) {
        //_report('timeline', res.err_msg);
      });
    },
    fen_weixinFriend(command) {
      if (this.isWeiXin()) {
        // wx.onMenuShareAppMessage({
        //   title: '互联网之子',
        //   desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
        //   link: 'http://movie.douban.com/subject/25785114/',
        //   imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
        //   success: function(res) {
        //     console.log("分享成功")
        //     alert('已分享');
        //   },
        //   fail: function(res) {
        //     console.log("分享失败")
        //   }
        // });

      } else {
        console.log("微信外部")
        try {
          this.nativeShare.call(command)
        } catch (err) {
          // 如果不支持，你可以在这里做降级处理
          this.showToast("您的浏览器暂不支持此功能")
        }
      }
    },
    fen_wechatTimeline(command) {
      if (this.isWeiXin()) {
        this.shareTimeline()
      } else {
        console.log("微信外部")
        try {
          this.nativeShare.call(command)
        } catch (err) {
          // 如果不支持，你可以在这里做降级处理
          this.showToast("您的浏览器暂不支持此功能")
        }
      }
    },
    fen_QQ(command) {
      if (this.isWeiXin()) {
      } else {
        console.log("微信外部")
        try {
          this.nativeShare.call(command)
        } catch (err) {
          // 如果不支持，你可以在这里做降级处理
          this.showToast("您的浏览器暂不支持此功能")
        }
      }
    },
    fen_QQzone() {
      var _url = this.share.url;
      var _showcount = 0;
      var _desc = this.share.title;
      var _summary = "";
      var _title = this.share.title;
      var _site = "";
      var _width = "300px";
      var _height = "200px";
      var _summary = "";
      var _pic = this.share.picurl;
      var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
      _shareUrl += 'url=' + encodeURIComponent(_url || document.location); //参数url设置分享的内容链接|默认当前页location
      _shareUrl += '&showcount=' + _showcount || 0; //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
      _shareUrl += '&desc=' + encodeURIComponent(_desc || '分享的描述'); //参数desc设置分享的描述，可选参数
      //_shareUrl += '&summary=' + encodeURIComponent(_summary||'分享摘要');    //参数summary设置分享摘要，可选参数
      _shareUrl += '&title=' + encodeURIComponent(_title || document.title); //参数title设置分享标题，可选参数
      //_shareUrl += '&site=' + encodeURIComponent(_site||'');   //参数site设置分享来源，可选参数
      _shareUrl += '&pics=' + encodeURIComponent(_pic || ''); //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
      window.open(_shareUrl, 'width=' + _width + ',height=' + _height + ',top=' + (screen.height - _height) / 2 + ',left=' + (screen.width - _width) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
    },
    // 统计分享的次数
    getShareNum() {
      this.axios({
        url: this.baseUrl.testUrl + "/sys/share/v1/share",
        method: 'POST',
        headers: {
          user_id: window.localStorage.user_id,
          access_token: window.localStorage.access_token
        },
        params: {
          type: 1,
          entry_id: ""
        }
      }).then(res => {
        console.log(res)
      })
    },
    showToast(_msg) {
      // 展示  toast
      this.snackbar = true;
      this.toastmsg = _msg;
      this.closeToast();
    },
    closeToast() {
      // 定时关闭toast
      if (this.toastTimer) {
        clearTimeout(this.toastTimer)
      };
      this.toastTimer = setTimeout(() => { this.snackbar = false }, 2000)
    },

    back() {
      this.axios({
        url: this.baseUrl.testUrl + "/user/v1/exit",
        method: 'POST',
        headers: {
          user_id: window.localStorage.user_id,
          access_token: window.localStorage.access_token
        },
        params: {
          type: window.localStorage.type
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 1200) {
          window.localStorage.removeItem('user_id');
          window.localStorage.removeItem('access_token')
          window.localStorage.removeItem('type')
          window.localStorage.removeItem('openid')
          window.localStorage.removeItem('code')
          window.location = "http://" + window.location.host
        }
      })
    },
    getQueryString(name) {
      //获取客户端参数
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    },
    // 用code换取token
    getToken() {
      console.log("换取")
      this.axios({
        url: this.baseUrl.testUrl + "/user/v1/login",
        method: 'POST',
        params: {
          code: this.code,
          type: this.type
        }
      }).then(res => {
        console.log(res.data.data)
        if (res.data.code == 1200) {
          Indicator.close();
          window.localStorage.access_token = res.data.data.access_token;
          console.log("result里面的" + window.localStorage.access_token);
          window.localStorage.openid = res.data.data.openid;
          window.localStorage.type = res.data.data.type;
          window.localStorage.user_id = res.data.data.user_id;
          console.log("登录成功后拿到的user_id" + window.localStorage.user_id)
          if (!res.data.data.phone_status) {
            //如果没有绑定手机号去绑手机号
            this.$router.push({
              name: "zhuce"
            })
          } else {
            //绑定手机号了直接获取用户信息
            this.getUserInfo();
            //判断用户有没有实名认证
            this.getuserRealname()
            //获取未读信息
            this.getnoMsg()
          }
        } else {
          this.showToast(res.data.msg);
          Indicator.close();
          this.getNoDeng();
          this.removeLocalStorage()
        }
      })
    },
    //获取未读信息
    getnoMsg() {
      // 获取未读信息条数
      this.axios({
        url: this.baseUrl.testUrl + "/sys/message/v1/unread",
        method: 'POST',
        headers: {
          user_id: this.user_id,
          access_token: this.access_token
        },
      }).then(res => {
        console.log("未读信息数量V")
        console.log(res)
        this.allMsg = res.data.data;
      })
    },
    //未登录状态
    getNoDeng() {
      this.feideng = true;
      this.deng = false;
    },
    //获取用户信息
    getUserInfo() {
      console.log("获取用户信息时的user_id" + window.localStorage.user_id + "获取用户信息时的type" + window.localStorage.type)
      this.axios({
        url: this.baseUrl.testUrl + "/user/v1/simulation",
        method: 'POST',
        headers: {
          user_id: window.localStorage.user_id
        },
        params: {
          type: window.localStorage.type
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 1200) {
          this.backlogin = true;
          this.deng = true;
          this.feideng = false;
          this.user = res.data.data.nickname
          this.myImg = res.data.data.portrait
          this.login = true;
          window.localStorage.access_token = res.data.data.access_token
          console.log("请求回来的" + res.data.data.access_token)
          console.log("第二次" + window.localStorage.access_token)

        } else if (res.data.code == 1500) {
          // this.showToast(res.data.msg);
          this.getNoDeng();
          this.removeLocalStorage()
        } else if (res.data.code == 1400) {
          this.getNoDeng();
          // this.showToast(res.data.msg);
          this.removeLocalStorage()
        } else {
          this.showToast("登录失败，请重新登录");
          this.getNoDeng();
          this.removeLocalStorage()

        }
      }).catch(err => {
        console.log(err)
      });
    },
    //获取用户有没有实名认证
    getuserRealname() {
      this.axios({
        url: this.baseUrl.testUrl + "/user/v1/info",
        method: 'POST',
        headers: {
          user_id: this.user_id,
          access_token: this.access_token
        },
        params: {
        }
      }).then(res => {
        console.log(res.data)
        this.realname = res.data.data;
      })
    },
    //清理本地缓存
    removeLocalStorage() {
      console.log("清空缓存")
      window.localStorage.removeItem('user_id');
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('type')
      window.localStorage.removeItem('openid')
      window.localStorage.removeItem('code')
    },
    //判断是否在微信浏览器下
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
    //获取微信配置
    getWechatconfig() {
      console.log("获取了微信的配置")
      wx.config({
        debug: false,
        appId: 'wxf8b4f85f3a794e77',
        timestamp: 1504251328,
        nonceStr: 'Qm3RlDMGKYDnSFmi',
        signature: 'd8d60450366cae6ddff53ef11afb1fae2f180bbe',
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
        ]
      });
    }
  },
  created() {
    // console.log("第一次cokie"+this.Util.Cookie.get('access_token'))
    console.log("第一次" + window.localStorage.access_token)
    console.log(window.localStorage.openid)
    console.log(window.localStorage.type)
    console.log(window.localStorage.user_id)
    console.log("本地缓存的type" + window.localStorage.a)
    this.code = this.getQueryString("code");
    console.log("code" + this.code)

    //获取code如果没有说明用户没登录，如果有则调接口，获取token
    if (window.localStorage.user_id) {
      if (this.code) {
        console.log("有user_id,表示曾经登录过")
        this.getUserInfo()
        //判断用户有没有实名认证
        this.getuserRealname()
        //获取未读信息
        this.getnoMsg()
      } else {
        this.getNoDeng();
        this.removeLocalStorage()
      }
    } else {
      if (this.code) {
        console.log("表示用户当前为正在登录状态")
        this.getToken()
      } else {

      }
    }
    //获取主页众筹列表
    this.getdata()
    //获取是否是微信浏览器下
    this.isWeiXin()
    //获取nativeshare配置
    this.nativeShare = new NativeShare()
    var shareData = {
      title: '校园创筹',
      desc: '校园创筹是一个有趣的应用',
      // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
      link: this.share.url,
      icon: this.share.picurl,
      // 不要过于依赖以下两个回调，很多浏览器是不支持的
      success: function() {
        alert('success')
      },
      fail: function() {
        alert('fail')
      }
    }
    this.nativeShare.setShareData(shareData)
    // //获取微信配置
    this.getWechatconfig()

    if (this.isShowLeftMask == false) {
      $('body').css({ position: "static" });
    }
  },
  beforeDestroy() {5
    console.log("组件被销毁了")
    $('body').css({ position: "static" });
  },
  mounted() {

    this.scroller = this.$el;
    var clipboard = new this.Clipboard(".copyBtn")
    clipboard.on('success', function(e) {
      // 复制当前页面的url
      e.clearSelection();
      this.showToast("复制成功");
    }.bind(this));
    clipboard.on('error', function(e) {
      this.showToast("请拷贝url");
    }.bind(this));

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@import "../../assets/css/home.css"
</style>
