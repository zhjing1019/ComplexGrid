import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TreeGrid from '@/TreeGrid/TreeGrid'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TreeGrid',
      component: TreeGrid
    }
  ]
})
