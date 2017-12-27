<template>
  <div id="center">
     <mt-header title="个人中心">
      <div slot="left">
        <mt-button icon="back" @click="toHome()"></mt-button>
      </div>
        <mt-button slot="right">
            <img class="bianji" src="../assets/images/zhongxin/bianjiziliao@2x.png" @click="tiao('userInfo')"/>
        </mt-button>
    </mt-header> 
    <div class="headerBai"></div>
    <div class="niCheng">
      <figure>
          <div v-if="dengFlag">
            <img :src="imgUrl">
          </div>
          <div v-else>
            <img src="../assets/images/shouye/morentouxiang@2x.png" alt="">
          </div>
          <figcaption>
          <p>{{ nickname }}</p>
          </figcaption>
      </figure>
    </div>
    <!--选项列表  -->
    <div class="detailsList">
      <div class="item" @click="tiao('zhichi')">
          <img class="pic" src="../assets/images/zhongxin/wozhichide@2x.png" alt="">
          <span>
            我支持的
          </span>
      </div>
      <div class="item" @click="tiao('guanzhu')">
          <img class="pic" src="../assets/images/zhongxin/woguanzhude@2x.png" alt="">          
        <span>            
            我关注的
        </span>
      </div>
      <div class="item" @click="tiao('faqi')">
          <img class="pic" src="../assets/images/zhongxin/wofaqide@2x.png" alt="">          
        <span>            
            我发起的
        </span>

      </div>
     

    </div>
  
  </div>
</template>

<script>
export default {
  name: 'center',
  data () {
    return {
      niCheng:"我的昵称",
      nickname:this.$route.query.nickname,
      imgUrl:this.$route.query.myImg,
      dengFlag:false
    }
  },
  created(){
    if(window.localStorage.access_token&&window.localStorage.user_id){
        // 有缓存
        this.dengFlag = true
    }
  },
  methods:{
    toHome(){
      this.$router.push({
        name:"home"
      })
    },
    tiao(i){
      this.$router.push({
        name:i
      })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
  #center{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
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
      .niCheng{
        width:100%;
        height: 2.25rem;
        margin: 0 auto;
        text-align: center;
        background: #26a2ff;
        margin-bottom: 0.25rem;
        p{
          color: #fff;
        }
        img{
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%
        }
      }
      .detailsList{
        box-sizing: border-box;
        margin: 2rem 1.35rem 0 1.35rem;
        background: #f5f5f5; 
        border-radius:0.15rem; 
      }
        .item{
          border: 1px solid #fff;
          border-bottom: 1px solid #eee;
          width: 100%;
          height: 1.425rem;
          line-height: 1.425rem;
          position: relative;
          text-align: center;
          background: #fff;
          margin-bottom: 1.2rem;
          border-radius:0.25rem; 
          .pic{
            width: 0.5rem;
            height:  0.5rem;
            position: absolute;
            top: 50%;
            left: 35%;
            -webkit-transform: translateY(-50%);  
          }
          span{
            box-sizing: border-box;
            padding-left: 1rem;
            font-weight:600;
            color:#000000; 
          }
      }

     } 
    .mint-button {
      height: 100%;
    }
    .mint-header{
      background-color: #3993e9;
    }
    .niCheng p{
      color: #282828;
    }

    .bianji{
      width: 0.4rem;
    }

</style>
