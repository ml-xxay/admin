import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import css from './assets/css/golocss.css' //全局样式

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    css,
    render: h => h(App)
}).$mount('#app')