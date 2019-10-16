import ArticleContainer from './views/ArticleContainer.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import Home from './views/Home.vue'

const Routes = [{
        path: '/',
        name: 'articoli',
        component: Home,
    },
    {
        path: '/articolo',
        component: ArticleContainer,
        children: [{
                path: '',
                name: 'article-create',
                component: ArticleEdit,
            },
            {
                path: ':id',
                name: 'article-edit',
                component: ArticleEdit,
            }
        ],
    }
]

export default Routes
