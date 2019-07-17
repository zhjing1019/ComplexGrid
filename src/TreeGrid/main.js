import Vue from 'vue'
import '@/plugins/element.js'
import '@/plugins/api.js'
import '@/plugins/lodash.js'
import '@/plugins/smoothScroll.js'
import router from './router'
import store from './store/store'
import App from './App.vue'
import ElTreeSelect from 'el-tree-select'

import ref from 'vue-ref'
Vue.use(ref)
Vue.use(ElTreeSelect)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
