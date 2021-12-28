/** 主入口js */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import setting from './config/setting';
import permission from '@/utils/permission';
import './config/axios-config';
import EleAdmin from 'ele-admin';
import './styles/index.scss';
import VueClipboard from 'vue-clipboard2';
import i18n from './lang';
import * as requestsu from './utils/request';

Vue.config.productionTip = false;
Vue.prototype.$setting = setting;
Vue.prototype.$requestsu = requestsu

Vue.use(EleAdmin, {
  i18n: (key, value) => {
    return i18n.t(key, value);
  }, response: {
    statusName: 'code',
    statusCode: 200
  }
});
Vue.use(permission);
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.children[0].focus()
  }
})

//Vue.prototype.serviceurl = "http://localhost:8087/tmlms"   //服务端地址
Vue.prototype.serviceurl = "http://127.0.0.1:8087/tmlms"   //服务端地址
