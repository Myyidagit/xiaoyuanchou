<template>
  <div id="us">
    <mt-header title="关于我们">
        <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="headerBai"></div>
    <div class="content">
      <img src="../assets/images/aboutus/bg.jpg">
      <div class="content_p">
        <ul>
          <li>联系我们：010-56266737</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homea',
  data () {
    return {
      msg: '稍后通知',
      award:{}
    }
  },
  created(){

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
  #us{
    text-align: center;
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
      height: 1.0rem;
    }
    .content{
      width: 100%;
      height: auto;
      img{
        width: 100%;
        height: 15.5rem;
      }
      .content_p{
        position: absolute;
        bottom: 1.5rem;
        width: 100%;
        text-align: center;
        color: #fff;
      }
    }
  }
</style>
