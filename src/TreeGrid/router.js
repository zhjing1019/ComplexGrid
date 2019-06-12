import Vue from 'vue'
import Router from 'vue-router'
import Index from './Index.vue'
import EditTable from './EditTableTest.vue'
import CutImages from './CutImagesTest.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/EditTable',
      name: 'EditTable',
      component: EditTable
    },
    {
      path: '/CutImages',
      name: 'CutImages',
      component: CutImages
    }
  ]
})
