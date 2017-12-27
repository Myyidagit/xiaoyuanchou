<template>
  <div id="homeb">
    <h1>wode</h1>

  </div>
</template>

<script>
export default {
  name: 'homeb',
  data(){
    return{

    }
  },
  mounted () {

  },
  created(){

  },
  methods: {


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
  #homea{
    .biaoYu{
      width: 100%;
      background: #fff;
      height: 1.25rem;
      line-height: 1.25rem;
      font-size: 0.5rem;
      text-indent: 0.5rem;
      font-size: 16px;
    }
    .bannerImg{
      position: relative;
    }
    .biao{
      position: absolute;
      right: 5px;
      top: 5px;
      width: 65px;
      height: 25px;
      background: url(../../assets/images/shouye/zhongchouzhuangtai@2x.png) no-repeat;
      background-size: 100%;
      font-size: 12px;
      text-align: center;
      color: #fff;

    }
    .demo-slider{
      height: 0.5rem;
      background: #fff;
    }
    .money{
      background: #fff;
    }
    .money ul{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 0.625rem;
      background: #fff;
      padding-bottom: 10px;
    }
    .money p:first-child{
      text-indent: 20px;
    }
    .money p:first-child span{
      color: #ff0000;
    }
    .money ul li h2{
      color: #3993e9;
      text-align: center;
    }
  }
</style>
