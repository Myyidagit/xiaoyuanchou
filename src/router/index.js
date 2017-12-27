import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/zhuye/home'
import Homea from '../components/zhuye/homea'
import Homeb from '../components/zhuye/homeb'
import Homec from '../components/zhuye/homec'
import Homed from '../components/zhuye/homed'
import Zhannei from '../components/zhannei'
import Yijian from '../components/yijian'
import About from '../components/aboutus'
import Login from '../components/login/login'
import Zhuce from '../components/login/zhuce'
import Sanfang from '../components/login/sanfang.vue'
import Shiming from '../components/login/realname.vue'
import UserInfo from '../components/login/userInfo'
import Center from '../components/center'
import Xiangqing from '../components/xiangqing/xiangqing'
import Zhongchou from '../components/zhongchou/zhongchou'
import Faqi from '../components/faqi'
import Zhifu from '../components/zhifu/zhifu'
import Zhichi from '../components/gerenziliao/zhichi'
import Guanzhu from '../components/gerenziliao/guanzhu'
import Fenxiang from '../components/gerenziliao/fenxiang'
import Result from '../components/login/result.vue'
import paysuccess from '../components/zhifu/paysuccess.vue'
import Xieyi from '../components/xieyi/xieyi.vue'
Vue.use(Router)
const routes = [{
        path: "",
        component: Home,
        children: [
            { path: '', component: Homea }
        ]
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        children: [
            { path: 'homea', name: "homea", component: Homea },
            { path: 'homeb', name: "homeb", component: Homeb },
            { path: 'homec', name: "homec", component: Homec },
            { path: 'homed', name: "homed", component: Homed }
        ]
    },
    { path: "/homed", name: "homed", component: Homed },
    { path: "/zhannei", name: "zhannei", component: Zhannei },
    { path: "/yijian", name: "yijian", component: Yijian },
    { path: "/aboutus",name:"aboutus", component: About },
    { path: "/zhuce", name: "zhuce", component: Zhuce },
    { path: "/realname", name: "realname", component: Shiming },
    { path: "/sanfang", name: "sanfang", component: Sanfang },
    { path: "/center", name: "center", component: Center },
    { path: "/userInfo", name: "userInfo", component: UserInfo },
    { path: "/login", name: "login", component: Login },
    { path: "/xiangqing", name: "xiang", component: Xiangqing },
    { path: "/zhongchou", name: "zhongchou", component: Zhongchou },
    { path: "/faqi", name: "faqi", component: Faqi },
    { path: "/zhifu", name: "zhifu", component: Zhifu },
    { path: "/zhichi", name: "zhichi", component: Zhichi },
    { path: "/guanzhu", name: "guanzhu", component: Guanzhu },
    { path: "/fenxiang", name: "fenxiang", component: Fenxiang },
    { path: "/result", name: "result", component: Result },
    { path: "/paysuccess", name: "paysuccess", component: paysuccess },
    { path: "/xieyi", name: "xieyi", component: Xieyi }
]
export default new Router({
    hashbang: false,
    mode: "hash",
    routes
})
