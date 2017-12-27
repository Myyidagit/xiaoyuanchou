<template>
  <div id="paysuccess">
      <!--head  -->
        <mt-header title="支付成功">
        <div slot="left">
             <mt-button icon="back" @click="historyback()"></mt-button>
        </div>
        </mt-header>
        <div class="headerBai"></div>

        <div class="paysuccess_box">
              <img src="../../assets/images/zhifu/zhifuchenggong@2x.png"/>
              <div>支付成功</div>
        </div>

        <div class="paysuccess_tips">
          重要提示:本平台不会以短信,qq,邮件等任何形式为由要求您点击任何连接进行退款
        </div>

  </div>
</template>

<script>
// import { Toast } from 'mint-ui';
export default {
  name: 'paysuccess',
  data () {
    return {
      url:window.localStorage.xiangqingUrl
    }
  },
  methods:{
    historyback(){
      window.location = this.url;
    }

  },
  created(){

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
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
  height: 1rem;
}
  .paysuccess_box{
    margin-top: 0.375rem;
    box-sizing: border-box;
    width: 100%;
    background: white;
    text-align: center;
    overflow: hidden;
    img{
      width: 0.65rem;
      margin-top: 0.75rem;
    }
    div{
      margin-top: 0.375rem;
      margin-bottom: 0.75rem;
    }
  }

  .paysuccess_tips{
    box-sizing: border-box;
    width: 100%;
    padding: 0.375rem 0.375rem;
    font-size: 0.35rem;
    color: #3993e9;
  }


</style>
