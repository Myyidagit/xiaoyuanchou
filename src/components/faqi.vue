<template>
  <div id="faqi">
      <!--head  -->
        <mt-header title="我发起的">
        <div slot="left">
             <mt-button icon="back" onclick="history.back()"></mt-button>
        </div>
        </mt-header>
        <div class="headerBai"></div>
        <div class="faqi_tips">
          <span class="payBack">
          众筹成功，客服会在3-5个工作日内联系您;众筹失败，系统会将已筹款项退还支持者。
          </span>
          <img @click="closeSucess()" class="close_faqi_tips" src="../assets/images/guanbi@2x.png"/>
        </div>
        <ul v-if="faqiList.length<=0" class="list_boxa">
          <p @click="toHome()">你没有发起任何数据，点我去发起吧！</p>
        </ul>
        <ul class="list_box" v-for="item in faqiList" @click="toXiangQing(item)" v-else>
            <li class="faqi_list">
              <div v-if="item.entry_status == 1" class="faqi_status">
                预热
              </div>
              <div v-if="item.entry_status == 2" class="faqi_status">
                众筹中
              </div>
              <div v-if="item.entry_status == 3" class="faqi_status">
                众筹成功
              </div>
              <div v-if="item.entry_status == 4" class="faqi_status">
                众筹失败
              </div>
              <div class="faqi_main_img">
                <img :src="item.banner" width="100%" height="100%"/>
              </div>
              <div class="faqi_title">{{ item.name }}</div>
              <div class="faqi_jin_e">{{ item.target_money }}</div>
              <div class="faqi_mu_biao">目标金额(元)</div>
              <img class="faqi_list_del" src="../assets/images/faqi/shanchu@2x.png" @click="deleteList()"/>
              <div class="tishi" v-if="item.entry_status == 5">
                众筹失败，客服会在3-5个工作日内联系您帮您退款
              </div>
            </li>
        </ul>
    <!--toast  -->
    <mu-toast v-if="snackbar" :message="toastmsg"/>
    <!-- 下拉加载更多 -->
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>

<script>
export default {
  name: 'realname',
  data () {
    return {
      snackbar: false,//弹窗默认不显示
      toastmsg:"",//存储 弹窗的文字
      loading: false,//下拉刷新
      scroller: null,//下拉刷新
      faqiList:[],
      page:1,
      allPage:1,
      rows:10
    }
  },
  methods:{
    closeSucess(){
      $(".faqi_tips").hide(200)
    },
    loadMore () {
      this.loading = true
      if(this.page >= this.allPage){
        this.loading = false
      }else{
        var time = setTimeout(() => {
        this.loading = false
        this.page +=1
        this.upFaqi()
        }, 2000)
      }

    },
    upFaqi(){
      this.axios({
        url: this.baseUrl.testUrl+"/operation/v1/release",
        method: 'POST',
        headers: {
          user_id:window.localStorage.user_id,
          access_token:window.localStorage.access_token
        },
        params:{
          page:this.page,
          rows:this.rows
        }
      }).then(res=>{

        console.log(res)
          if(res.data.code == 1200){
            res.data.data.list.map(item=>{
                this.faqiList.push(item)
              })
          }
      })
    },
    deleteList(){

    },
    getFaqi(){
      this.axios({
        url: this.baseUrl.testUrl+"/operation/v1/release",
        method: 'POST',
        headers: {
          user_id:window.localStorage.user_id,
          access_token:window.localStorage.access_token
        },
        params:{
          page:this.page,
          rows:this.rows
        }
      }).then(res=>{
        console.log(res)
          if(res.data.code == 1200){
            this.faqiList = res.data.data.list
            this.allPage = res.data.data.pageTotal
          }
      })
    },
    showToast(_msg){
        // 展示  toast
        this.snackbar = true;
        this.toastmsg=_msg;
        this.closeToast();
    },
    closeToast(){
    // 定时关闭toast
    if (this.toastTimer) {
      clearTimeout(this.toastTimer)
        };
      this.toastTimer = setTimeout(() => { this.snackbar = false }, 2000)
    },
    toXiangQing(item){
      if(item.entry_status == 4){
        this.showToast("众筹失败")
      }else{
        this.$router.push({
          name:"xiang",
          query:{
            entry_id:item.entry_id
          }
        })
      }
    },
    toHome(){
      this.$router.push({
          name:"home",
        })
    }
  },
  created(){
    this.getFaqi()
  },
  mounted(){
    this.scroller = this.$el;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  /* @import "../assets/css/faqi.css" */
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

.headerBai {
    width: 100%;
    height: 1rem;
}
.list_boxa{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #fff;
}
.faqi_tips {
    width: 100%;
    height: 1.5rem;
    background: #3993e9;
    color: #fff;
    box-sizing: border-box;
    padding: 0.25rem 1.25rem 0 0.375rem;
    font-size: 0.3rem;
    position: relative;
}

.close_faqi_tips {
    position: absolute;
    top: 0.6rem;
    right: 0.375rem;
    width: 0.25rem;
    height: 0.25rem;
}

.list_box img {
    border: 0;
    vertical-align: middle;
    display: inline-block;
}

.list_box {
    box-sizing: border-box;
    padding: 0.5rem 0.95rem 0 0.95rem;
    width: 100%;
    position: relative;
}

.faqi_status {
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    width: 1.625rem;
    height: 0.575rem;
    background: url("../assets/images/xiangqing/zhongchouzhuangtai@2x.png") no-repeat;
    background-size: 100% 100%;
    line-height: 0.4rem;
    color: #fff;
    font-size: 12px;
    text-align: center;
}

.list_box li {
    width: 100%;
    overflow: hidden;
    background: white;
    margin-bottom: 0.25rem;
}

.faqi_list {
    position: relative;
}

.faqi_main_img {
    width: 100%;
    height: 3.3rem;
    background-size:100% 100%;
}

.faqi_list_del {
    width: 0.875rem;
    position: absolute;
    bottom: 0;
    right: 0;
}

.faqi_title {
    text-align: center;
    font-size: 0.35rem;
    color: #282828;
    margin-top: 0.25rem;
}

.faqi_jin_e {
    text-align: center;
    font-size: 0.675rem;
    color: #ff0000;
    margin-top: 0.75rem;
}

.faqi_mu_biao {
    text-align: center;
    font-size: 0.35rem;
    color: #282828;
    margin: 0.25rem 0 0.75rem 0;
}

</style>
