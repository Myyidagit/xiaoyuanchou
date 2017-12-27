<template>
	<div id="login">
		<img class="bg_banner" src="../../assets/images/login/beijing@2x.png" width="100%" alt="">
		<div class="logo_img">
			<img src="../../assets/images/login/logo@2x.png"alt="">
		</div>
		<div class="guan" onclick="history.back()">

		</div>
		<div class="weixin">
			<mu-raised-button label="微信登录" class="demo-raised-button" backgroundColor="#a4c639" @click="weixin()"/>
		</div>
		<div class="qqweibo">
			<div class="qq" @click="qq()">QQ</div>
			<div class="weibo" @click="weiBo()">微博</div>
		</div>
	</div>
</template>

<script>

	export default{
		name:"login",
		data(){
			return{
				utl:'%27http%3a%2f%2fxiaoyuanchou.casiec.cn%2fresult%27',
				time:''
			}
		},
		methods:{
			weixin(){
				this.$store.commit('CHANGETYPE',"2");
				window.localStorage.a = 2

				// window.location='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe746e24c31b4c49&redirect_uri=http%3a%2f%2fxiaoyuanchou.casiec.cn%2f%23%2fresult&response_type=code&scope=snsapi_login&state='+this.time+'#wechat_redirect'//移动端
				window.location='https://open.weixin.qq.com/connect/qrconnect?appid=wxbe746e24c31b4c49&redirect_uri=http%3a%2f%2fxiaoyuanchou.casiec.cn&response_type=code&scope=snsapi_login'

				console.log(window.localStorage.a)
			},
			qq(){
				this.$store.commit('CHANGETYPE',"3");
				window.localStorage.a = 3
				window.location='https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101425312&redirect_uri=http%3a%2f%2fxiaoyuanchou.casiec.cn&state='+this.time
			},
			weiBo(){
				// this.$store.commit('CHANGETYPE',"1");
				window.localStorage.a = 1
				console.log(window.localStorage.a)
				window.location='https://api.weibo.com/oauth2/authorize?client_id=2534605807&response_type=code&redirect_uri=http://xiaoyuanchou.casiec.cn'
			}
		},
		created(){  //组件创建完成即可发起网络请求
			this.time = new Date().getTime()
		},
		computed: {

		},


	}

</script>

<style scoped>
	#login{
        position: relative;

    }
    #login .bg_banner{
    	  height:10.875rem;
    }
    .logo_img{
    	width: 50%;
    	height: 50%;
    	overflow: auto;
    	margin: auto;
    	position: absolute;
    	top: 0; left: 0; bottom: 0; right: 0;
    }
    .logo_img img{
		width: 100%;
		margin-top: 40px;
    }
    .guan{
        width: 0.5rem;
        height: 0.5rem;
        background: url(../../assets/images/zhongxin/fanhuijiantou@2x.png) no-repeat;
        background-size: 0.25rem;
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
    }
    .weixin .demo-raised-button{
        width: 7.5rem;
        margin-top: 0.5rem;
    }
    .weixin{
        width: 7.5rem;
        margin: 0 auto;
    }
    .qqweibo{
    	width: 7.5rem;
    	margin: 0.25rem auto;
    	display: flex;
    }
    .qqweibo .qq{
    	width: 48%;
    	text-align: center;
    	height: 1.0rem;
    	line-height: 1.0rem;
    	margin-right: 4%;
    	background:#3993e9;
    	color: #fff;
    }
    .qqweibo .weibo{
    	width: 48%;
    	text-align: center;
    	height: 1.0rem;
    	line-height: 1.0rem;
    	background:#3993e9;
    	color: #fff;
    }
</style>
