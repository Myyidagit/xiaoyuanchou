<template>
  <div id="guanzhu">
    <mt-header title="我关注的">
      <div slot="left">
        <mt-button icon="back" onclick="history.back()"></mt-button>
      </div>
    </mt-header>
    <div class="headerBai"></div>
    <ul v-if="guanzhuList.length<=0" class="guanZhua">
      <p @click="toHome()">你没有关注任何数据，点我去关注吧</p>
    </ul>
    <ul class="guanZhu" v-else>
      <li v-for="item in guanzhuList" @click="toXiangQing(item)">
        <div class="guanZhu_banner">
          <img :src="item.banner" width="100%" height="100%"/>
          <div v-if="item.entry_status == 1" class="guanZhu_status">
            预热
          </div>
          <div v-if="item.entry_status == 2" class="guanZhu_status">
            众筹中
          </div>
          <div v-if="item.entry_status == 3" class="guanZhu_status">
            众筹成功
          </div>
          <div v-if="item.entry_status == 4" class="guanZhu_status">
            众筹失败
          </div>
          <p>{{item.name}}</p>
        </div>
        <div class="guanZhu_money">
          <div class="guanZhu_monry_left">
            <span>{{ item.support_amount }}</span>
            <span>已筹金额&#40;元&#41;</span>
          </div>
          <div class="guanZhu_monry_right">
            <span>{{ item.target_money }}</span>
            <span>目标金额&#40;元&#41;</span>
          </div>
        </div>
        <div class="tishi" v-if="item.entry_status == 5">
          众筹失败，客服会在3-5个工作日内联系您帮您退款
        </div>
      </li>
    </ul>
    <!--toast  -->
    <mu-toast v-if="snackbar" :message="toastmsg" />
    <!-- 下拉加载更多 -->
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
  </div>
</template>

<script>
export default {
  name: 'fenxiang',
  data() {
    return {
      snackbar: false,//弹窗默认不显示
      toastmsg: "",//存储 弹窗的文字
      loading: false,//下拉刷新
      scroller: null,//下拉刷新
      guanzhuList: [],
      page: 1,
      allPage: 1,
      rows: 10,
      imgurl: "../../assets/images/shouye/bannerImg.jpg"

    }
  },

  methods: {
    loadMore() {
      this.loading = true
      if (this.page >= this.allPage) {
        this.loading = false
      } else {
        var time = setTimeout(() => {
          this.loading = false
          this.page += 1
          this.upGuan()
        }, 2000)
      }

    },
    upGuan() {
      this.axios({
        url: this.baseUrl.testUrl + "/operation/v1/attention",
        method: 'POST',
        headers: {
          user_id: window.localStorage.user_id,
          access_token: window.localStorage.access_token
        },
        params: {
          page: this.page,
          rows: this.rows
        }
      }).then(res => {

        console.log(res)
        if (res.data.code == 1200) {
          res.data.data.list.map(item => {
            this.guanzhuList.push(item)
          })
        }
      })
    },
    getGuan() {
      this.axios({
        url: this.baseUrl.testUrl + "/operation/v1/attention",
        method: 'POST',
        headers: {
          user_id: window.localStorage.user_id,
          access_token: window.localStorage.access_token
        },
        params: {
          page: this.page,
          rows: this.rows
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 1200) {
          this.guanzhuList = res.data.data.list
          this.allPage = res.data.data.pageTotal
        }
      })
    },
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
    toXiangQing(item) {
      if (item.entry_status == 4) {
        this.showToast("众筹失败")
      } else {
        this.$router.push({
          name: "xiang",
          query: {
            entry_id: item.entry_id
          }
        })
      }
    },
    toHome() {
      this.$router.push({
        name: "home",
      })
    }
  },
  created() {
    this.getGuan()
  },
  mounted() {
    this.scroller = this.$el;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
#guanzhu {
  .guanZhua {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
  }
  .guanZhu {
    box-sizing: border-box;
    margin: 0 0.25rem 0 0.25rem;
    li {
      margin-top: 0.25rem;
      border-radius: 1rem;
      .guanZhu_banner {
        position: relative;
        width: 100%;
        height: 2.9rem;
        background-size: 100% 100%;
        p {
          position: absolute;
          top: 85px;
          left: 10px;
          color: #fff;
        }
        .guanZhu_status {
          position: absolute;
          top: 0.125rem;
          right: 0.125rem;
          width: 1.625rem;
          height: 0.575rem;
          background: url("../../assets/images/xiangqing/zhongchouzhuangtai@2x.png") no-repeat;
          background-size: 100% 100%;
          line-height: 0.4rem;
          color: #fff;
          font-size: 12px;
          text-align: center;
        }
      }
      .guanZhu_money {
        width: 100%;
        background: white;
        overflow: hidden;
        padding: 0.5rem 0 0.5rem 0;
        div {
          width: 50%;
          float: left;
          text-align: center;
          span {
            display: inline-block;
            width: 100%;
          }
           :first-child {
            font-size: 16px;
            font-weight: 600;
          }
           :last-child {
            color: #a7a7a7;
            font-size: 12px;
          }
        }
        .guanZhu_monry_right {
          border-left: 1px #ececec solid;
        }
      }
    }
  }
}
</style>
