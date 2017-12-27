<template>
  <div id="xiangqing">
    <div>
      <mt-header title="项目详情">
        <div slot="left">
          <mt-button icon="back" @click="historyBack()"></mt-button>
        </div>
        <mt-button slot="right">
          <span @click="open()">举报</span>
        </mt-button>
      </mt-header>
      <div class="headerBai"></div>
    </div>

    <div class="jine">
      <mu-dialog :open="dialog" @close="close">
        <p @click="jubao(1)" v-text="jubaoa"></p>
        <div class="dialog_xian"></div>
        <p @click="jubao(2)" v-text="jubaob"></p>
      </mu-dialog>
      <div class="biaoYu">
        <label>{{ details.name }}</label>
        <span v-if="details.entry_status == 1">
          预热
        </span>
        <span v-if="details.entry_status == 2">
          众筹中
        </span>
        <span v-if="details.entry_status == 3">
          众筹成功
        </span>
        <span v-if="details.entry_status == 4">
          众筹失败
        </span>
      </div>
      <div class="bannerImg">
        <div class="target_money">
          <h1>{{details.current_amount}}</h1>
        </div>
        <p>已募金额（元）</p>
      </div>
      <div class="money">
        <div class="outer_timeLine">
          <div class="inner_timeLine" :style="{width:details.scale>=100?100+'%':details.scale+'%'}"></div>
          <div class="time_status" :style="{left:details.scale>=100?90+'%':details.scale+'%'}">{{ details.scale+"%" }}</div>
        </div>
        <ul>
          <li>
            <h2>{{details.target_money}}</h2>
            <p>目标金额（元）</p>
          </li>
          <li>
            <h2 v-if="details.entry_status == 4" style="color:red">众筹结束</h2>
            <h2 v-else-if="details.entry_status == 3" style="color:red">众筹结束</h2>
            <h2 v-else-if="details.entry_status != 3 || details.entry_status != 4">{{ details.remaining_time }}</h2>
            <p>剩余时间</p>
          </li>
          <li>
            <h2>{{details.support_number}}</h2>
            <p>支持人数（人）</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="xinXi">
      <div class="xinXi_tou clear">
        <li class="touxiang">
          <img :src="details.portrait" height="48" width="48" alt="">
        </li>
        <li class="niCheng">
          <p>
            <span>{{details.nickname}}</span>
            <span v-if="details.realname == 1">未认证</span>
            <span v-if="details.realname == 2">已认证</span>
            <span v-if="details.realname == 3">审核中</span>
            <span v-if="details.realname == 4">认证失败</span>
          </p>
          <span>{{details.address }}</span>
        </li>
      </div>
      <div class="ping">
        <div class="tou">项目详情</div>
        <photo v-if="showImg" @clickit="viewImg" :imgSrc="temp_img" :imgIndex="bigimgIndex"></photo>
        <div class="tou_content">
          <!-- <div class="wenZi" v-show="imgShow">{{details.introduction}}</div> -->
          <!--  -->
          <div class="wenzi_outer">
            <div class="wenzi_inner">
              <p>{{details.introduction}}</p>
            </div>
          </div>

          <div class="zhanKai" :class="{ zhan: up, shou: down }" @click="zhan()">展开详情</div>
          <div class="myImg">
            <div v-for="(item,index) in details.imgs">
              <img :src="item.img_url" alt="图片无法加载" @click="bigPhoto(index)">

            </div>
          </div>
        </div>
        <div class="tou">评论</div>
        <div class="ping_content">
          <div v-for="item in commentVos" class="ping_content_detail clear">
            <div class="ping_tou clear">
              <li class="touxiang">
                <img :src="item.portrait" height="48" width="48" alt="">
              </li>
              <li class="niCheng">
                <p>{{ item.nickname }}</p>
                <span>{{item.time}}</span>
              </li>
            </div>
            <div class="pingList" @click="reply(item.comment_id,1,item.nickname)">
              {{ item.content }}
            </div>
            <div class="huiFu">
              <p @click="reply(items.reply_id,2,items.nickname)" v-for="items in item.replyVos" class="huiFu_p">
                <span>{{items.nickname}}</span>
                <span v-if="items.reply_userNickname!=null">回复</span>
                <span>{{ items.reply_userNickname }}</span>：
                <span>{{ items.content }}</span>
              </p>
            </div>
            <div class="ping_content_detail_xian"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottombar">
      <figure @click="details_focus()">
        <div v-if="guanzhu == 1">
          <img src="../../assets/images/xiangqing/weiguanzhu@2x.png">
        </div>
        <div v-else>
          <img src="../../assets/images/xiangqing/yiguanzhu@2x.png">
        </div>
        <figcaption>
          <p>关注</p>
        </figcaption>
      </figure>
      <figure @click="openShare('bottom')">
        <img src="../../assets/images/xiangqing/fenxiang@2x.png">
        <figcaption>
          <p>分享</p>
        </figcaption>
      </figure>
      <figure @click="comment()">
        <img src="../../assets/images/xiangqing/pinglun@2x.png">
        <figcaption>
          <p>评论</p>
        </figcaption>
      </figure>
      <li @click="zhifu()">去支持</li>
    </div>

    <div class="commentInput" v-show="commentStatus">
      <form>
        <input type="text" v-model="content" @focus="inputFocus()" :placeholder="placeholder">

        <span @click="upcomment()">{{ comHui }}</span>
      </form>
    </div>
    <div class="bai"></div>
    <mu-popup position="bottom" popupClass="aaaa" @close="close('bottom')" :open="bottomPopup">
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
      <p class="quxiao" @click="closeShare('bottom')">
        取消
      </p>
    </mu-popup>
    <!-- 遮罩 -->
    <div class="share_zhe" @click="close_share_zhe()" v-show="share_zhe_show">
      <img src="../../assets/images/shouye/shareguild.png" alt="">
    </div>
    <!--toast  -->
    <mu-toast v-if="snackbar" :message="toastmsg" />
    <div class="zheZhao" @click="closeZheZhao()" v-show="zheZhao"></div>
    <!-- 下拉加载更多 -->
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />

  </div>
