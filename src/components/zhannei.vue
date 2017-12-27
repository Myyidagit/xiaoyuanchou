<template>
  <div id="zhannei">
    <mt-header title="站内消息">
        <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button> 
      </router-link>
    </mt-header>
    <div class="headerBai"></div>
    <!-- 手风琴 -->
    <div class="outerDiv">
      <ul v-for="item in messageList">  
        <span class="span" :class="[item.status == 2?'bb':'aa']" @click="aa( item )">{{ item.title }}<b></b></span>  
        <li>
          <div class="jieShao">
            <p>{{ item.message }}</p>
          </div>
        </li>  
      </ul>   
    </div>  
    <!-- 下拉加载更多 -->
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/> 
  </div>
</template>
<script>
import $ from "jquery"
export default {
    name: 'homea',
    data () {
      return {
        messageList:[],
        user_id:window.localStorage.user_id,
        access_token:window.localStorage.access_token,
        page:1,
        rows:9,
        allPage:1,
        message_id:"",//改变已读未读状态的参数
        status:false,//已读未读状态
        loading: false,//下拉刷新
        scroller: null//下拉刷新
      }
    },
    mounted () {
      this.getMessageList();
      this.spanClick();  
      this.scroller = this.$el;      
    },
    methods: {  
    // 下拉刷新
    loadMore () {
      this.loading = true
      if(this.page >= this.allPage){
        this.loading = false
      }else{
        var time = setTimeout(() => {
        this.loading = false
        this.page +=1
        console.log(this.page)
        this.upMessageList()
        }, 2000)
      }      
    },     
      getMessageList(){
        this.axios({            
            url: this.baseUrl.testUrl+"/sys/message/v1/list",
            method: 'POST',
            headers: {
              user_id:this.user_id,
              access_token:this.access_token
            },
            params: {             
              page:this.page,
              rows:this.rows             
            }
          }).then(res=>{
            console.log(res.data)
            this.messageList = res.data.data.messageries;
            this.allPage = res.data.data.pageTotal;
          }).catch(function (err) {

          }) 
      },
      upMessageList(){
        this.axios({            
            url: this.baseUrl.testUrl+"/sys/message/v1/list",
            method: 'POST',
            headers: {
              user_id:this.user_id,
              access_token:this.access_token
            },
            params: {             
              page:this.page,
              rows:this.rows             
            }
          }).then(res=>{
            res.data.data.messageries.map(item =>{
              this.messageList.push(item)
            });
          }).catch(function (err) {

          }) 
      },
      spanClick(){
        var that = this
        $('.outerDiv').on("click","span",function(){
          $(this).addClass("bb")                  
          if($(this).siblings('li').hasClass('on')){  
            $(this).siblings('li').slideUp(300).removeClass('on');  
            $(this).children('b').addClass('downbg').removeClass("upbg");  
          }else{  
            $(this).siblings('li').slideDown(300).addClass('on');  
            $(this).children('b').removeClass("downbg").addClass('upbg');  
          }  
        });
      },
      aa(item){
        this.message_id = item.message_id;
        if(item.status == 1){
          this.readStatus();
        }       
      },
      readStatus(){
        this.axios({            
            url: this.baseUrl.testUrl+"/sys/message/v1/examine",
            method: 'POST',
            headers: {
              user_id:this.user_id,
              access_token:this.access_token
            },
            params: {             
             message_id:this.message_id          
            }
          }).then(res=>{
            console.log(res)
            if(res.data.code == 1200){
              // this.status = res.data.data.status            
            }            
            console.log(this.status)
          }).catch(function (err) {

          }) 

      }
    },
    created(){
     
    }
  
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang = "less">
/**/
 #zhannei{
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
      width: 100%;
    }  
    ul span{
      display: block;
      height: 1.5rem;
      line-height: 1.5rem;      
      margin-top: 0.25rem;
      text-indent: 0.25rem;
      background: url(../assets/images/zhannei/weidu@2x.png) no-repeat right top;
      background-size: 1.0rem;
      background-color: #fff;
    }  
    .aa{
      background: url(../assets/images/zhannei/weidu@2x.png) no-repeat right top;
      background-size: 1.0rem;
      background-color: #fff;
    }
    .bb{
      background: url(../assets/images/zhannei/yidu@2x.png) no-repeat right top;
      background-size: 1.0rem;
      background-color: #fff;
    }
    .downbg{
      background: url(../assets/images/zhannei/xialajiantou@2x.png) no-repeat left center;
    }
    .upbg{
      background: url(../assets/images/zhannei/shouqijiantou@2x.png) no-repeat left center;
    }
    ul:last-child span{
      border-bottom: none;
    }  
    li{
      display: none;
    }   
    b{
      display: inline;
      float: right;
      margin-top: 0.475rem;
      margin-right: 0.45rem;
      width: 0.5rem;
      height: 0.5rem;
      background: url(../assets/images/zhannei/xialajiantou@2x.png) no-repeat left center;
    }
    .jieShao{
      color: #3993e9;
      width: 100%;
      height: 3.0rem;
      line-height: 0.775rem;
      margin-bottom: 0.375rem;
      background: #f5f9fe;
      padding: 0.375rem;
    }
  } 
</style>
