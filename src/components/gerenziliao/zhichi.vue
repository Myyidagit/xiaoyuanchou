<template>
  <div id="zhichi">
     <mt-header title="我支持的">
      <div slot="left">
        <mt-button icon="back" onclick="history.back()"></mt-button>
      </div>
    </mt-header>
    <div class="headerBai"></div>
    <ul v-if="zhichiList.length<=0" class="zhiChia">
      <p @click="toHome()">你没有支持任何数据，点我去支持吧</p>
    </ul>
    <ul class="zhiChi" v-else>
      <li v-for="item in zhichiList" @click="toXiangQing(item)">
        <div class="zhiChi_banner">
          <img :src="item.banner" width="100%" height="100%"/>
          <div v-if="item.entry_status == 1" class="zhiChi_status">
            预热
          </div>
          <div v-if="item.entry_status == 2" class="zhiChi_status">
            众筹中
          </div>
          <div v-if="item.entry_status == 3" class="zhiChi_status">
            众筹成功
          </div>
          <div v-if="item.entry_status == 4" class="zhiChi_status">
            众筹失败
          </div>
          <p>{{item.name}}</p>
        </div>
        <div class="zhiChi_money">
          <div>
            <span>已筹金额&#40;元&#41;</span>
            <span>{{ item.current_amount }}</span>
          </div>
          <div>
            <span>目标金额&#40;元&#41;</span>
            <span>{{ item.target_money }}</span>
          </div>
          <div>
            <span>支持金额&#40;元&#41;</span>
            <span>{{ item.support_amount }}</span>
          </div>
        </div>
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
  name: 'fenxiang',
  data () {
    return {
      snackbar: false,//弹窗默认不显示
      toastmsg:"",//存储 弹窗的文字
      loading: false,//下拉刷新
      scroller: null,//下拉刷新
      zhichiList:[],
      page:1,
      allPage:1,
      rows:10
    }
  },

  methods:{
    loadMore () {
      this.loading = true
      if(this.page >= this.allPage){
        this.loading = false
      }else{
        var time = setTimeout(() => {
        this.loading = false
        this.page +=1
        this.upZhichi()
        }, 2000)
      }

    },
    upZhichi(){
      this.axios({
        url: this.baseUrl.testUrl+"/operation/v1/support",
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
                this.zhichiList.push(item)
              })
          }
      })
    },
    getZhichi(){
      this.axios({
        url: this.baseUrl.testUrl+"/operation/v1/support",
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
            this.zhichiList = res.data.data.list
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
    this.getZhichi()
  },
  mounted(){
    this.scroller = this.$el;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
  #zhichi{
    .zhiChia{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #fff;
    }
    .zhiChi{
      box-sizing: border-box;
      margin: 0 0.25rem 0 0.25rem;
      li{
        margin-top: 0.25rem;
        border-radius: 1rem;
        .zhiChi_banner{
          position: relative;
          width: 100%;
          height: 2.9rem;
          background-size: 100% 100%;
          p{
            position: absolute;
            top: 85px;
            left: 10px;
            color: #fff;
          }
          .zhiChi_status{
            position: absolute;
            top:0.125rem;
            right:0.125rem;
            width: 1.625rem;
            height: 0.575rem;
            background: url("../../assets/images/xiangqing/zhongchouzhuangtai@2x.png") no-repeat;
            background-size:100% 100%;
            line-height: 0.4rem ;
            color: #fff;
            font-size: 12px;
            text-align: center;
          }
        }
        .zhiChi_money{
          width: 100%;
          background: white;
          overflow: hidden;
          padding: 0.575rem 0.5rem;
          div{
            display: flex;
            justify-content: space-between;

            :first-child{
              color: #a7a7a7;
              font-size: 0.3rem;
            }
            :last-child{
              color: #000000;
              font-size: 0.35rem;
            }
          }
          :not(:last-child){
              margin-bottom: 0.25rem;
            }
        }
      }
    }

  }

</style>
