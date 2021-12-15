import Vue from 'vue'
// const Vue = ()=>import('vue')
import VueRouter from 'vue-router'
// const VueRouter = ()=> import( 'vue-router')
// import Home from '../components/Home'
const Home =()=>import('../components/Home')
// import knowledgeGraph from "../components/knowledgeGraph";
const knowledgeGraph =()=>import("../components/knowledgeGraph")
// import login from "../components/login";
const login =()=>import("../components/login")
// import userPortrait from '../components/userPortrait'
const userPortrait=()=>import('../components/userPortrait')
// import question from "../components/question";
const question =()=>import("../components/question")
// import selectCar from "../components/selectCar";
const selectCar =()=>import("../components/selectCar")
// import layout from "../layout";
const layout = ()=> import("../layout")
// import Qs from 'qs';
const Qs = ()=>import("qs")

const MyWordCloud = ()=> import("../components/myWordCloud")

import recommendcontent from "../components/recommendcontent";

Vue.use(VueRouter);
Vue.prototype.Qs = Qs;
const routes = [
  {
    //登录
    path: '/login',
    component: login,
    meta: {
      isLogin: false
    }
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/search',
    component: layout,
    children: [
      {
        path: '/search',
        name: 'Home',
        component: Home
      },
      {
        path: '/recommend',
        name: 'recommendation',
        component: recommendcontent
      },
      {
        path: '/g/:id',
        name: 'knowledgeGraph',
        component: knowledgeGraph
      },
      {
        path: '/userPortrait',
        name: 'userPortrait',
        component: userPortrait,
        // meta: {
        //   isLogin: true
        // },
      },
      {
        path: '/question',
        name: 'question',
        component: question
      },

      {
        path: '/selectCar',
        name: 'selectCar',
        component: selectCar
      },
      {
        path: '/MyWordCloud',
        name: 'MyWordCloud',
        component: MyWordCloud,
      }
    ]
  },

]

const createRouter = () => new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes
});

const router = createRouter()



router.beforeEach((to, from, next) => {
  // JWT Token
  if (localStorage.getItem("token")) {
    if (to.fullPath === '/login') {
      next('/')
    }
    else {
      next()
    }
  } else {
    // 无Token
    if (to.fullPath === '/login') {
      next()
    } else {
      next('/login')
    }
  }
});

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher // reset router
}

export default router
