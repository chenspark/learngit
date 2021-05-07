import Vue from 'vue'
import Router from './kvue-router'
import HelloWorld from '@/components/HelloWorld'
import tree from '@/components/tree'


Vue.use(Router)

export default new Router({
  routes: [
    // 在第一级是需要斜线的
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tree',
      name: 'tree',
      component: resolve => require(['@/components/tree.vue'], resolve),
      // component: tree
    },
    // {
    //   path: '/trees',
    //   name: 'trees',
    //   component: resolve => require(['@/components/trees.vue'], resolve),
    //   // component: tree
    // },
  ]
})
