<template>
<div class="article-list-simple container">
    <article-single-simple
        v-for="article in articles"
        :key="article.id"
        :item="article"
    />
</div>
</template>

<script>
import ArticleSingleSimple from './ArticleSingleSimple.vue'

export default {
    name: 'ArticlesListSimple',
    components: {
        ArticleSingleSimple,
    },
    props: {
        articles: {
            type: Array,
            default: function () {
                return []
            },
        },
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.article-list-simple {
    padding-top: $spacer * 4;
    padding-bottom: $spacer * 4;
}
</style>
