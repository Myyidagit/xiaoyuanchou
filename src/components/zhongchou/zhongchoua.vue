<template>
  <div id="zhongchou">
      <div>
        <mt-header title="发起众筹">
          <div slot="left">
               <mt-button icon="back" onclick="history.back()"></mt-button> 
          </div>
          <div slot="right" @click="zhifu()">

            zhifu
          </div>
        </mt-header>
        <div class="headerBai"></div>
      </div>
      </mt-header>
      <div class="list">
        <div class="tou">项目详情</div>
        <div class="name">
            <input type="text" v-model="zhongchou.name" placeholder="越好的名称成功几率越高~">
        </div>
      </div>
      <div class="list">
          <div class="tou">项目详情</div>
          <div class="money">
              <input type="text" v-model="zhongchou.target_money" placeholder="填写目标金额~"><span>元</span>
          </div>
      </div>
      <div class="xiangImg">
          <div class="tou">项目图片</div>
          <div class="xiang__Img">

            <span class="userInfo_logo">
                  <div class="form-group">
                    <form id="upload_peojectImg" action="http://up-z1.qiniu.com/" method="post" enctype="multipart/form-data">
                      <div class="peojectImg">
                        <input name="token" type="hidden" v-model="uploadToken">
                        <input type="file" name="file" @change="peojectImg"/>
                      </div>
                    </form>
                  </div>
            </span>

          </div>
      </div>
      <div class="xiangMu">
          <div class="tou">项目描述</div>
          <textarea name="" class="text" cols="30" rows="10"></textarea>
          <div class="xiangMu_img">
              <div v-for="(iteam,index) in imgs" :key="index" :style="{backgroundImage: 'url(' + iteam + ')'}" class="miaoshu_img">
                  
              </div>
            <span class="userInfo_logodes">
              <div class="form-group"> 
                <form id="upload_peojectImga" action="http://up-z1.qiniu.com/" method="post" enctype="multipart/form-data">
                      <div class="projectDesa">
                        <input name="token" type="hidden" v-model="uploadToken">
                        <input type="file" name="file" @change="projectDesa"/>
                      </div>
                </form>                  
              </div>
            </span>
          </div>
           
      </div>
      <div class="fen_lei_box">
        <div class="tou">项目分类</div>
        <input class="fenlei_result" v-model="fenlei_result" placeholder="请您选点击择分类"/>
        <div class="open_fenlei" @click="openBottomSheet">
        </div>
      </div>
      <div class="time">
        <div class="tou">起止时间</div>
        <div class="name">
          <mu-date-picker v-model="zhongchou.start_time" hintText="请选择开始时间"/>
          <mu-date-picker v-model="zhongchou.end_time" hintText="请选择结束时间"/>
        </div>
      </div>

      <div class="bottomButton" @click="faBu()">
        <mu-raised-button label="确认发布" class="demo-raised-button" secondary/>
      </div>

    <!-- 分类选择器 --> 
      <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
        <mu-list @itemClick="closeBottomSheet">
          <mu-list-item class="fenlei_item" style="text-align:center;" v-for=" (item,index) in fen_lei_list" :key="index" :title="item.name" @click="choseFenLei(item.name,index)"/>
        </mu-list>
      </mu-bottom-sheet>
      <!--toast  -->
    <mu-toast v-if="snackbar" :message="toastmsg"/>
  </div>
</template>

