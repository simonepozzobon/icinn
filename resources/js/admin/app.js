import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
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
Vue.prototype.$http = axios

Vue.config.productionTips = false

const router = new VueRouter({
    mode: 'history',
    dir: __dirname,
    routes: Routes,
    base: '/admin',
})

const admin = new Vue({
    router,
    data: function () {
        return {
            objectsToLoad: 0,
            objectsLoaded: 0,
        }
    },
    methods: {
        goTo: function (name) {
            this.$router.push({
                name: name
            })
        },
        goToWithParams: function (name, params) {
            if (this.$route.name != name) {
                this.$router.push({
                    name: name,
                    params: params
                })
            }
        },
    },
    created: function () {
        this.$on('load-complete', () => {
            this.objectsToLoad = 0
            this.objectsLoaded = 0
        })
    },
    mounted: function () {},
    render: h => h(App)
}).$mount('#dio')
