<template>
  <div id="zhifu">
    <!--head  -->
    <mt-header title="支付">
      <div slot="left">
        <mt-button icon="back" onclick="history.back()"></mt-button>
      </div>
    </mt-header>
    <div class="headerBai"></div>
    <div class="zhifu_money_box">
      <ul class="chose_money_box">
        <li :class="{chose_money_active:i == index}" v-for="(item,i) in money" @click="xuanMoney(item,i)">{{ item.moy }}元</li>
      </ul>
      <div class="shu_ru_jin_e">
        <input v-model="endMoney" @focus="jiaoDian()" type="number" placeholder="输入支付金额" />
        <span>元</span>
      </div>
    </div>
    <ul class="zhifu_gallery">
      <li @click="weixinPay()">
        <div class="zhifu_gallery_left weixin_left">
        </div>
        <div class="zhifu_gallery_right" :class="[gai?'pay_way_right':'pay_way_rightb']">
        </div>
      </li>
      <li @click="baoPay()">
        <div class="zhifu_gallery_left zhifubao_left">
        </div>
        <div class="zhifu_gallery_right" :class="[!gai?'pay_way_right':'pay_way_rightb']">
        </div>
      </li>
    </ul>

    <!--支付按钮  -->
    <div @click="zhifu()" class="">
      <!-- <mu-raised-button label="立即支付" class="demo-raised-button zhifu_btn" secondary backgroundColor="#26a2ff"/> -->
      <div class="demo-raised-button zhifu_btn">立即支付</div>
    </div>
    <!--用户协议  -->
    <div v-for="item of items" class="flex-demo">
      <mu-checkbox label="已阅读并同意" backgroundColor="#26a2ff" class="demo-checkbox agree_zhuce" type="checkbox" v-model="item.agreeState" @click="alocked(item)" />
      <span @click="zhifu_xieyi()">支付协议</span>
    </div>
    <div class="payZhe" v-show="payZhe"></div>

    <!--支付协议协议内容  -->
    <transition name="bounce">
      <div class="zhifu_xieyi" v-show="xieyi_show" @click="close_xieyi()">
        <h3>支付宝服务协议</h3>
        <h5>
          支付宝服务（以下简称本服务）是由支付宝（中国）网络技术有限公司（以下简称本公司）向支付宝用户提供的支付宝软件系统（以下简称本系统）及(或)附随的货款代收代付的中介服务。本协议由您和本公司签订。
        </h5>
        <p>
          一、 声明与承诺<br> （一）本协议已对与您的权益有或可能具有重大关系的条款，及对本公司具有或可能具有免责或限制责任的条款用粗体字予以标注，请您注意。您确认，在您注册成为支付宝用户以接受本服务之前，您已充分阅读、理解并接受本协议的全部内容，一旦您使用本服务，即表示您同意遵循本协议之所有约定。 <br>（二）您同意，本公司有权随时对本协议内容进行单方面的变更，并以在本网站公告的方式予以公布，无需另行单独通知您；若您在本协议内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容使用本服务；若您不同意修改后的协议内容，您应停止使用本服务。 <br>（三）您保证，在您同意接受本协议并注册成为支付宝用户时，您已经年满16周岁， 或者您是在中国大陆地区合法开展经营活动或其他业务的法人或其他组织；本协议内容不受您所属国家或地区法律的排斥。不具备前述条件的，您应立即终止注册或停止使用本服务。您在使用支付宝服务时，应自行判断对方是否是完全民事行为能力人并自行决定是否与对方进行交易或转账给对方等，且您应自行承担与此相关的所有风险。
        </p>
        <p>
          二、支付宝服务概要 <br>（一）支付宝账户：指您在注册时，本公司向您提供的唯一编号。您可自行为该支付宝账户设置密码，并用以查询或计量您的预付、应收或应付款。您需使用本人邮箱或手机号码或者本公司允许的其它手段作为支付宝账户名登录该支付宝账户。 <br>（二） 支付宝中介服务（亦称 “支付宝担保交易”）：即本公司向您提供的货款代收代付的中介服务，其中包含 1、代管：您可以使用本服务指定的方式向您的支付宝账户充值，并委托本公司代为保管。 2、代收：您可以要求本公司代为收取其他支付宝用户向您支付的各类款项。 3、代付：您可以要求本公司将代管或代收的您的款项支付给您指定的第三方。您同意，本公司代付后，非经法律程序或者非依本协议之约定，该支付是不可逆转的。 4、退返（或提现）：您可以要求本公司退返本公司代管的您的款项（即退返）或向您支付您的应收款（即提现）。当您向本公司做出退返（提现）指令时，必须提供一个与您委托本公司代管时的汇款人或您的名称相符的有效的中国大陆银行账户，本公司将于收到指令后的一至五个工作日内，将相应的款项汇入您提供的有效银行账户（根据您提供的银行不同，会产生汇入时间上的差异）。除本条约定外，本公司不接受您提供的其他受领方式。 5、查询：本公司将对您在本系统中的所有操作进行记录，不论该操作之目的最终是否实现。您可以在本系统中实时查询您的支付宝账户名下的交易记录，您认为记录有误的，本公司将向您提供本公司已按照您的指令所执行的收付款的记录。您理解并同意您最终收到款项的服务是由您提供的银行账户对应的银行提供的，您需向该银行请求查证。 6、款项专属：对您支付到本公司并归属至您支付宝账户的款项及您通过支付宝账户收到的货款，本公司将予以妥善保管，除本协议另行规定外，不作任何其他非您指令的用途。 （三）货到付款服务（又称COD服务）：是指买卖双方约定买卖合同项下的交易货款，由卖家委托的物流公司在向买方运送交易货物时以现金、POS刷卡、快捷支付等方式直接或间接地代收，再由本公司代付至卖方支付宝账户的一种支付方式。在您使用本项服务时，除适用支付宝中介服务的相关约定外，还将优先适用以下条款： 1、作为买方，本公司为您代付的交易货款系由您收到交易货物时以现金、POS刷卡、快捷支付等方式通过物流公司直接或间接代付至卖方支付宝账户内。您向卖方支付的交易货款将直接或者间接通过物流公司，物流公司为此可能向您单独收取费用。您理解并同意，该费用是物流公司基于其向您提供的服务所收取的，与本公司向您提供的COD服务无关。 您确认，本服务能否完成取决于您提供的收货地址是卖方所选用的物流公司可以送达的地址。在物流公司确认不可送达时，本公司有权要求您重新选择本公司提供的其他支付方式。 2、作为卖方，本公司为您代收的交易货款系由买方直接或间接地通过您委托的物流公司并最终由本公司代收到您的支付宝账户内。您理解并同意，完成上述流程是需要一定时间的，而本公司承诺在与物流公司将交易货款全部清算给本公司的次日将上述交易货款代收至您的支付宝账户内。因此产生的交易款项流转时间是您明知且认可的。您确认，该服务能否完成，取决于您选用的物流公司是否可将交易货物送达买方提供的收货地址，或买方提供的收货地址准确无误，或货物完全符合您与买方的约定，及物流公司是否将相应交易货款清算至本公司等。您理解并接受，您选用的物流公司不揽货、不清算、错误送达、货物被买方拒收等情形与本公司无关，且为本公司不可预见、不可预防和不可控制的，因此产生的损失需全部由您自行承担。
        </p>
      </div>
    </transition>
    <!-- 支付遮罩 -->
    <div class="zhifu_zhezhao" v-show="zhezhao_show" @click="close_xieyi()"></div>
    <!--toast  -->
    <mu-toast v-if="snackbar" :message="toastmsg" />
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
  name: 'realname',
  data() {
    return {
      payZhe: false,
      items: [{
        agreeState: true//用户协议默认选中状态
      }],
      bottomPopup: false,//存储用户协议   是否显示
      dialog: false,
      index: 9,
      money: [
        { moy: "10" },
        { moy: "20" },
        { moy: "50" },
        { moy: "100" },
      ],
      endMoney: '',
      snackbar: false,//弹窗默认不显示
      toastmsg: "",//存储 弹窗的文字
      gai: false,
      type: 1,
      entryid: this.$route.query.entry,
      xieyi_show: false,
      zhezhao_show: false
    }
  },
  methods: {
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
    alocked: function(item) {
      // 是否同意用户协议
      item.state = !item.state;
    },
    zhifu_xieyi() {
      // 打开用户协议
      this.xieyi_show = true
      this.zhezhao_show = true
    },
    close_xieyi() {
      // 关闭用户协议
      this.xieyi_show = false
      this.zhezhao_show = false
    },
    xuanMoney(item, i) {
      this.index = i;
      this.endMoney = item.moy
    },
    zhifu() {
      if (this.items[0].agreeState) {
        // console.log(this.endMoney)
        console.log(window.localStorage.user_id)
        console.log(window.localStorage.access_token)
        console.log(this.endMoney)
        console.log(this.entryid)
        console.log(this.type)
        if (this.endMoney != "") {
          if (this.endMoney>=1){
            if (this.isWeiXin()) {
              this.showToast("请点击右上角用浏览器打开")
              // if (this.type == 2) {
              //   this.axios({
              //     url: this.baseUrl.testUrl + "/order/v1/create",
              //     method: 'POST',
              //     headers: {
              //       user_id: window.localStorage.user_id,
              //       access_token: window.localStorage.access_token
              //     },
              //     params: {
              //       amount: this.endMoney,
              //       entry_id: this.entryid,
              //       pay_type: this.type
              //     }
              //   }).then(res => {
              //     console.log(res);
              //     if (typeof WeixinJSBridge == "undefined") {
              //       if (document.addEventListener) {
              //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              //       } else if (document.attachEvent) {
              //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              //       }
              //     } else {
              //       onBridgeReady();
              //     }
              //     function onBridgeReady() {
              //       WeixinJSBridge.invoke(
              //         'getBrandWCPayRequest', {
              //           "appId": res.appId,//公众号名称，由商户传入
              //           "timeStamp": res.timeStamp,//时间戳，自1970年以来的秒数
              //           "nonceStr": res.nonceStr,//随机串
              //           "package": res.package,
              //           "signType": res.signType,//微信签名方式：
              //           "paySign": res.paySign //微信签名
              //         },
              //         function(resp) {
              //           console.log("resp.err_code-->" + resp.err_code);
              //           console.log("resp.err_desc-->" + resp.err_desc);
              //           if (resp.err_msg == "get_brand_wcpay_request:ok") {
              //             console.log("支付成功")
              //             window.location.href = "http://xiaoyuanchou.casiec.cn/#/paysuccess";
              //           }     // 使用以上方式判断前端返回,微信团队郑重提示：resp.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              //           if (resp.err_msg == "get_brand_wcpay_request:cancel") {
              //             //支付过程中用户取消
              //             console.log("用户取消了支付")
              //           }
              //           if (resp.err_msg == "get_brand_wcpay_request:fail") {
              //             //支付失败
              //             console.log("支付失败")
              //           }
              //         }
              //       );
              //     }
              //   })
              // }else {
              //   console.log("支付宝支付")
              // }
            } else {
              Indicator.open("跳转中......")
              this.axios({
                url: this.baseUrl.testUrl + "/order/v1/create",
                method: 'POST',
                headers: {
                  user_id: window.localStorage.user_id,
                  access_token: window.localStorage.access_token
                },
                params: {
                  amount: this.endMoney,
                  entry_id: this.entryid,
                  pay_type: this.type
                }
              }).then(res => {
                console.log(res)
                if (res.data.code == 1200) {
                  Indicator.close();
                  if (this.type == 1) {
                    $("#zhifu").prepend(res.data.data)
                  } else {
                    console.log(res.data.data)
                    window.location = res.data.data
                  }
                } else {
                  Indicator.close();
                  this.showToast(res.data.msg)
                }
              })
            }
          }else{
            this.showToast("输入金额不能小于一元")
          }
        } else {
          this.showToast("请输入金额")
        }
      } else {
        this.showToast("请同意支付协议")
      }


    },

    jiaoDian() {
      console.log(132)
      this.index = null;
    },
    weixinPay() {
      this.gai = true;
      this.type = 2;
      console.log(this.type)
    },
    baoPay() {
      this.gai = false;
      this.type = 1;
      console.log(this.type)
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@import "../../assets/css/zhifu.css";
</style>
