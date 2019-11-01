import Home from './views/Home.vue'
import Archive from './views/Archive.vue'
import Single from './views/Single.vue'

const Routes = [{
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/archive',
        name: 'archive',
        component: Archive,
    },
    {
        path: '/single/:id',
        name: 'single',
        component: Single,
    },

]

export default Routes
