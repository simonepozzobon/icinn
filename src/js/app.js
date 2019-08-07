import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './routes'
import BootstrapVue from 'bootstrap-vue'
import * as AdminUi from '@esserun/admin-ui/packages/admin-ui'
import '@esserun/admin-ui/dist/index.css'

for (let componentName in AdminUi) {
    Vue.component(componentName, AdminUi[componentName])
}

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter({
    mode: 'history',
    dir: __dirname,
    routes: Routes,
})

new Vue({
    router,
    methods: {
        goTo: function(name) {
            
        } 
    },
    render: h => h(App)
}).$mount('#dio')
