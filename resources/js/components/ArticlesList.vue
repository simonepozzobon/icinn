<template>
<div class="articles-list">
    <article-single
        v-for="article in articles"
        :key="article.id"
        :item="article"
    />
</div>
</template>

<script>
import ArticleSingle from './ArticleSingle.vue'

export default {
    name: 'ArticlesList',
    components: {
        ArticleSingle,
    },
    data: function () {
        return {
            articles: [],
        }
    },
    methods: {
        getData: function () {
            this.$http.get('/api/articles').then(response => {
                console.log(response);
                this.articles = response.data.articles
            })
        },
    },
    mounted: function () {
        this.getData()
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.articles-list {
    background-color: $primary;
}
</style>
