<template>
  <div id="homea">
    <div class="jine" v-for="item in listVos" @click="detail()">
      <div class="biaoYu">
        {{ item.name }}
      </div>
      <div class="bannerImg">
        <img :src="item.banner" height="150" width="100%" alt="">
        <div v-if="item.entry_status == 1" class="biao">
          待审核
        </div>
        <div v-if="item.entry_status == 2" class="biao">
          未通过审核
        </div>
        <div v-if="item.entry_status == 3" class="biao">
          预热
        </div>
        <div v-if="item.entry_status == 4" class="biao">
          筹款中
        </div>
        <div v-if="item.entry_status == 5" class="biao">
          结束
        </div>
      </div>
      <div class="money">
        <p>以募金额：<span>{{ item.current_amount }}元</span></p>
        <mu-slider v-model="value3" disabled class="demo-slider"/>
        <ul>
          <li>
            <h2>{{ item.target_money }}</h2>
            <p>目标金额（元）</p>
          </li>
          <li>
            <h2>{{ item.remaining_time }}</h2>
            <p>剩余时间</p>
          </li>
          <li>
            <h2>{{ item.support_number }}</h2>
            <p>支持人数（人）</p>
          </li>
        </ul>
      </div>
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
      value3:0
    }
  },
  mounted () {
    
  },
  created(){
        console.log(this.listVos)      
  },
  methods: {
    detail(){
      this.$router.push({
              name: 'xiang',
              params: {
                
              }
          })
    },

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
