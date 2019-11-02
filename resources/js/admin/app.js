import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import Routes from './routes'
import BootstrapVue from 'bootstrap-vue'
import AdminUi from '@esserun/admin-ui'
import Cookie from './Cookies'

// for (let componentName in AdminUi) {
//     Vue.component(componentName, AdminUi[componentName])
// }
Object.keys(AdminUi).forEach(componentName => {
    Vue.component(componentName, AdminUi[componentName])
})

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.prototype.$http = axios
Vue.prototype.$cookie = Cookie

Vue.config.productionTips = false

const router = new VueRouter({
    mode: 'history',
    dir: __dirname,
    routes: Routes,
    base: '/admin',
})

const redirectLogin = (app) => {
    app.$nextTick(() => {
        app.goTo('login')
    })
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const app = router.app
        let user = app.user
        let token = app.token

        if ((user && token)) {
            // Procedi
            // console.log('procedi');
            next()
        }
        else if (typeof user == 'undefined' || typeof token == 'undefined') {
            let app = router.app
            let user = app.$cookie.get('icinn-user')
            user = JSON.parse(user) ? JSON.parse(user) : null

            let auth = app.$http.defaults.headers.common.hasOwnProperty('Authorization')

            if (user && !auth) {
                let data = new FormData()
                data.append('id', user.id)
                data.append('email', user.email)

                app.$http.post('/api/get-token', data).then(response => {
                    if (response.data.success) {
                        app.user = response.data.user
                        app.token = response.data.token
                        app.$cookie.set('icinn-logged', true)
                        app.$cookie.set('icinn-user', JSON.stringify(app.user))
                        app.$cookie.set('icinn-token', JSON.stringify(app.token))
                        app.$http.defaults.headers.common.Authorization = `${app.token.token_type} ${app.token.access_token}`

                        // console.log('procedi dopo riautenticazione');
                        next()
                    }
                    else {
                        app.$cookie.destroy('icinn-logged')
                        app.$cookie.destroy('icinn-user')
                        app.$cookie.destroy('icinn-token')
                        delete app.$http.defaults.headers.common.Authorization

                        // console.log('autenticazione cookies non riuscita');
                        redirectLogin(app)
                    }
                })
            }
            else {
                // console.log('user e headers non ci sono nei cookies ->headers', app);
                if (app) {
                    redirectLogin(app)
                }
                else {
                    console.log('router', router);
                }
                return false
            }
        }
        else {
            // console.log('user e token non esistono', app);
            redirectLogin(app)
            return false
        }
    }
    else {
        // console.log('nessuna autorizzazione');
        next()
    }
})

const admin = new Vue({
    router,
    data: function () {
        return {
            objectsToLoad: 0,
            objectsLoaded: 0,
            logged: false,
            user: null,
            token: null,
        }
    },
    methods: {
        init: function () {
            let user = this.$cookie.get('icinn-user')
            user = JSON.parse(user) ? JSON.parse(user) : null

            if (user) {
                let data = new FormData()
                data.append('id', user.id)
                data.append('email', user.email)

                this.$http.post('/api/get-token', data).then(response => {
                    if (response.data.success) {
                        this.user = response.data.user
                        this.token = response.data.token
                        if (this.$route.name == 'login') {
                            this.login(true)
                        }
                        else {
                            this.login()
                        }
                    }
                    else {
                        this.logout()
                    }
                })
            }
            else {
                this.logout()
            }
        },
        login: function (redirectToHome = false) {
            this.$cookie.set('icinn-logged', true)
            this.$cookie.set('icinn-user', JSON.stringify(this.user))
            this.$cookie.set('icinn-token', JSON.stringify(this.token))
            this.logged = true
            this.$http.defaults.headers.common.Authorization = `${this.token.token_type} ${this.token.access_token}`

            if (redirectToHome == true) {
                this.goTo('articoli')
            }
        },
        logout: function () {
            this.user = null
            this.token = null
            this.logged = false

            delete this.$http.defaults.headers.common.Authorization
            this.goTo('login')
        },
        goTo: function (name) {
            if (this.$route.name != name) {
                this.$router.push({
                    name: name
                })
            }
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
        this.init()
        this.$on('load-complete', () => {
            this.objectsToLoad = 0
            this.objectsLoaded = 0
        })
    },
    mounted: function () {},
    render: h => h(App)
}).$mount('#dio')
