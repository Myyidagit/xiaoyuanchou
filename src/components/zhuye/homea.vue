<template>
  <div id="homea">
  <div v-if="listVos.length!=0">
    <div class="jine" v-for="item in listVos" @click="detail(item)">
      <div class="biaoYu">
        {{ item.name }}
      </div>
      <div class="bannerImg">
        <img :src="item.banner" height="200" width="100%" alt="">
        <div v-if="item.entry_status == 1" class="biao">
          预热
        </div>
        <div v-if="item.entry_status == 2" class="biao">
          众筹中
        </div>
        <div v-if="item.entry_status == 3" class="biao">
          众筹成功
        </div>
        <div v-if="item.entry_status == 4" class="biao">
          众筹失败
        </div>
      </div>
      <div class="money">
        <p>已募金额：<span>{{ item.current_amount }}元</span></p>
        <!-- 进度条 -->
        <div class="outer_timeLine">
          <div class="inner_timeLine" :style="{width:item.scale>=100?100+'%':item.scale+'%'}"></div>
          <div class="time_status" :style="{left:item.scale>=100?90+'%':item.scale+'%'}">{{ item.scale+"%" }}</div>
        </div>

        <ul>
          <li>
            <h2>{{ item.target_money }}</h2>
            <p>目标金额（元）</p>
          </li>
          <li>
            <h2 v-if="item.entry_status == 4" style="color:red">众筹结束</h2>
            <h2 v-else-if="item.entry_status == 3" style="color:red">众筹结束</h2>
            <h2 v-else-if="item.entry_status != 3 || item.entry_status != 4">{{ item.remaining_time }}</h2>
            <p>剩余时间</p>
          </li>
          <li>
            <h2>{{ item.support_number }}</h2>
            <p>支持人数（人）</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom_bai" v-if="listVos.length == 1">

    </div>
    </div>
    <div v-else-if="listVos.length == 0" class="noData">
      暂无数据
      <div class="bai"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homea',
  props:['listVos'],
  data () {
    return {
      loading: false,
      scroller: null,
      value3:0,
      soll:null
    }
  },
  mounted () {
    console.log(this.listVos)
  },
  created(){

  },
  methods: {
    detail(item){
      if(item.entry_status == 5){
        alert("众筹失败")
      }else{

        $("body").scrollTop(0);

        this.$router.push({
              name: 'xiang',
              query:{
                entry_id:item.entry_id
              }
          })
      }

    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
    #homea{
    .noData{
      margin-top: 1.25rem;
      width: 100%;
      text-align: center;
    }
    .biaoYu{
      width: 100%;
      background: #fff;
      height: 1.25rem;
      line-height: 1.25rem;
      font-size: 0.5rem;
      text-indent: 0.5rem;
      font-size: 0.4rem;
    }
    .bottom_bai{
      height:6.5rem;
    }
    .bannerImg{
      position: relative;
    }
    .biao{
      position: absolute;
      right: 0.125rem;
      top: 0.125rem;
      width: 1.625rem;
      height: 0.625rem;
      background: url(../../assets/images/shouye/zhongchouzhuangtai@2x.png) no-repeat;
      background-size: 100%;
      font-size: 0.3rem;
      text-align: center;
      color: #fff;

    }
    .demo-slider{
      height: 0.5rem;
      background: #fff;
    }

    .money{
      background: #fff;
      ul{
        li{
          p{
            text-align: center;
          }
        }
      }
      .outer_timeLine{
        position: relative;
        width: 96%;
        height: 0.15rem;
        margin: 0.625rem auto;
        background: #ccc;
        .inner_timeLine{
          height: 0.15rem;
          background: #3993e9;
        }
        .time_status{
          position: absolute;
          top:-110%;
          width: 1.0rem;
          border-radius: 0.25rem;
          height: 0.5rem;
          background: #3993e9;
          color: #fff;
          font-size: 0.25rem;
          text-align: center;
          line-height: 0.5rem;
        }
      }
    }
    .money ul{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 0.625rem;
      background: #fff;
      padding-bottom: 0.25rem;
    }
    .money p:first-child{
      text-indent: 0.5rem;
    }
    .money p:first-child span{
      color: #ff0000;
    }
    .money ul li h2{
      color: #3993e9;
      text-align: center;
    }
    .bai{
      height: 4.375rem;
      width: 100%;
    }
  }
</style>
