import Archive from './views/Archive.vue'
import Home from './views/Home.vue'

const Routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/archive',
        name: 'archive',
        component: Archive,
    }
]

export default Routes