</template>

<script>
import Photo from '../bigPho/BigImg.vue';
import NativeShare from 'nativeshare'
import wx from 'weixin-js-sdk'
export default {
  name: "xiangqing",
  data() {
    return {
      user_id: window.localStorage.user_id,
      access_token: window.localStorage.access_token,
      jubaoa: "侵犯个人隐私",
      jubaob: "内容虚假",
      dialog: false,
      value3: 50,
      imgShow: false,//展开详情控制按钮
      up: false,//展开详情右边箭头朝向
      down: true,//展开详情右边箭头朝向
      bottomPopup: false,//控制下面的分享模态框
      share: {
        title: "校园创筹",
        url: window.location.href,
        picurl: "http://img.lezanapp.com/video/screen1704c_62eb_2233_57bab9a3468a.png@!vm"
      },
      snackbar: false,//弹窗默认不显示
      toastmsg: "",//存储 弹窗的文字
      entry_id: this.$route.query.entry_id,
      details: {},
      guanzhu: 1,
      commentStatus: false,//评论框的状态
      zheZhao: false,//遮罩状态
      content: "",
      comHui: '评论',//是评论还是回复
      placeholder: "期待你的评论",
      loading: false,//下拉刷新
      scroller: null,//下拉刷新
      allPage: 0,//总页数
      page: 1,//当前页
      commentVos: [],//评论列表
      reply_id: "",
      reply_type: 1,
      showImg: false,//大图显示
      temp_img: "",//传给bigImg的url地址
      bigimgIndex: null,//传给bigImg的索引
      scrollTop: 0,//储存滚动条的高度
      share_zhe_show: false//控制分享遮罩
    }
  },
  components: {
    Photo
  },
  methods: {
    historyBack() {

      console.log(window.localStorage.sch)

      this.$router.push({
        name: "home"
      })
      $('body').scrollTop(window.localStorage.sch)
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
    loadMore() {
      this.loading = true
      if (this.page >= this.allPage) {
        this.loading = false
      } else {
        var time = setTimeout(() => {
          this.loading = false
          this.page += 1
          this.upCommentList()
        }, 1000)
      }
    },
    zhifu() {
      if (this.user_id && this.access_token) {
        window.localStorage.xiangqingUrl = window.location.href;
        this.$router.push({
          name: "zhifu",
          query: {
            entry: this.entry_id
          }
        })
      } else {
        this.showToast("请先去首页登录");
      }
    },
    openShare(position) {
      if (this.isWeiXin()) {
        this.share_zhe_show = true;
        $('body').css({ position: "fixed" });
      } else {
        this[position + 'Popup'] = true
      }
    },
    close_share_zhe() {
      this.share_zhe_show = false;
      $('body').css({ position: "static" });
    },
    zhan() {
      this.up = !this.up;
      this.down = !this.down;
      let wenzi_inner_height = $(".wenzi_inner").height();
      let wenzi_inner_outer = $(".wenzi_outer").height();
      if (wenzi_inner_height > wenzi_inner_outer) {
        $(".wenzi_outer").animate({
          height: wenzi_inner_height + 'px'
        }, 500)
      } else {
        $(".wenzi_outer").animate({
          height: 50 + 'px'
        }, 500)
      }
    },
    open() {
      if (this.user_id && this.access_token) {
        this.dialog = true
        $('body').css({ position: "fixed" });
      } else {
        this.showToast("请先去首页登录");
      }
    },
    close(position) {
      this.dialog = false
      this[position + 'Popup'] = false
      $('body').css({ position: "static" });
    },
    jubao(i) {
      if (i == 1) {
        this.axios({
          url: this.baseUrl.testUrl + "/sys/report/v1/report",
          method: 'POST',
          headers: {
            user_id: this.user_id,
            access_token: this.access_token
          },
          params: {
            entry_id: this.entry_id,
            cause: this.jubaoa
          }
        }).then(res => {
          if (res.data.code == 1200) {
            this.showToast("举报成功，请耐心等待");
          } else {
            this.showToast("举报失败");
          }
        }).catch(function(err) {
          console.log(err)
        })
      } else if (i == 2) {
        this.axios({
          url: this.baseUrl.testUrl + "/sys/report/v1/report",
          method: 'POST',
          headers: {
            user_id: this.user_id,
            access_token: this.access_token
          },
          params: {
            entry_id: this.entry_id,
            cause: this.jubaob
          }
        }).then(res => {
          if (res.data.code == 1200) {
            this.showToast("举报成功，请耐心等待");
          } else {
            this.showToast("举报失败");
          }
          console.log(res)
        }).catch(function(err) {
          console.log(err)
        })
      }
      this.dialog = false
    },
    bigPhoto(index) {
      this.scrollTop = $("body").scrollTop();
      this.showImg = true;
      this.temp_img = this.details.imgs;
      this.bigimgIndex = index;
      console.log(index)
      // 打开大图，不能滚动
      $('body').css({ position: "fixed" });
    },
    viewImg() {
      // 关闭大图，恢复滚动
      $('body').css({ position: "static" });
      $("body").scrollTop(this.scrollTop)
      this.showImg = false;
    },
    details_focus() {
      if (this.user_id && this.access_token) {
        this.axios({
          url: this.baseUrl.testUrl + "/favorites/v1/favorites",
          method: 'POST',
          headers: {
            user_id: this.user_id,
            access_token: this.access_token
          },
          params: {
            entry_id: this.entry_id,
          }
        }).then(res => {
          if (this.guanzhu == 1) {
            this.guanzhu = 2
          } else {
            this.guanzhu = 1
          };
          console.log(res)
        }).catch(function(err) {
          console.log(err)
        })
      } else {
        this.showToast("请先去首页登录");
      }
    },
    // 回复
    reply(id, type, placeholder) {
      if (this.user_id && this.access_token) {
        this.placeholder = "回复" + placeholder
        this.comHui = "回复";
        this.content = ""
        this.zheZhao = true;
        this.commentStatus = true;
        $(".bottombar").hide(100)
        this.reply_id = id
        this.reply_type = type
      } else {
        this.showToast("请先去首页登录");
      }
    },
    // 评论
    comment() {
      if (this.user_id && this.access_token) {
        this.placeholder = "期待你的评论"
        this.comHui = "评论";
        this.content = "";
        this.zheZhao = true;
        this.commentStatus = true;
        $(".bottombar").hide(100)
      } else {
        this.showToast("请先去首页登录");
      }
    },
    inputFocus() {
      console.log(132)
      $(".bottombar").hide(100)
    },
    inputBlur() {
      console.log(321)
      $(".bottombar").show(100)
      this.commentStatus = false
    },
    closeZheZhao() {
      this.zheZhao = false;
      $(".bottombar").show(100)
      this.commentStatus = false
    },
    // 提交评论
    upcomment() {
      if (this.comHui == "评论") {
        if (this.content == "") {
          this.showToast("评论内容不能为空")
          // this.zheZhao = false;
          // $(".bottombar").show(100)
          // this.commentStatus = false
        } else {
          console.log(this.content)
          this.axios({
            url: this.baseUrl.testUrl + "/comment/v1/release",
            method: 'POST',
            headers: {
              user_id: this.user_id,
              access_token: this.access_token
            },
            params: {
              content: this.content,
              entry_id: this.details.entry_id
            }
          }).then(res => {
            console.log(res)
            if (res.data.code == 1200) {
              this.getCommentList();
              this.zheZhao = false;
              $(".bottombar").show(100)
              this.commentStatus = false
            } else {
              this.zheZhao = false;
              $(".bottombar").show(100)
              this.commentStatus = false
            }
          }).catch(function(err) {
            console.log(err)
          })
        }
      } else if (this.comHui == "回复") {
        if (this.content == "") {
          console.log("没内容")
          this.showToast("回复内容不能为空")
          // this.zheZhao = false;
          // $(".bottombar").show(100)
          // this.commentStatus = false
        } else {
          console.log(this.content)
          this.axios({
            url: this.baseUrl.testUrl + "/comment/v1/reply",
            method: 'POST',
            headers: {
              user_id: this.user_id,
              access_token: this.access_token
            },
            params: {
              reply_type: this.reply_type,
              content: this.content,
              id: this.reply_id
            }
          }).then(res => {
            console.log(res)
            if (res.data.code == 1200) {
              this.getCommentList();
              this.zheZhao = false;
              $(".bottombar").show(100)
              this.commentStatus = false
            } else {
              this.zheZhao = false;
              $(".bottombar").show(100)
              this.commentStatus = false
            }
          }).catch(function(err) {
            console.log(err)
          })
        }

      }

    },
    shareWeibo() {
      let sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + this.share.title + '&url=' + this.share.url + '&content=utf-8&sourceUrl=' + this.share.url + '&pic=' + this.share.picurl;
      window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
    },
    fen_weixinFriend(command) {
      /** 获取微信配置 */
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
      /** 获取微信配置 */
      // this.axios.get(this.base_url + this.fen_url, { emulateJSON: true }).then((data) => {
      //   this.config = data.body;
      //   var $this = this;
      //   wx.config({
      //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //     appId: this.config.appId, // 必填，公众号的唯一标识
      //     timestamp: this.config.timestamp, // 必填，生成签名的时间戳
      //     nonceStr: this.config.nonceStr, // 必填，生成签名的随机串
      //     signature: this.config.signature,// 必填，签名，见附录1
      //     jsApiList: ['onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      //   });

      //   wx.ready(function() {
      //     //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
      //     wx.onMenuShareTimeline({
      //       title: this.share.title, // 分享标题
      //       link: this.share.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //       imgUrl: this.share.picurl, // 分享图标
      //       success: function() {

      //       }
      //     });
      //   });
      //   wx.error(function(res) {

      //   });
      // })
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
    getCommentList() {
      console.log(this.entry_id)
      console.log(this.page)
      this.axios({
        url: this.baseUrl.testUrl + "/comment/v1/list",
        method: 'POST',
        params: {
          entry_id: this.entry_id,
          page: this.page,
          rows: 10
        }
      }).then(res => {
        console.log(res.data)
        this.commentVos = res.data.data.commentVos
        this.allPage = res.data.data.pageTotal;
      }).catch(function(err) {
        console.log(err)
      })
    },
    upCommentList() {
      console.log(this.entry_id)
      console.log(this.page)
      this.axios({
        url: this.baseUrl.testUrl + "/comment/v1/list",
        method: 'POST',
        params: {
          entry_id: this.entry_id,
          page: this.page,
          rows: 10
        }
      }).then(res => {
        console.log(res.data.data)
        res.data.data.commentVos.map(item => {
          this.commentVos.push(item)
        })
      }).catch(function(err) {
        console.log(err)
      })
    }

  },
  created() {  //组件创建完成即可发起网络请求
    console.log(this.entry_id)
    this.axios({
      url: this.baseUrl.testUrl + "/entry/v1/details",
      method: 'POST',
      headers: {
        user_id: this.user_id,
        access_token: this.access_token
      },
      params: {
        entry_id: this.entry_id
      }
    }).then(res => {
      console.log(res.data.data)
      this.details = res.data.data
      this.guanzhu = res.data.data.favorites
    }).catch(function(err) {
      console.log(err)
    })
    this.getCommentList()
    console.log($('body').scrollTop())
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
  },
  mounted() {
    // $('body').scrollTop(0)
    this.scroller = this.$el;
    new this.Clipboard(".copyBtn").on('success', function(e) {
      // 复制当前页面的url
      e.clearSelection();
      this.showToast("复制成功");
    }.bind(this));
  },
  computed: {

  }


}

</script>

<style scoped>
@import "../../assets/css/xiangqing.css"
</style>