<script>
// import Myimg from "../tupian.vue"
import '../../assets/js/jquery.form/jquery.form'
import { Indicator } from 'mint-ui';
export default {
  name: 'homea',
  components:{
    // Myimg
  },
  data () {
    return {
      user_id:window.localStorage.user_id,
      access_token:window.localStorage.access_token,
      zhongchou:{
        name:"",
        classification:0,
        banner:"",//项目图片
        introduction:"",
        target_money:"",
        start_time:'',//最终页面展示的日期
        end_time:"",
        images:""//提交后台的string  用 ","隔开
      },
      uploadToken: "",          //上传图片凭证
      form:{
        poster:''//海报
      },
      temp_images:[],//数组中 暂存  hash ,点击提交按钮的时候 转为string
      imgs:[],//项目描述的多张图片(数组)
      bottomSheet: false,//分类选择 开关
      fenlei_result:"",//页面最终显示的选择结果
      fen_lei_list:[//存分类选择数组
        {name:"活动策划"},
        {name:"作品制作"},
        {name:"创业项目"}
      ],
      snackbar: false,//弹窗默认不显示
      toastmsg:""//存储 弹窗的文字
    }
  },
  created(){
    console.log()
    this.axios({
        url: this.baseUrl.testUrl+"/qiniu/v1/getSimplicityToken",
        method: 'GET',
        headers: {
          user_id:this.user_id,
          access_token:this.access_token
        },
        params: {             
          bucket:'tbd-images'     
        }
      }).then(res=>{
          console.log(res.data)
          this.uploadToken = res.data.data;

      });
  },
  methods:{
    zhifu(){
      this.$router.push({
        name:"zhifu",
        images:""
      })
    },
    peojectImg (e) {
      var _this = this;
      var file = e.target.files[0];
      var supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (file && supportedTypes.indexOf(file.type) >= 0) {
        this.form.poster = this.getImgUrl(file);
        $(".peojectImg").css("backgroundImage","url("+this.form.poster+")");
      } else {
        alert('文件格式只支持：jpg、jpeg 和 png');
      }
    },
    projectDesa (e) {
      var _this = this;
      var file = e.target.files[0];
      var supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (file && supportedTypes.indexOf(file.type) >= 0) {
        _this.imgs.push(_this.getImgUrl(file))  
        $('#upload_peojectImga').ajaxSubmit(function (data) {
          _this.temp_images.push(data.hash);  
        }); 
        
      } else {
        alert('文件格式只支持：jpg、jpeg 和 png');
      }
    },
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
    delete_img(item){
      this.imgs.splice(item,1);
    },
    add_img(event){
      var reader =new FileReader();
      var img1=event.target.files[0];

      reader.readAsDataURL(img1);
      var that=this;
      reader.onloadend=function(){
        if(that.imgs.length>2){
          console.log("最多3张")
          $(".room_add_img").addClass("xiaoshi")
        }else{
          that.imgs.push(reader.result)
        }
      }
    },
    closeToast(){
      // 定时关闭toast
      if (this.toastTimer) {
        clearTimeout(this.toastTimer)
        };
      this.toastTimer = setTimeout(() => { this.snackbar = false }, 2000)
    },
    showToast(_msg){
      // 展示  toast
        this.snackbar = true;
        this.toastmsg=_msg;
        this.closeToast(); 
    },
    faBu(){
      //提交数据
      if(this.zhongchou.name == ""){
        this.showToast("项目名字不能为空");
      }else if(this.zhongchou.target_money == ""){
        this.showToast("金额不能为空");
      }else{
        Indicator.open("发布中......")
        this.zhongchou.introduction =  $(".text").val()    
        var _this = this; 
        $('#upload_peojectImg').ajaxSubmit(function (data) { 
          _this.zhongchou.banner =  data.hash;    
          _this.zhongchou.images=_this.temp_images.join(",");
          console.log(_this.zhongchou)
            _this.axios({            
                url: _this.baseUrl.testUrl+"/entry/v1/release",
                method: 'POST',
                headers: {
                  user_id:_this.user_id,
                  access_token:_this.access_token
                },
                params: _this.zhongchou
            }).then(res=>{
                  console.log(res)
                  if(res.data.code == 1200){
                    Indicator.close();
                  }else if(res.data.code == 1500){
                    Indicator.close();
                    _this.showToast("服务器错误，请稍后再试");
                  }
            }).catch(function (err) {
                console.log(err)
            })          
        })
      }
         
      
        
    },
     closeBottomSheet () {
      // 关闭分类选择器
      this.bottomSheet = false
    },
    openBottomSheet () {
      // 打开分类选择器
      this.bottomSheet = true
    },
    choseFenLei(fenlei,index){
      // 选中分类
      this.fenlei_result=fenlei;
      this.zhongchou.classification = index+1;
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
  #zhongchou {
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
      height: 40px;
      line-height: 1;
      padding: 0 10px;
      position: fixed;
      z-index: 66666;
      top: 0;
      width: 100%;
      text-align: center;
      white-space: nowrap;
    }
    .headerBai{
      width: 100%;
      height: 41px;
    }
    .show{
      width:none;
      margin:none; 
      font-size:none; 
      background:none;
    }
    /*上传图片*/
    .userInfo_logo {
      display: inline-block;
      width: 7.5rem;
      height: 3rem;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .userInfo_logodes {
      display: inline-block;
      width: 30%;
      height: 3rem;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .peojectImg {
      background-image: url("../../assets/images/shenfenzheng.png");
      background-size: 100% 100%;
      height: 3rem;
    }

    .peojectImg input {
      opacity: 0;
      padding: 0;
      width: 100%;
      height: 1rem;
    }
    .projectDesa {
      background-image: url("../../assets/images/shenfenzheng.png");
      background-size: 100% 100%;
      height: 3rem;
    }

    .projectDesa input {
      opacity: 0;
      padding: 0;
      width: 100%;
      height: 1rem;
    }
     .projectDesb {
      background-image: url("../../assets/images/shenfenzheng.png");
      background-size: 100% 100%;
      height: 3rem;
    }

    .miaoshu_img{
      float: left;
      display: block;
      background-size: 100% 100%;
      width: 32%;
      height: 3rem;
      margin-left: 2px;
      margin-top: 2px;
    }
    .projectDesb input {
      opacity: 0;
      padding: 0;
      width: 100%;
      height: 1rem;
    }
     .projectDesc {
      background-image: url("../../assets/images/shenfenzheng.png");
      background-size: 100% 100%;
      height: 3rem;
    }
    /*项目描述图片样式*/
  .xiangMu .xiangMu_img{
      width: 90%;
      margin-left: 10%;
    }
    .projectDesc input {
      opacity: 0;
      padding: 0;
      width: 100%;
      height: 1rem;
    }
    /**/
    .list{
      width: 100%;
      height: 110px;
      background: #fff;
      margin-top: 10px;
      .name{
        width: 92%;
        height: 40px;
        background: #f5f9fe;
        color: #a7a7a7;
        margin-left: 22px;
        input{
          width: 100%;
          height: 40px;
          background: #f5f9fe;
          border: none;
          outline: none;
        }
      }
      .money{
        width: 95%;
        height: 40px;
        background: #f5f9fe;
        color: #a7a7a7;
        margin-left: 22px;
        input{
          width: 90%;
          height: 40px;
          background: #f5f9fe;
          border: none;
          outline: none;
        }
      }
    }
      .tou{
      height: 1.25rem;
      line-height: 1.25rem;
      text-indent: 0.75rem;
      background: url(../../assets/images/xiangqing/biaotiqianzhui@2x.png) no-repeat 0.375rem center;
      background-size: 0.075rem;
    }
    .xiangImg{
      width: 100%;
      background: #fff;
      margin-top: 10px;
      .xiang__Img{
        width: 85%;
        margin-left: 10%;
      }
    }
    .xiangMu{
      width: 100%;
      background: #fff;
      margin-top: 10px;
      .text{
        overflow-y: auto;
        width: 85%;
        height: 90px;
        border: none;
        background: #f5f9fe;
        resize: none;
        margin-left: 10%;
      }
      .miaoShu{
        width: 92%;
        height: 40px;
        background: #f5f9fe;
        color: #a7a7a7;
        margin-left: 22px;
        input{
          width: 90%;
          height: 90px;
          background: #f5f9fe;
          border: none;
          outline: none;
        }
      }
      .xiangMu_img{
        /* width: 85%;
        margin-left: 9%; */
      }
    }
    .time{
      width: 100%;
      background: #fff;
      margin-top: 10px;
      .name{
        height: 150px;
        margin-left: 20px;
      }
    }
    .bottomButton{
        width: 250px;
        margin: 40px auto;
        .mu-raised-button-secondary{
          background: #3993e9;
          width: 250px;
          height: 50px;
          border-radius: 25px;

        }
      }
      /*duozhang*/
      .xiaoshi{
  display: none;
}
   .finish_room{
      width: 100%;
      height: auto;
  }

     .finish_room2{
     width: 100%;
     height: auto;
     padding-top: 15px;
     padding-bottom: 15px;
     display: flex;
     align-items: center;
     flex-wrap:wrap;
/*     justify-content: space-around;*/
      border-bottom: 2px solid #e1e1e1;
   }
    
   .finish_room2 .room_img{
     width: 30%;
    height: 100px;
     position: relative;
     margin: 5px;
   }
   .finish_room2 .room_img img{    
     width: 100%;
     height: 100%;
   }
   .finish_room2>.room_img span{
      position: absolute;
      width: auto;
      height: auto;
      right: 5px;
      bottom:3px;
      img{
        width: 20px;
        height: 20px;
      }
   }
 


   .room_add_img{
     width: 100px;
     height: 100px;
     border:1px solid #e1e1e1;
     display: flex;
     flex-direction: column;
     align-items: center;
     flex-wrap:wrap;
     justify-content: space-around;
     position: relative;
     margin-left: 5px;
     background:  #f5f9fe;
   }
   .room_add_img >span:nth-child(1){
     margin-top: 20px;
     width: 40px;
     height: 40px;
     overflow: hidden;
   }
   .room_add_img >span:nth-child(2){
      margin-bottom: 10px;
   }

  .room_add_img input{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 99999;
      opacity: 0;

  }
  .fen_lei_box{
      position: relative;
      width: 100%;
      height: 2.75rem;
      background: #fff;
      margin-top: 0.25rem;
    }

    .open_fenlei{
      position: absolute;
      top:0;
      right: 0;
      bottom :0;
      left: 0;
    }
    .fenlei_result{
      border: 1px solid white;
      width: 100%;
      padding-left: 0.4rem;
    }

    .fenlei_item{
      text-align: center;
    }
}
</style>
