<template>
  <div id="sanfang">
        <mt-header title="三方登录">
        <div slot="left">
             <mt-button icon="back" onclick="history.back()"></mt-button> 
        </div>
        </mt-header>
        <div class="headerBai"></div>
        <ul @click="dian()">
          <li><img src="../../assets/images/sanfang/weixin@2x.png" height="25" width="25" alt=""></li>
          <li>微信</li>
          <li>
            <span v-if="wechat == 2">已绑定</span>
            <span v-if="wechat != 2">未绑定</span>
          </li>
        </ul>
        <ul @click="dian()">
          <li><img src="../../assets/images/sanfang/qq@2x.png" height="25" width="25" alt=""></li>
          <li>QQ</li>
          <li>
            <span v-if="qq == 2">已绑定</span>
            <span v-if="qq != 2">未绑定</span>
          </li>
        </ul>
        <ul @click="dian()">
          <li><img src="../../assets/images/sanfang/weibo@2x.png" height="25" width="25" alt=""></li>
          <li>微博</li>
          <li>
            <span v-if="weibo == 2">已绑定</span>
            <span v-if="weibo != 2">未绑定</span>
          </li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'sanfang',
  data () {
    return {
        qq:this.$route.query.qq,
        weibo:this.$route.query.weibo,
        wechat:this.$route.query.wechat
    }
  },
  methods:{
    dian(){
 
    }
  },
  created(){
    console.log(this.qq)
    console.log(this.weibo)
    console.log(this.wechat)
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
  #sanfang{
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
    ul{
        height: 1.25rem;
        background: #fff;
        margin-top: 0.375rem;
        position: relative;
        align-items:center;
        display: flex;
        li{
          margin-left: 0.25rem;
          height: 0.625rem;
          line-height: 0.625rem;
        }
        li:nth-child(2){
          width: 1.8rem;
        }
        li:last-child{
          width: 2.0rem;
          margin-left: 45%;
          text-align: center;
          background: url(../../assets/images/sanfang/tiaoyejiantou@2x.png) no-repeat right center;
          background-size: 0.2rem;
        }

    }
  }

</style>
