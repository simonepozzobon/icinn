import ArticleEdit from './views/ArticleEdit.vue'
import Home from './views/Home.vue'

const Routes = [{
        path: '/',
        name: 'articoli',
        component: Home,
    },
    {
        path: '/articolo',
        name: 'article-edit',
        component: ArticleEdit,
    }
]

export default Routes
