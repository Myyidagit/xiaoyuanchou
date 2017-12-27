// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.axios = axios
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
import Vuex from 'vuex'
Vue.use(Vuex)
import MuseUi from "muse-ui"
import "./assets/css/muse-ui.css"
 //optional stuff to do after success
Vue.use(MuseUi)
import 'sweetalert/dist/sweetalert.css'
import 'sweetalert/dist/sweetalert.min'
Vue.config.productionTip = false
import './assets/reset.css'
import 'weui/dist/style/weui.min.css'
import Util from "./assets/js/Util.js"
Vue.prototype.Util = Util
import baseUrl from "./assets/js/common.js"
Vue.prototype.baseUrl = baseUrl
import Clipboard from 'clipboard/dist/clipboard.min'
Vue.prototype.Clipboard = Clipboard

//记录滚动条的高度
/* eslint-disable no-new */
//创建仓库(store)为了存放state mutations,actions
const store =new Vuex.Store({
	state:{//共享的数据
		type:"",
	},
	mutations:{//修改数据的唯一途径
		// 主页里面的详情页面
		CHANGETYPE(state,i){
			// console.log("123");
			state.type = i;
			console.log(state.type);
		}
	},
	actions:{//异步操作的事件

	},
	getters:{//vuex中的计算属性
		getType(state){
			return state.type;
		},
	}
})

var VUE = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
