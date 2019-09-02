<template>
<div class="archive">
    <articles-list-simple :articles="articles" />
</div>
</template>

<script>
import ArticlesListSimple from '../components/ArticlesListSimple.vue'

export default {
    name: 'Archive',
    components: {
        ArticlesListSimple
    },
    data: function () {
        return {
            articles: [],
        }
    },
    methods: {
        getData: function () {
            this.$http.get('/api/articles/archives').then(response => {
                console.log(response.data);
                this.articles = response.data.articles
            })
        },
    },
    created: function () {
        this.getData()
    },
    mounted: function () {
        console.log('cioa');
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';
.archive {
    background-color: $primary;
}
</style>
