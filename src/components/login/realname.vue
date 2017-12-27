<template>
  <div id="realname">
    <!--head  -->
    <mt-header title="实名认证">
      <div slot="left">
        <mt-button icon="back" onclick="history.back()"></mt-button>
      </div>
    </mt-header>
    <div class="headerBai"></div>
    <div class="realname_box">
      <ul class="realname_form_content">
        <li class="realname_line">
          <label for="realname">真实姓名</label>
          <input id="realname" v-model="userInfo.name" type="text" placeholder="真实姓名">
        </li>
        <li class="realname_birthday_line">
          <label class="realname_birthday" for="realname_birthday">出生日期</label>
          <div class="realname_birthday_mask">
            <mu-date-picker :fullWidth=true :underlineShow="false" v-model="userInfo.birthday" hintText="出生日期" minDate="1950-01-01" maxDate="2015-12-20" />
          </div>
        </li>

        <li class="realname_sex_line">
          <label for="realname_sex">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</label>
          <input type="radio" class="inputOne" name="identity" />
          <span>男</span>
          <input type="radio" class="inputTwo" name="identity" />
          <span>女</span>
        </li>
        <li>
          <label for="realname_zhuanye">专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业</label>
          <input id="realname_zhuanye" v-model="userInfo.speciality" type="text" placeholder="专业">
        </li>
        <li>
          <label for="realname_school">所属学校</label>
          <input id="realname_school" v-model="userInfo.school" type="text" placeholder="所属学校">
        </li>
        <li>
          <label for="realname_school_address">学校地址</label>
          <myarea ref="myarea" v-on:aaaa="getAddress"></myarea>
        </li>
        <li>
          <label for="realname_school_address">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input id="realname_school_address" v-model="address" type="text" placeholder="请填写详细地址">
        </li>

        <li class="realname_status_line">
          <label for="realname_status">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份</label>
          <input type="radio" class="inputStu" name="realname_status" value="学生" />
          <span>学生</span>
          <input type="radio" class="inputTeh" name="realname_status" value="老师" />
          <span>老师</span>
        </li>
      </ul>
      <!--证书的  -->
      <div class="zhengshu_box">
        <div class="zhengshu_title">
          <span>请上传教师证件</span>
          <span>&#40;一面上传一张即可，正反面请上传2张&#41;</span>
        </div>
        <div class="zhengshu_img_box">
          <!-- 教师证件 -->
          <span class="userInfo_logo">
            <div class="form-group">
              <form id="upload_posterTeach" action="http://up-z1.qiniu.com/" method="post" enctype="multipart/form-data">
                <div class="enviTeach">
                  <input name="token" type="hidden" v-model="uploadToken">
                  <input type="file" name="file" @change="teachZheng" />
                </div>
              </form>
            </div>
          </span>
        </div>
      </div>
      <!--手持身份证  -->
      <div class="shenfenzheng_box">
        <div class="shenfenzheng_title">
          <span>手持身份</span>
          <span>&#40;请上传清晰手持正、反照片&#41;</span>
        </div>
        <div class="shenfenzheng_img_box">
          <!-- 身份证 -->
          <span class="userInfo_logo">
            <div class="form-group">
              <form id="upload_posterzheng" action="http://up-z1.qiniu.com/" method="post" enctype="multipart/form-data">
                <div class="envizheng">
                  <input name="token" type="hidden" v-model="uploadToken">
                  <input type="file" name="file" @change="shenFenZengzheng" />
                </div>
              </form>
            </div>
          </span>
          <span class="userInfo_logo">
            <div class="form-group">
              <form id="upload_posterfan" action="http://up-z1.qiniu.com/" method="post" enctype="multipart/form-data">
                <div class="envifan">
                  <input name="token" type="hidden" v-model="uploadToken">
                  <input type="file" name="file" @change="shenFenZengfan" />
                </div>
              </form>
            </div>
          </span>
          <!--  -->
        </div>
      </div>
      <!--退出登陆按钮  -->
      <div class="tiJiao">
        <button @click="tiJiao()">提交审核</button>
      </div>
    </div>
    <!--toast  -->
    <mu-toast v-if="snackbar" :message="toastmsg" />
  </div>
