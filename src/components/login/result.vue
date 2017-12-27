<template>
  <div id="result">
    <div class="result">

    </div>
    <mu-toast v-if="snackbar" :message="toastmsg"/>
  </div>
</template>

<script>
// import timerBtn from '@/components/sendmsg';
import { Indicator } from 'mint-ui';
export default {
  name: 'shouquan',
  data () {
    return {
      snackbar:false,
      toastmsg:"授权失败",
      aa:window.localStorage.a,
      code:""
    }
  },
  created(){
    this.code = this.getQueryString("code");
    console.log(this.code);
    this.getToken()
    Indicator.open("登录中......")
    setTimeout(this.toHome(),2000)
  },
  computed:{
  },
  methods:{
      toHome(){
        Indicator.close()
        this.$router.push({
                name:"home"
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

  #result .result{
    width: 2.5rem;
    height: 2.5rem;
  }
</style>
