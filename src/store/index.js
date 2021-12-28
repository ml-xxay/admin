import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        courseSection: {}
    },
    mutations: mutations,
    actions: actions,
    getters: {
        sections: state => {
            if (state.courseSection !== null) {
                return JSON.parse(sessionStorage.getItem('courseSections'))
            }
        }
    },
    modules: {}
})