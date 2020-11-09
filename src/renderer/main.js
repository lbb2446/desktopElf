import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
// import 'ant-design-vue/dist/antd.css'
// import Antd from 'ant-design-vue'
// import ref from 'vue-ref'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import db from './datastore.js'
// Vue.use(Antd)
// Vue.use(ref, { name: 'ant-ref' })
Vue.prototype.$db = db
Vue.use(iView)
// import { DatePicker } from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
// Vue.use(DatePicker)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

let config = {
  background: {
    url: ''
  },
  remind: {

  },
  menu: {

  },
  models: [{

  }],
  loadings: []
}
console.log(config)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
