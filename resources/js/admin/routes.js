import ArticleContainer from './views/ArticleContainer.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

const Routes = [{
        path: '/',
        name: 'articoli',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/articolo',
        component: ArticleContainer,
        children: [{
                path: '',
                name: 'article-create',
                component: ArticleEdit,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: ':id',
                name: 'article-edit',
                component: ArticleEdit,
                meta: {
                    requiresAuth: true
                }
            }
        ],
    }
]

export default Routes