</template>

<script>
// import { Toast } from 'mint-ui';
import Myimg from '../tupian.vue';
import '../../assets/js/jquery.form/jquery.form'
import myarea from '../myarea/area.vue';
import { Indicator } from 'mint-ui';
export default {
  name: 'realname',

  components: {
    Myimg,
    myarea
  },
  data() {
    return {
      // value: null,//日期选择器组件中的value
      // startDate: new Date('1900-1-1'),//日期选择器开始的年月日
      // endDate: new Date(),//日期选择器结束日期，默认为当前
      sexman: true,
      sexwoman: 'checked',
      user_id: window.localStorage.user_id,
      access_token: window.localStorage.access_token,
      userInfo: {
        name: "",
        birthday: '',//最终页面展示的日期
        sex: null,
        speciality: "",
        school: "",
        address: "",
        role: null,
        id_card_positive: "",
        id_card_inverse: "",
        role_credentials: ""
      },
      uploadToken: "",          //上传图片凭证
      form: {
        poster: ''//海报
      },
      province: [],
      city: [],
      address: "",
      addressHead: "",//存储省市县地址
      snackbar: false,//弹窗默认不显示
      toastmsg: "",//存储 弹窗的文字
      timeFlag: true//判断定时器触不触发
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
    getAddress(res) {
      console.log("getAddress");
      console.log(res)
      this.addressHead = res;
    },
    tiJiao() {
      this.timeFlag = false;
      // 调用子组件的方法
      this.$refs.myarea.sendAdress();
      this.userInfo.address = this.addressHead + this.address;
      var _this = this;
      if ($(".inputOne").prop("checked")) {
        this.userInfo.sex = 1;
      } else if ($(".inputTwo").prop("checked")) {
        this.userInfo.sex = 2;
      }
      if ($(".inputStu").prop("checked")) {
        this.userInfo.role = 1;
      } else if ($(".inputTeh").prop("checked")) {
        this.userInfo.role = 2;
      }
      if (_this.userInfo.name == "") {
        this.showToast("姓名不能为空")
        return
      }
      if (_this.userInfo.birthday == "") {
        this.showToast("出生日期不能为空")
        return
      }
      if (_this.userInfo.sex == "") {
        this.showToast("请选择性别")
        return
      }
      if (_this.userInfo.speciality == "") {
        this.showToast("请填写专业")
        return
      }
      if (_this.userInfo.school == "") {
        this.showToast("请填写所属学校")
        return
      }
      if (_this.userInfo.address == "") {
        this.showToast("请填写地址")
        return
      }
      if (_this.userInfo.role == "") {
        this.showToast("请选择您的身份")
        return
      }
      Indicator.open("提交中......")
      $('#upload_posterTeach').ajaxSubmit(function(data) {
        _this.userInfo.role_credentials = data.hash;
        //提交数据
        $('#upload_posterzheng').ajaxSubmit(function(data) {
          _this.userInfo.id_card_positive = data.hash;
          //提交数据
          $('#upload_posterfan').ajaxSubmit(function(data) {
            _this.userInfo.id_card_inverse = data.hash;
            if (_this.userInfo.role_credentials == "") {
              this.showToast("请上传您的证件")
              return
            }
            if (_this.userInfo.id_card_inverse == "") {
              this.showToast("请上传身份证")
              return
            }
            if (_this.userInfo.id_card_positive == "") {
              this.showToast("请上传身份证")
              return
            }
            //提交数据
            console.log(_this.userInfo)
            _this.axios({
              url: _this.baseUrl.testUrl + "/user/v1/submit/realname",
              method: 'POST',
              headers: {
                user_id: _this.user_id,
                access_token: _this.access_token
              },
              params: _this.userInfo
            }).then(res => {
              console.log(res)
              if (res.data.code == 1200) {
                _this.timeFlag = false;
                Indicator.close();
                _this.$router.push({
                  name: "userInfo"
                })
              } else {
                Indicator.close();
                _this.timeFlag = false;
                _this.showToast("提交失败，请重新提交")
              }
            }).catch(function(err) {

            })
          })
        })
      });
      if (this.timeFlag) {
        var that = this
        setTimeout(function() {
          Indicator.close();
          that.showToast("提交失败，请重新提交")
        }, 3000);
      }




      // $(".inputOne").vul()
    },
    shenFenZengzheng(e) {
      var _this = this;
      var file = e.target.files[0];
      var supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (file && supportedTypes.indexOf(file.type) >= 0) {
        this.form.poster = this.getImgUrl(file);
        console.log(this.form.poster)
        $(".envizheng").css("backgroundImage", "url(" + this.form.poster + ")");
      } else {
        alert('文件格式只支持：jpg、jpeg 和 png');
      }
    },
    teachZheng(e) {
      var _this = this;
      var file = e.target.files[0];
      var supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (file && supportedTypes.indexOf(file.type) >= 0) {
        this.form.poster = this.getImgUrl(file);
        console.log(this.form.poster)
        $(".enviTeach").css("backgroundImage", "url(" + this.form.poster + ")");
      } else {
        alert('文件格式只支持：jpg、jpeg 和 png');
      }
    },
    shenFenZengfan(e) {
      var _this = this;
      var file = e.target.files[0];
      var supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (file && supportedTypes.indexOf(file.type) >= 0) {
        this.form.poster = this.getImgUrl(file);
        console.log(this.form.poster)
        $(".envifan").css("backgroundImage", "url(" + this.form.poster + ")");
      } else {
        alert('文件格式只支持：jpg、jpeg 和 png');
      }
    },
    getImgUrl: function(file) {
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
    open(picker) {
      // 弹出日期选择器
      this.$refs[picker].open();
    },
    handleChange(value) {
      // 日期选择器  点击确定按钮
      this.date1 = new Date(value.toString());
      this.userInfo.birthday = this.formatDate(this.date1);
      console.log(value.toString())
    },
    formatTen(num) {
      // 日期 为1位数字，在前面加0
      return num > 9 ? (num + "") : ("0" + num);
    },
    formatDate(date) {
      // 对 标准时间进行  转换  ,传进来的参数格式为 :Mon Jan 01 1900 00:00:00 GMT+0800 (中国标准时间)
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    },
    getCity() {
      this.axios({
        url: "http://api.yijiaoxing.com:80/global/dictionary/region/v1/get/city",
        method: 'GET',
        params: {
          adcode: 210000
        }
      }).then(res => {
        this.city = res.data.data
        console.log(res.data.data)
      });
    }
  },
  created() {
    this.axios({
      url: this.baseUrl.testUrl + "/qiniu/v1/getSimplicityToken",
      method: 'GET',
      headers: {
        user_id: this.user_id,
        access_token: this.access_token
      },
      params: {
        bucket: 'tbd-realname'
      }
    }).then(res => {
      console.log(res.data)
      this.uploadToken = res.data.data
    });
  },
  mounted() {
    $(".mu-date-picker").css("height", "100%");
    $(".mu-text-field").css({
      "min-height": "100%",
      "margin-bottom": "0",
      "height": "100%"
    });
    $(".mu-text-field-content").css({
      "padding-bottom": "0",
      "padding-top": "0"
    });
    $(".mu-text-field-hint").css({
      "line-height": "1rem"
    });
    $(".mu-text-field-input").css({
      "height": "1rem"
    });
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang ="less">
.mint-header {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #26a2ff;
  box-sizing: border-box;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 0.35rem;
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

.headerBai {
  width: 100%;
  height: 0.75rem;
}

.realname_box .shenfenzheng_box .shenfenzheng_img_box span[data-v-70835c15] {
  display: inline-block;
  width: 8.9rem;
  height: 4.5rem;
  /*background: url(../../assets/images/zhifu/108-120@2x.png) no-repeat;
    background-size: 100%;*/
}

.realname_box .envi input[data-v-70835c15] {
  opacity: 0;
  padding: 0;
  width: 100%;
  height: 4.5rem;
  background-size: 1.25rem;
}

.realname_box {
  margin-top: 0.25rem;
  box-sizing: border-box;
  overflow-y: auto;

  .realname_form_content {
    // 表单信息部分
    box-sizing: border-box;
    width: 100%;
    padding: 0 0.25rem;
    background: white;

    li {
      margin-top: 0.25rem;
      width: 100%;
      display: flex;
      height: 1rem;
      label,
      input {
        height: 100%;
        line-height: 1;
        justify-content: flex-start;
        align-items: center;
      }
      label {
        display: inline-block;
        line-height: 1rem;
        margin-right: 0.375rem;
        width: 2.3rem;
      }
      input {
        outline: none;
        border: 1px solid white;
      }
    }
    .realname_birthday_line {
      position: relative;
    }
    .realname_birthday_mask {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0.325rem;
      right: 0;
      bottom: 0;
      padding-left: 2.375rem;
    }
    .realname_status_line span,
    .realname_sex_line span {
      display: inline-block;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .realname_status_line span:nth-of-type(1),
    .realname_sex_line span:nth-of-type(1) {
      margin-right: 0.9rem;
    }
  }
  .zhengshu_box {
    // 证书部分
    box-sizing: border-box;
    padding: 0.375rem 0.25rem 0 0.25rem;
    width: 100%;
    div {
      width: 100%;
    }
    .zhengshu_title span {
      font-size: 0.35rem;
    }
    .zhengshu_title span:first-child {
      color: #282828;
    }
    .zhengshu_title span:last-child {
      color: #3993e9;
    }
    .zhengshu_img_box {
      box-sizing: border-box;
      padding: 0.375rem 0 0.375rem 0;
      span {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }


  .shenfenzheng_box {
    // 身份证部分
    box-sizing: border-box;
    padding: 0.375rem 0.25rem 0 0.25rem;
    width: 100%;
    background: white;
    div {
      width: 100%;
    }
    .shenfenzheng_title span {
      font-size: 0.35rem;
    }
    .shenfenzheng_title span:first-child {
      color: #282828;
    }
    .shenfenzheng_title span:last-child {
      color: #3993e9;
    }
    .shenfenzheng_img_box {
      box-sizing: border-box;
      padding: 0.375rem 0 0.375rem 0;
      span {
        display: inline-block;
        width: 100%;
        height: 4.5rem;
      }
    }
  }
  .tiJiao {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .tiJiao button {
    display: inline-block;
    outline: none;
    padding: 0 0.3rem;
    width: 80%;
    border-radius: 0.5rem;
    margin: 0 auto;
    border: none;
    height: 1.0rem;
    background: #3993e9;
    color: #fff;
  }
  .userInfo_logo {
    display: inline-block;
    width: 1rem;
    /* height: 1rem; */
    margin-top: 0.25rem;
  }
  .envizheng {
    background-image: url("../../assets/images/zhifu/tianjiatupian@2x (3).png");
    background-size: 100% 100%;
    height: 4.5rem;
  }

  .envizheng input {
    opacity: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .envifan {
    background-image: url("../../assets/images/zhifu/tianjiatupian@2x (3).png");
    background-size: 100% 100%;
    height: 4.5rem;
  }
  .envifan input {
    opacity: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .enviTeach {
    background-image: url("../../assets/images/zhifu/108-120@2x.png");
    background-size: 100% 100%;
    height: 1.5rem;
  }
  .enviTeach input {
    opacity: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .mu-dialog{
    height: auto;
  }
}
</style>
