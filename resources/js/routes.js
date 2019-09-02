import Home from './views/Home.vue'
import Single from './views/Single.vue'

const Routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/single/:id',
        name: 'single',
        component: Single,
    }
]

export default Routes
